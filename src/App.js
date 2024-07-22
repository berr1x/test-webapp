import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

const theme = {
  bg_color: '#000',
  text_color: '#ffffff',
  hint_color: '#aaaaaa',
  link_color: '#8774e1',
  button_color: '#8774e1',
  button_text_color: '#ffffff',
  secondary_bg_color: '#0f0f0f',
  header_bg_color: '#000',
};

function App() {

  useEffect(() => {
    
    if (showModal) {
      tg.themeParams(theme)
    }
    tg.ready();
    
  }, [showModal]);

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
