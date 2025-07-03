require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const OpenAI = require('openai');


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI with latest SDK format
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔁 Function to summarize content using OpenAI
async function summarizeText(text) {
  const prompt = `Summarize the following article in 5-6 concise sentences:\n\n${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful summarizer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ OpenAI summarization error:", err.message);
    throw new Error("Failed to generate summary");
  }
}

// 📥 Extract route
app.post('/extract', async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (url.includes('twitter.com') || url.includes('x.com')) {
    return res.status(400).json({ error: 'Twitter/X links not supported.' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 20000,
    });

    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article?.textContent && article.textContent.length > 200) {
      const summary = await summarizeText(article.textContent);
      return res.json({
        title: article.title,
        content: article.textContent.trim(),
        summary,
      });
    } else {
      return res.status(422).json({ error: 'Content too short or not meaningful' });
    }
  } catch (err) {
    console.error('❌ Extraction or summarization failed:', err.message);
    res.status(500).json({ error: 'Processing failed', details: err.message });
  }
});

// 🔁 Health check
app.get("/", (req, res) => {
  res.send("✅ Rman backend (OpenAI summary version) is running");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
