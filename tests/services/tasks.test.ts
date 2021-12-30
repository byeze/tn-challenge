import Sinon, { createStubInstance } from "sinon";
import { Connection, ConnectionManager, Repository } from "typeorm";
import { Task } from "../../src/entities/task.entity";
import TaskService from "./../../src/services/tasks.service";

const sampleTasks: Task[] = [
  {
    id: "011863c3-613f-4ce3-8dc0-8289d75eb637",
    title: "at recusandae consequatur",
    isCompleted: false,
  },
  {
    id: "0af948f5-3609-4ada-a3a3-6fd77fae6ef6",
    title: "voluptas dicta nisi",
    isCompleted: false,
  },
];

describe("TaskService", () => {
  const sandbox = Sinon.createSandbox();

  beforeEach(() => {
    const mockRepo = createStubInstance(Repository);

    mockRepo.find.withArgs({ take: 3 }).resolves(sampleTasks);

    // stub connection
    sandbox.stub(ConnectionManager.prototype, "get").returns({
      getRepository: () => mockRepo,
    } as unknown as Connection);
  });

  describe("getTasks", () => {
    test("should return a set of 3 tasks of the db", async () => {
      const tasks = await TaskService.getTasks(3);

      expect(tasks).toBeTruthy();
      expect(tasks).toEqual(sampleTasks);
    });

    test("should return a set of 3 tasks of the db given 0 quantity (default)", async () => {
      const tasks = await TaskService.getTasks(0);

      expect(tasks).toBeTruthy();
      expect(tasks).toEqual(sampleTasks);
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
});
