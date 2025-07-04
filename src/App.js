import React, { useState } from "react";
import "./App.css";
import starwarsBg from "./assets/starwars-bg.jpg";
import logo from "./assets/logo.png";
import darthVader from "./assets/darth-vader.jpg";

function App() {
  const [url, setUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setArticleText("");
    setAudioUrl("");
    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setArticleText(data.text);
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error("Error generating podcast:", error);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${starwarsBg})` }}
    >
      {/* Bottom right Darth Vader image */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => window.location.href = "/darth-vader"}
          className="rounded-full overflow-hidden w-16 h-16 border-4 border-yellow-500 shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <img
            src={darthVader}
            alt="Darth Vader"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Top bar with logo */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 flex justify-start items-center px-8 py-4 z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Title with crawl style & black border */}
      <h1 className="text-yellow-400 text-6xl md:text-8xl font-starwars text-center animate-crawl3d mb-6 drop-shadow-[2px_2px_0_black] border-black border-4 px-4">
  Talkify: The Podcast Force Awakens
</h1>

<p className="text-yellow-400 text-2xl md:text-3xl font-starwars text-center drop-shadow-[2px_2px_0_black] mb-12 max-w-2xl animate-crawl3d">
  Paste a URL below and generate your Star Wars-inspired podcast!
</p>


      {/* URL Input + Generate Button */}
      <div className="flex flex-col sm:flex-row items-center w-full max-w-xl space-y-4 sm:space-y-0 sm:space-x-4 z-10">
        <input
          type="text"
          placeholder="Enter article URL..."
          className="flex-grow p-4 rounded-lg text-black font-starwars text-lg outline-none border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-500 transition"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !url}
          className={`px-6 py-4 font-starwars text-lg rounded-lg transition text-black ${
            loading || !url
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {loading ? "Generating..." : "Generate Podcast"}
        </button>
      </div>

      {/* Article text & audio output */}
      {articleText && (
        <div className="bg-black bg-opacity-70 mt-12 max-w-3xl w-full p-6 rounded-lg shadow text-yellow-300 font-starwars overflow-y-auto max-h-96 z-10">
          <h2 className="text-2xl font-bold mb-4">Article Text:</h2>
          <p className="whitespace-pre-wrap">{articleText}</p>
        </div>
      )}

      {audioUrl && (
        <div className="bg-black bg-opacity-70 mt-8 max-w-3xl w-full p-6 rounded-lg shadow flex flex-col items-center z-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-300 font-starwars">
            Podcast Audio:
          </h2>
          <audio controls src={audioUrl} className="w-full mb-4" />
        </div>
      )}
    </div>
  );
}

export default App;
