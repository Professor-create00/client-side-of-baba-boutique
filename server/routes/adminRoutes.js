import express from "express";
import jwt from "jsonwebtoken";
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
