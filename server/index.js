const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

// ROUTES
const userRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postsRoutes");
const commentsRouter = require("./routes/commentRoutes");

const app = express();

// Implement CORS restrictions
app.use(cors());

// Implement rate limiting for API from same IP
app.use(
  "/",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour.",
  })
);

// SET SECURITY HTTP HEADERS WITH HELMET
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// Cross-Site Scripting protection
app.use(xss());

// BODY PARSER
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// REQUEST BODY COMPRESSION MIDDLEWARE
app.use(compression());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

module.exports = app;
