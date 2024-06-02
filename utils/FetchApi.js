import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetchApi = async (path, method, data = null) => {
  const url = `${API_ENDPOINT}${path}`;
  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        response = await axios.post(url, data);
        break;
      case "PUT":
        response = await axios.put(url, data);
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error("Method not allowed");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
