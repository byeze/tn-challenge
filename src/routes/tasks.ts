import express from "express";
import { getTasks, updateTask } from "../controllers/tasks.controller";

const router = express.Router();

router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);

export default router;
