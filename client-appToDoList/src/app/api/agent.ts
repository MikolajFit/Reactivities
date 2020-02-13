import axios, { AxiosResponse } from "axios";
import { IToDoTask } from "../models/toDoTask";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (respone: AxiosResponse) => respone.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};
const ToDoTasks = {
  list: () => requests.get("/todotasks"),
  details: (id: number) => requests.get(`/todotasks/${id}`),
  create: (toDoTask: IToDoTask) => requests.post(`/todotasks`, toDoTask),
  update: (toDoTask: IToDoTask) =>
    requests.put(`/todotasks/${toDoTask.id}`, toDoTask),
  delete: (id: number) => requests.del(`/todotasks/${id}`)
};

export default {
  ToDoTasks
};
