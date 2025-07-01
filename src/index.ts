import express, { Request, Response } from "express";
import { apiRouter } from "./routes/index.ts";
import connectDB from "./config/db.ts";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorMiddleware.ts";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.FE_URL,
  "http://192.168.1.2:3000",
  "http://192.168.1.3:3000",
  "http://192.168.1.4:3000",
  "http://192.168.1.5:3000",
  "http://192.168.1.6:3000",
].filter((origin): origin is string => typeof origin === "string");

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("HI");
});

app.use("/api", apiRouter);

app.all(/.*/, (req: Request, res: Response) => {
  res.status(404).json({ message: "End point does not exist" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
