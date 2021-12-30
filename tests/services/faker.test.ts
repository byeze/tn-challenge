import axios from "axios";
import FakerService from "../../src/services/faker.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Faker Service", () => {
  it("should return results from the api", async () => {
    // sample data
    const sampleData = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    ];

    // mock axios call
    mockedAxios.get.mockResolvedValue({
      data: sampleData,
    });

    // call service
    const result = await FakerService.getTasks(3);

    // assert
    expect(result).toEqual(sampleData);
  });

  it("should throw an error if the api is down", async () => {
    // mock axios call
    mockedAxios.get.mockRejectedValue({
      message: "API is down",
    });

    // call service
    try {
      await FakerService.getTasks(3);
    } catch (error) {
      // assert
      expect(error.message).toEqual("API is down");
      expect(error.statusCode).toEqual(503);
    }
  });
});
