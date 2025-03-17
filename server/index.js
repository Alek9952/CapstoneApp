// server/index.js
import express from "express";
import { loginHandler } from "./login.js";
import { registerHandler } from "./register.js";
import { translateText } from "./translate.js";
import db from "./db.js";

const app = express();
app.use(express.json());

// Registration endpoint
app.post("/register", registerHandler);

// Login endpoint
app.post("/login", loginHandler);

// Translation endpoint
app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) {
    return res.status(400).json({ error: "Text and target language are required." });
  }
  try {
    const translatedText = await translateText(text, targetLang);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Additional endpoints as needed...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
