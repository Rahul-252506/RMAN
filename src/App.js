import React, { useState } from "react";
import { convertTextToSpeech } from "./api/tts";
import { summarizeTextFromURL } from "./api/summarizer";

function App() {
  const [urlInput, setUrlInput] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    setError(null);
    setSummaryText("");
    window.speechSynthesis.cancel(); // Cancel any existing speech

    try {
      const summary = await summarizeTextFromURL(urlInput);
      setSummaryText(summary);
      await convertTextToSpeech(summary);
      setIsSpeaking(true);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  };

  const handleResume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>🗣️ Talkify – Summarize & Speak</h1>

      <input
        type="text"
        placeholder="Enter article URL"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          fontSize: "1.1rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: 180,
        }}
      >
        {loading ? "Summarizing..." : "Summarize & Speak"}
      </button>

      {isSpeaking && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={handlePause}
            aria-label="Pause"
            title="Pause"
            style={controlButtonStyle}
          >
            ⏸️
          </button>
          <button
            onClick={handleResume}
            aria-label="Resume"
            title="Resume"
            style={controlButtonStyle}
          >
            ▶️
          </button>
          <button
            onClick={handleStop}
            aria-label="Stop"
            title="Stop"
            style={controlButtonStyle}
          >
            ⏹️
          </button>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      {summaryText && (
        <div
          style={{
            marginTop: "1.5rem",
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            fontSize: "1.1rem",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>Summary:</strong>
          <p>{summaryText}</p>
        </div>
      )}
    </div>
  );
}

const controlButtonStyle = {
  fontSize: "1.8rem",
  backgroundColor: "#007bff",
  border: "none",
  color: "white",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  transition: "background-color 0.3s ease",
};

export default App;
