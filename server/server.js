import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "https://imagify-frontend-taupe.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials such as cookies, authorization headers, etc.
};

app.use(express.json());
app.use(cors(corsOptions));
await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
