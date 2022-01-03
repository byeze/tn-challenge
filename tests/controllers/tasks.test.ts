import createHttpError from "http-errors";
import { getTasks, updateTask } from "../../src/controllers/tasks.controller";
import TaskService from "../../src/services/tasks.service";

jest.mock("../../src/services/tasks.service.ts", () => ({
  getTasks: jest.fn().mockResolvedValue([]),
  updateTask: jest.fn().mockResolvedValue(true),
}));

describe("Tasks Controller", () => {
  it("should call the service with passed parameter", async () => {
    // express mock
    const mReq: any = { query: { quantity: 10 } };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // spy on the service
    const spy = jest.spyOn(TaskService, "getTasks");

    // get the controller
    await getTasks(mReq, mRes, mNext);

    expect(spy).toHaveBeenCalledWith(10);
  });

  it("should call the service with default parameter", async () => {
    // express mock
    const mReq: any = { query: { quantity: 3 } };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // spy on the service
    const spy = jest.spyOn(TaskService, "getTasks");

    // get the controller
    await getTasks(mReq, mRes, mNext);

    expect(spy).toHaveBeenCalledWith(3);
  });

  it("should call the service and update the task with passed parameter", async () => {
    // express mock
    const mReq: any = {
      body: { isCompleted: true },
      params: { id: "10eaba7b-aaad-49a1-b5ce-0fbc714f35bb" },
    };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // spy on the service
    const spy = jest.spyOn(TaskService, "updateTask");

    // get the controller
    await updateTask(mReq, mRes, mNext);

    expect(spy).toHaveBeenCalledWith("10eaba7b-aaad-49a1-b5ce-0fbc714f35bb", {
      isCompleted: true,
    });
  });

  it("should return a validation error (invalid uuid)", async () => {
    // express mock
    const mReq: any = {
      body: { isCompleted: true },
      params: { id: "not-a-uuid" },
    };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // get the controller
    await updateTask(mReq, mRes, mNext);

    expect(mNext).toHaveBeenCalledWith(
      new createHttpError.BadRequest("Task id is not a UUID")
    );
  });

  it("should return a validation error (invalid isCompleted type)", async () => {
    // express mock
    const mReq: any = {
      body: { isCompleted: 123 },
      params: { id: "10eaba7b-aaad-49a1-b5ce-0fbc714f35bb" },
    };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // get the controller
    await updateTask(mReq, mRes, mNext);

    expect(mNext).toHaveBeenCalledWith(
      new createHttpError.BadRequest("isCompleted must be a boolean")
    );
  });

  it("should return a validation error (isCompleted not found in body)", async () => {
    // express mock
    const mReq: any = {
      body: {},
      params: { id: "10eaba7b-aaad-49a1-b5ce-0fbc714f35bb" },
    };
    const mRes: any = jest.fn();
    const mNext: any = jest.fn();

    // get the controller
    await updateTask(mReq, mRes, mNext);

    expect(mNext).toHaveBeenCalledWith(
      new createHttpError.BadRequest("Missing status")
    );
  });
});
