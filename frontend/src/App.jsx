import { useState } from "react";
import "./App.css";

function App() {
  const [content, setContent] = useState("");
  const [length, setLength] = useState("Medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSummarize(e) {
    e.preventDefault();
    setError("");
    setSummary("");

    if (!content.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to summarize your content."
        );
      }

      setSummary(data.summary);
    } catch (err) {
      setError(
        err.message.includes("fetch")
          ? "Cannot connect to the backend. Make sure FastAPI is running at http://127.0.0.1:8000."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">S</span>
          <span>Story<span className="brand-accent">Summarizer</span></span>
        </div>
        <span className="status">
          <span className="status-dot" />
          AI-powered
        </span>
      </header>

      <section className="hero">
        <span className="eyebrow">YOUR PERSONAL READING ASSISTANT</span>
        <h1>
          Big stories.
          <br />
          <span>Clear summaries.</span>
        </h1>
        <p>
          Turn long stories, articles, and documents into clear,
          useful summaries in seconds.
        </p>
      </section>

      <section className="workspace">
        <form className="input-panel" onSubmit={handleSummarize}>
          <div className="panel-heading">
            <div>
              <h2>Your content</h2>
              <p>Paste the text you want to summarize.</p>
            </div>
            <span className="text-count">
              {content.length.toLocaleString()} / 50,000
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 50000))}
            placeholder="Paste your story, article, notes, or any text here..."
            maxLength={50000}
          />

          <div className="form-footer">
            <label htmlFor="length">Summary length</label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Detailed">Detailed</option>
            </select>
          </div>

          <button
            className="summarize-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating summary..." : "✦  Summarize content"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        <section className="output-panel" aria-live="polite">
          <div className="panel-heading">
            <div>
              <h2>Your summary</h2>
              <p>Key ideas, made simple.</p>
            </div>
            <span className="result-icon">✦</span>
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="loader" />
              <h3>Reading your content...</h3>
              <p>Your AI summary is being prepared.</p>
            </div>
          ) : summary ? (
            <div className="summary-result">
              <pre>{summary}</pre>
              <button
                type="button"
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(summary).catch(() => {
                    setError("Could not copy automatically. Please select and copy the summary.");
                  });
                }}
              >
                Copy summary
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">✧</div>
              <h3>Your summary will appear here</h3>
              <p>
                Add your content, choose a length, and click
                summarize to get started.
              </p>
            </div>
          )}
        </section>
      </section>

      <footer>
        <span>Made for clearer reading.</span>
        <span>React · FastAPI · Gemini</span>
      </footer>
    </main>
  );
}

export default App;