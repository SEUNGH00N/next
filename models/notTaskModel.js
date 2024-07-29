// models/notTaskModel.js
import pool from '../lib/db';

export async function getNotTasks() {
  const [tasks] = await pool.query('SELECT * FROM not_tasks');
  return tasks;
}

export async function createNotTask(title) {
  const [result] = await pool.query('INSERT INTO not_tasks (title) VALUES (?)', [title]);
  const [newTask] = await pool.query('SELECT * FROM not_tasks WHERE id = ?', [result.insertId]);
  return newTask[0];
}
