import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const errMessage =
    err.message || "Something went wrong. Please try again later.";

  res.status(statusCode).json({ message: errMessage });
};

export default errorHandler;
