import { PasswordGenerator } from './components/PasswordGnerator/PasswordGenerator.tsx';
import styles from './App.module.scss';

const App = () => {
  return (
    <main className={styles.layout}>
      <PasswordGenerator />
    </main>
  );
};

export default App;
