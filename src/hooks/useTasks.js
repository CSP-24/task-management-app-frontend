import { useEffect, useContext } from "react";
import { DELETE, GET, POST, PUT } from "../api/axios";
import { TaskContext } from "../contexts/taskContext";

const STATUS_VALUES = ["To Do", "In Progress", "Completed"];

function sortTasks(tasks) {
  return tasks.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return STATUS_VALUES.indexOf(a.status) - STATUS_VALUES.indexOf(b.status);
  });
}

export default function useTasks() {
  const { tasks, setTasks } = useContext(TaskContext);
  const fetchTasks = async () => {
    return GET().then((_tasks) => {
      setTasks(sortTasks(_tasks));
    });
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const createTask = async (task) => {
    return POST(task).then(fetchTasks);
  };
  const deleteTaskById = async (id) => {
    return DELETE(id).then(fetchTasks);
  };
  const updateTask = async (task) => {
    const id = task.id;
    const config = {
      title: task.title,
      description: task.description,
      status: task.status,
    };
    return PUT(id, config).then(fetchTasks);
  };

  return {
    tasks,
    fetchTasks,
    createTask,
    deleteTaskById,
    updateTask,
  };
}
