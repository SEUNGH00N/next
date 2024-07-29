// pages/api/nottasks/index.js
import { handleGetNotTasks, handleCreateNotTask } from '../../../controllers/notTaskController';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await handleGetNotTasks(req, res);
      break;
    case 'POST':
      await handleCreateNotTask(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
