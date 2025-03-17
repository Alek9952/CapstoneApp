// server/register.js
import db from "./db.js";

export function registerHandler(req, res) {
  const { classCode, nickname } = req.body;

  if (!classCode || !nickname) {
    res.status(400).json({ error: "Class code and nickname are required." });
    return;
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO users (class_code, nickname) VALUES (?, ?)"
    );
    stmt.run(classCode, nickname);
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    // Handle error (e.g., if the account already exists)
    res.status(500).json({ error: err.message });
  }
}
