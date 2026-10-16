📚 AI Story Summarizer



An AI-powered web application that summarizes long stories into concise, meaningful, and easy-to-understand text. The application helps readers quickly understand the main events, characters, and key ideas without reading the entire story.



📖 About the Project



The AI Story Summarizer uses artificial intelligence and natural language processing to analyze story text and generate a shorter version while preserving its essential meaning.



Users can provide a story as input, and the application processes the text using an AI language model to produce a clear and readable summary.



This project demonstrates the integration of AI, backend development, and a modern web frontend to solve a practical text-processing problem.



✨ Features

🤖 AI-Powered Summarization: Generates concise summaries from longer stories.

📚 Key Information Extraction: Focuses on important events, characters, and story details.

⚡ Time Efficient: Helps users understand lengthy content quickly.

🌐 Web-Based Interface: Provides a convenient way to interact with the summarization system.

🔗 AI Integration: Uses LangChain to connect application logic with a language model.

🛠️ Technologies Used

Python — Backend development

LangChain — AI application integration

FastAPI — Backend API framework

React — Frontend user interface

Vite — Frontend development and build tooling

JavaScript and CSS — Interface functionality and styling

⚙️ How It Works

Input: The user provides a story or a block of text.

Processing: The backend receives the text and prepares it for the AI model.

Summarization: The language model analyzes the content and generates a concise summary.

Output: The summarized story is returned for the user to read.

📂 Project Structure

story-summarizer/

├── frontend/

│   ├── public/

│   ├── src/

│   ├── package.json

│   └── vite.config.js

├── main.py

├── requirements.txt

├── .gitignore

└── README.md



🚀 Getting Started

Prerequisites

Python installed

Node.js and npm installed

Required API credentials for your configured AI model

1\. Clone the repository

git clone https://github.com/Vamsikrishna-101/story-summarizer.git

cd story-summarizer



2\. Set up the backend



Create and activate a Python virtual environment:



python -m venv venv

venv\\Scripts\\activate





Install Python dependencies:



pip install -r requirements.txt





Configure the required API credentials in a local .env file. Never upload this file to GitHub.



Start the backend using the command appropriate for your application. For a FastAPI app exposed as app in main.py, use:



uvicorn main:app --reload



3\. Set up the frontend



Open a second terminal:



cd frontend

npm install

npm run dev





Open the local URL displayed in the terminal to access the application.



🔒 Security

Keep API keys and credentials private.

Store secrets in environment variables.

Do not commit .env files or virtual environment folders.

🎯 Project Goal



The goal of this project is to demonstrate how AI-powered natural language processing can make long-form storytelling more accessible by transforming lengthy text into concise summaries.



👨‍💻 Author



Vamsi Krishna



GitHub: @Vamsikrishna-101



⭐ Support



If you find this project interesting, consider giving the repository a star!

