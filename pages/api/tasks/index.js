// pages/api/tasks/index.js
import { handleGetTasks, handleCreateTask } from '../../../controllers/taskController';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await handleGetTasks(req, res);
      break;
    case 'POST':
      await handleCreateTask(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
