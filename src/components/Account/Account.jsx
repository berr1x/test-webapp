import './Account.css'
import { AiOutlineRight, AiOutlineAppstore } from "react-icons/ai";
import Coin from '../Coin/Coin';
import 'animate.css'

import { animated, useSpring } from '@react-spring/web'
import { useCallback, useEffect, useState } from 'react';

const Account = ({hidden, opacity}) => {

    const [sizeW, setSizeW] = useState(256)
    const [sizeH, setSizeH] = useState(256)
    
    const [skewX, setSkewX] = useState(0)
    const [skewY, setSkewY] = useState(0)

    

    function useLocalStorageArray(key, defaultValue = []) {
        const [value, setter] = useState(() => {
            let current = localStorage.getItem(key)
            if (!current) {
                current = JSON.stringify(defaultValue)
                localStorage.setItem(key, current)
            }
            return JSON.parse(current);
        })
        const setValue = useCallback((value) => {
            setter(() => {
                localStorage.setItem(key, JSON.stringify(value));
                return value;
            })
        }, [setter])
        return [value, setValue]
    }

    const [coins, setCoins] = useLocalStorageArray("coins")
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("coins") == "[]")
        {
            setCoins(0)
        }
    }, [])

    const clicked = (e) => {
        setSizeW(250)
        setSizeH(250)
        const boxWidth = e.currentTarget.offsetWidth;
        const boxHeight = e.currentTarget.offsetHeight;
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let skewX = 0;
        let skewY = 0;

        if (x < boxWidth / 2) {
          skewX = -5; // skew left
        } else {
          skewX = 5;  // skew right
        }

        if (y < boxHeight / 2) {
          skewY = -5; // skew up
        } else {
          skewY = 5;  // skew down
        }

        setSkewY(skewY)
        setSkewX(skewX)
        let coins = Number(localStorage.getItem("coins"))+1
        setCoins(coins)

        const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClicks((prevClicks) => [...prevClicks, newClick]);
    
        // Remove click after animation
        setTimeout(() => {
            setClicks((prevClicks) => prevClicks.filter((click) => click.id !== newClick.id));
        }, 1000); // Adjust time to match the animation duration

        setTimeout(() => {
            setSkewX(0)
            setSkewY(0)
            setSizeW(256)
            setSizeH(256)
        }, 50)
    };

    const slideInProps = useSpring({
        from: {
          transform: `translateY(${opacity}%)`, // Начальное положение - выезжает снизу
          opacity: 0, // Начальная непрозрачность
        },
        to: {
          transform: 'translateY(0%)', // Конечное положение - в исходной позиции
          opacity: 1, // Максимальная непрозрачность
        },
        config: { duration: 200 }, // Длительность в миллисекундах (2 секунды)
    });

    return (
        <div>
            {hidden ? (
            <div class="container">
                <div className="home" nav-content={"1"}>
                    home
                </div>

                <div className="friends" nav-content={"2"}>
                    friends
                </div>

                <div className="tap active" nav-content={"3"}>
                    <animated.div className="checkAccount" style={slideInProps}>
                            <div className="score">
                                <p>Кол-во BOOSTS</p>
                            </div>

                            <div className="dogInfo">
                                <div className="dogCoin">
                                    <img src={require('../../img/coin.png')} alt="dog" width={42} height={42} draggable={false} />
                                    <p>{coins}</p>
                                </div>
                                <p className='status'>Bronze <span><AiOutlineRight /></span></p>
                            </div>

                            <div className='coin'>
                                <div onClick={clicked} style={{transform: `skew(${skewY}deg, ${skewX}deg)`, transition: "2s"}}>
                                    <img src={require('../../img/coin_big.png')} alt="dog" width={sizeW} height={sizeH} draggable={false} />
                                </div>
                                {clicks.map((click) => (
                                    <div
                                        key={click.id}
                                        className="click-animation"
                                        style={{ left: click.x, top: click.y }}
                                    >
                                    +1
                                    </div>
                                ))}
                            </div>

                    </animated.div>
                </div>

                <div className="rating" nav-content={"4"}>
                    rating
                </div>

                <div className="tasks" nav-content={"5"}>
                    tasks
                </div>

                <nav className="panel">
                    <button className="wave" nav-id="1">
                        <i class="icon"><img src={require('../../img/home.png')} alt="home" width={24} height={24} /></i>
                        <span>Home</span>
                    </button>
                    <button className="wave" nav-id="2">
                        <i class="icon"><img src={require('../../img/friends.png')} alt="friends" width={24} height={24} /></i>
                        <span>Friends</span>
                    </button>
                    <button className="wave active" nav-id="3">
                        <i class="icon shadow"><img src={require('../../img/tap.png')} alt="tap" width={24} height={24} /></i>
                        <span className='tapbtn'>Tap</span>
                    </button>
                    <button className="wave" nav-id="4">
                        <i class="icon"><img src={require('../../img/rating.png')} alt="rating" width={24} height={24} /></i>
                        <span>Rating</span>
                    </button>
                    <button className="wave" nav-id="5">
                        <i class="icon"><img src={require('../../img/tasks.png')} alt="tasks" width={24} height={24} /></i>
                        <span>Tasks</span>
                    </button>
                </nav>
            </div>
            ) : (
                <div></div>
            )}
        </div>
    );

};

export default Account;