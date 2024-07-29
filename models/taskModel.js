// models/taskModel.js
import pool from '../lib/db';

export async function getTasks() {
  const [tasks] = await pool.query('SELECT * FROM tasks');
  return tasks;
}

export async function createTask(title) {
  const [result] = await pool.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
  return newTask[0];
}
