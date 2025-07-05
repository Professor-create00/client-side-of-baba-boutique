import jwt from "jsonwebtoken";

const ADMIN_USERNAME = "m";
const ADMIN_PASSWORD = "m"; // 👈 Change to secure password

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
