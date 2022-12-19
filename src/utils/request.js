import axios from "axios";

const request = axios.create({
  baseURL: "https://tiktok.fullstack.edu.vn/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (path, options = {}) => {
  try {
    const response = await request.get(path, options);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export default request;