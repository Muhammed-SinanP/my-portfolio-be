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

const corsOptions = {
  origin: process.env.FE_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
