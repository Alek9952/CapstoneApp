// server/login.js
import db from "./db.js";

export function loginHandler(req, res) {
  const { classCode, nickname } = req.body;

  if (!classCode || !nickname) {
    res.status(400).json({ error: "Class code and nickname are required." });
    return;
  }

  const stmt = db.prepare("SELECT * FROM users WHERE class_code = ? AND nickname = ?");
  const user = stmt.get(classCode, nickname);

  if (!user) {
    res.status(401).json({ error: "Login not found. Please check your credentials." });
    return;
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      classCode: user.class_code,
      nickname: user.nickname,
      trophies: user.trophies,
      coins: user.coins,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  });
}
