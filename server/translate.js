// server/translate.js
// Bun has a built‑in global fetch, so we can use that directly.
export async function translateText(text, targetLang) {
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: "en",        // adjust if needed
          target: targetLang,  // e.g., 'es' for Spanish, 'fr' for French, etc.
          format: "text"
        })
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }
  