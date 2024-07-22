import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
    tg.setHeaderColor("#000")
    tg.setBackgroundColor("#000")
  }, []);

  const onClose = () => {
    tg.close()
  };

  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
