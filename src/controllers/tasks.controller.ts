import { NextFunction, Request, Response } from "express";
import httpError from "http-errors";
import TaskService from "../services/tasks.service";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quantity: any = req.query.quantity || 3;
    const tasks = await TaskService.getTasks(quantity);

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id.length !== 36)
      throw new httpError.BadRequest("Task id is not a UUID");
    if (!req.body.isCompleted) throw new httpError.BadRequest("Missing status");
    if (typeof req.body.isCompleted !== "boolean")
      throw new httpError.BadRequest("isCompleted must be a boolean");

    await TaskService.updateTask(req.params.id, {
      isCompleted: req.body.isCompleted,
    });

    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
