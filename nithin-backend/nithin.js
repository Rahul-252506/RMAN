const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());

// POST /extract route
app.post('/extract', async (req, res) => {
  const { url } = req.body;
  console.log("✅ Received URL:", url);

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (url.includes('twitter.com') || url.includes('x.com')) {
    return res.status(400).json({ error: 'Twitter/X links not supported.' });
  }

  let browser;
  try {
    console.log("🌀 Launching Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
        '--no-zygote'
      ]
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

    console.log("🌐 Navigating to:", url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log("⏳ Waiting for content to fully render...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const html = await page.content();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article?.textContent && article.textContent.length > 200) {
      console.log("✅ Extraction successful.");
      res.json({
        title: article.title,
        content: article.textContent.trim()
      });
    } else {
      console.log("⚠ Content too short.");
      res.status(422).json({ error: 'Content too short or not meaningful' });
    }
  } catch (err) {
    console.error("❌ Extraction failed:", err.message);
    res.status(500).json({ error: 'Extraction failed', details: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

// GET /
app.get("/", (req, res) => {
  res.send("✅ Rman backend (Puppeteer version) is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
