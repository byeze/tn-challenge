import HttpError from "http-errors";
import { getRepository } from "typeorm";
import { Task } from "../entities/task.entity";
import FakerService from "./faker.service";

export default class TaskService {
  static async createTask(title: string) {
    const task = new Task();

    task.title = title;
    task.isCompleted = false;

    const taskRespository = getRepository(Task);

    const result = await taskRespository.save(task);

    return result;
  }

  public static async getTasks(number: number) {
    const taskRespository = getRepository(Task);

    const tasks = await taskRespository.find({
      take: number || 3,
    });

    let fakeTasks;
    if (!tasks.length) {
      const newTasks: any[] = [];
      fakeTasks = await FakerService.getTasks(number || 3);

      fakeTasks.forEach(async (task: string) => {
        const result = this.createTask(task);
        newTasks.push(result);
      });

      return Promise.all(newTasks);
    }

    return tasks;
  }

  public static async updateTask(
    id: string,
    { isCompleted }: { isCompleted: boolean }
  ) {
    const taskRespository = getRepository(Task);

    const task = await taskRespository.findOne(id);

    if (!task) throw new HttpError.NotFound("Task not found");
    if (task.isCompleted)
      throw new HttpError.Conflict("Task already completed");

    const result = await taskRespository.update({ id }, { isCompleted });

    return result.affected === 1;
  }
}
