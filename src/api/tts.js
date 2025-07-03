
// src/api/tts.js

export async function convertTextToSpeech(text) {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("Speech Synthesis not supported in this browser."));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    // Optional: use preferred voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name === "Google US English");
    if (preferredVoice) utterance.voice = preferredVoice;

    // Speak the summary
    speechSynthesis.speak(utterance);

    resolve("spoken"); // We don't need a URL anymore
  });
}
