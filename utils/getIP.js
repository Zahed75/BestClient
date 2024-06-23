import axios from "axios";

export const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching the IP address:", error);
    throw error;
  }
};
