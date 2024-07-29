// controllers/notTaskController.js
import { getNotTasks, createNotTask } from '../models/notTaskModel';

export async function handleGetNotTasks(req, res) {
  try {
    const tasks = await getNotTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function handleCreateNotTask(req, res) {
  try {
    const { title } = req.body;
    const newTask = await createNotTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}
