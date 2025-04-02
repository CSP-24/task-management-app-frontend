import axios from "axios";

const path = import.meta.env.VITE_TASK_PATH;
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const DELETE = async (id) => {
  const resp = await instance.delete(path + `/${id}`);
  return resp.data;
};

export const GET = async (config) => {
  const resp = await instance.get(path, config);
  return resp.data;
};

export const POST = async (config) => {
  const resp = await instance.post(path, config);
  return resp.data;
};

export const PUT = async (id, config) => {
  const resp = await instance.put(path + `/${id}`, config);
  return resp.data;
};
