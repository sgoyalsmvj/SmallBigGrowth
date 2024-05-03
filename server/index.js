import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import leadRouter from "./routes/lead.routes.js";
import paymentRouter from "./routes/payment.routes.js";
// import cookieSession from "cookie-session";
import passport from "passport";
import session from "express-session";
import passport from "./passport.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["test"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", leadRouter);
app.use("/", paymentRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
