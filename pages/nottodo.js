import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // useRouter 임포트

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/nottasks');
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = res.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response');
    }

    const initialNotTasks = await res.json();

    return {
      props: { initialNotTasks },
    };
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return {
      props: { initialNotTasks: [] }, // 에러 발생 시 빈 배열 반환
    };
  }
}

export default function NotTodoList({ initialNotTasks }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
    // 클라이언트에서만 상태를 설정
    setTasks(initialNotTasks);
  }, [initialNotTasks]);

  const addTask = async () => {
    try {
      const res = await fetch('/api/nottasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!res.ok) {
        throw new Error('Failed to add task');
      }

      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
      // 적절한 오류 처리 UI를 추가할 수 있습니다.
    }
  };

  const navigateHome = () => {
    router.push('/'); // 홈 페이지로 이동
  };

  return (
    <div>
      <h1>Not-To-Do List</h1>
      {tasks.length === 0 ? (
        <p>No tasks found. Please add a new task.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <nav>
        <button onClick={navigateHome}>Go back to Home</button> {/* 버튼을 사용하여 이동 */}
      </nav>
    </div>
  );
}
