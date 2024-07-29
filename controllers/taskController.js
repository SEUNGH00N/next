// controllers/taskController.js
import { getTasks, createTask } from '../models/taskModel';

export async function handleGetTasks(req, res) {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function handleCreateTask(req, res) {
  try {
    const { title } = req.body;
    const newTask = await createTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}
