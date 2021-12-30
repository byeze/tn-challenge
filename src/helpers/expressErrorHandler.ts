import { NextFunction, Response, Request } from "express";

export function expressErrorHandler() {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.statusCode || 500,
    });

    next();
  };
}
