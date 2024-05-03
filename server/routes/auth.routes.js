import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import passport from "passport";
// import passport  from "../passport.js";
import authenticateUser from "../middleware/auth.js";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      withCredentials: true,
    });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure : true,
      withCredentials: true,
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.get("/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("token").json("Logged out");
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    try {
      // console.log(`heree is the req.user ${req.user} thank you`, req.user._json.email);
      const token = jwt.sign(
        { email: req.user._json.email },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        withCredentials: true,
      });
      res
        .json({ email: req.user._json.email })
        .redirect(`${process.env.FRONTEND_URL}/homepage`);
    } catch (error) {
      res.status(500).json({ message: error.m });
    }
  }
);

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json("Login failed");
});

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "user has successfully logged in",
      user: req.user,
    });
  } else {
    res.status(401).json({
      message: "user has not logged in",
    });
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default authRouter;
