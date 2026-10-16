import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


# Load environment variables from backend/.env
load_dotenv()


# Create FastAPI application
app = FastAPI(title="Story Summarizer API")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Get Google Gemini API key
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise RuntimeError(
        "GOOGLE_API_KEY is missing from backend/.env"
    )


# Initialize Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    google_api_key=api_key,
    temperature=0.3,
)


# Create summarization prompt
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are an expert story and content summarizer.

Summarize the supplied content accurately.
Preserve the main ideas, important events, and conclusions.
Do not invent facts.
Write in clear, simple language.

Return:
1. A suitable title.
2. A concise summary.
3. The key points as bullet points.

Follow the requested summary length: {length}."""
    ),
    (
        "human",
        "Content to summarize:\n\n{content}"
    ),
])


# Build LangChain pipeline
chain = prompt | llm | StrOutputParser()


# Request model
class SummaryRequest(BaseModel):
    content: str = Field(min_length=1, max_length=50000)
    length: str = "Medium"


# Home route
@app.get("/")
def home():
    return {
        "message": "Story Summarizer API is running"
    }


# Summarization route
@app.post("/summarize")
async def summarize(request: SummaryRequest):
    content = request.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Please enter some content to summarize."
        )

    if request.length not in ["Short", "Medium", "Detailed"]:
        raise HTTPException(
            status_code=400,
            detail="Length must be Short, Medium, or Detailed."
        )

    try:
        result = await chain.ainvoke({
            "content": content,
            "length": request.length,
        })

        return {
            "summary": result
        }

    except Exception as exc:
        # Log the actual error in the backend terminal
        print(f"Summarization error: {exc}")

        raise HTTPException(
            status_code=502,
            detail=(
                "Could not generate a summary. "
                "Check your Google API key, internet connection, "
                "and Gemini API access."
            )
        )