// pages/todo.js
import { useState } from 'react';
import { useRouter } from 'next/router'; // useRouter 임포트

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/tasks');

    // 응답 상태 코드가 200 OK인지 확인
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const initialTasks = await res.json();
    return {
      props: { initialTasks },
    };
  } catch (error) {
    // 에러 핸들링 및 기본값 설정
    console.error('Error fetching tasks:', error.message);
    return {
      props: {
        initialTasks: [], // 기본값을 빈 배열로 설정
      },
    };
  }
}

export default function TodoList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const router = useRouter();

  const addTask = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <nav>
        <button onClick={navigateHome}>Go back to Home</button>
      </nav>
    </div>
  );
}
