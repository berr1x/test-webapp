import { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import Account from './components/Account/Account';
import 'animate.css'
import axios from 'axios';

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

  const [userImage, setUserImage] = useState("");

  const getUserInfo = async (id) => {
    try {
        const response = await axios.post('https://polemos.na4u.ru/getInfoByTelegramId', {
            telegramId: id
        });

        const data = response.data
        console.log(data)
        setUserImage(data[0].photo_url)
    } catch (err) {
        console.log(err)
    }
  };

  useEffect(() => {
  
    tg.setHeaderColor(theme.header_bg_color)
    tg.ready();
    setOpacity(0);

    getUserInfo(tg.initDataUnsafe.user.id)

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
        <Loading hapticFeedback={hapticFeedback} hidden={loadingVisible} userImage={userImage} />
        <Account hidden={accountVisible} opacity={opacity} />
    </div>
  );
}

export default App;
