import React from "react";
import "./App.css"; // Make sure this imports your Tailwind + custom fonts

function App() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/starwars-bg.jpg')",
      }}
    >
<div className="fixed bottom-4 right-4 z-50">
  <button
    onClick={() => window.location.href = "/darth-vader"}
    className="rounded-full overflow-hidden w-16 h-16 border-4 border-yellow-500 shadow-lg hover:scale-110 transition-transform duration-300"
  >
    <img
      src="/darth-vader.jpg"
      alt="Darth Vader"
      className="w-full h-full object-cover"
    />
  </button>
</div>


      {/* Top bar with logo, Login & Signup */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 flex justify-between items-center px-8 py-4 z-10">
        {/* Logo on the top-left */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Login and Signup on the top-right */}
        <div className="flex space-x-4 items-center">
          <button className="text-yellow-400 font-starwars text-lg hover:text-yellow-500 transition">
            Login
          </button>
          <button className="text-yellow-400 font-starwars text-lg border border-yellow-400 rounded-full px-4 py-1 hover:bg-yellow-400 hover:text-black transition">
            Signup
          </button>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-yellow-400 text-6xl md:text-8xl font-starwars text-center drop-shadow-[2px_2px_0_black] mb-6">
        Talkify: The Podcast Force Awakens
      </h1>

      {/* Subtitle */}
      <p className="text-yellow-400 text-2xl md:text-3xl font-starwars text-center drop-shadow-[2px_2px_0_black] mb-12 max-w-2xl">
        Paste a URL below and generate your Star Wars-inspired podcast!
      </p>

      {/* URL Input + Generate Button */}
      <div className="flex flex-col sm:flex-row items-center w-full max-w-xl space-y-4 sm:space-y-0 sm:space-x-4 z-10">
        <input
          type="text"
          placeholder="Enter article URL..."
          className="flex-grow p-4 rounded-lg text-black font-starwars text-lg outline-none border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-500 transition"
        />
        <button className="px-6 py-4 bg-yellow-400 text-black font-starwars text-lg rounded-lg hover:bg-yellow-500 transition">
          Generate Podcast
        </button>
      </div>
    </div>
  );
}

export default App;
