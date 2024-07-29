import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Task Manager</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button onClick={() => navigateTo('/todo')} className={styles.navLink}>
              To-Do List
            </button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => navigateTo('/nottodo')} className={styles.navLink}>
              Not-To-Do List
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
