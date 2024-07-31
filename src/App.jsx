import { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import Account from './components/Account/Account';
import 'animate.css'

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

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [accountVisible, setAccountVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
  
    tg.setHeaderColor(theme.header_bg_color)
    tg.ready();
    tg.enableClosingConfirmation()
    tg.expand()
    setOpacity(0);

    setTimeout(() => {
      setLoadingVisible(false)
      setAccountVisible(true)
      setOpacity(100)
    }, 5000)
    
  }, []);

  const hapticFeedback = () => {
    tg.HapticFeedback.impactOccurred('soft')
  };

  return (
    <div className="App">
        <Loading hapticFeedback={hapticFeedback} hidden={loadingVisible} />
        <Account hidden={accountVisible} opacity={opacity} />
    </div>
  );
}

export default App;
