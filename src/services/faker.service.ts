import axios from "axios";
import HttpError from "http-errors";

export default class FakerService {
  static async getTasks(quantity: number): Promise<string[]> {
    try {
      const { data } = await axios.get(
        `https://lorem-faker.vercel.app/api?quantity=${quantity}`
      );

      return data;
    } catch (error) {
      throw new HttpError.ServiceUnavailable(error.message);
    }
  }
}
