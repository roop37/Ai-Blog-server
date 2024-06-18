const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, email, password: hashedPassword });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token, user: savedUser });
  } catch (err) {
    res.status(400).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
  res.json({ token, user });
};

const authenticateUser = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Unauthorized. Token is missing." });

  token = token.split(" ")[1];
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { registerUser, loginUser, authenticateUser };
