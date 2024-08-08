import './Account.css'
import { AiOutlineRight, AiOutlineAppstore } from "react-icons/ai";
import Coin from '../Coin/Coin';
import 'animate.css'
import axios, { AxiosError } from 'axios';
import TaskCard from '../TaskCard/TaskCard';
import TestTaskCard from '../TestTaskCard/TestTaskCard';
import LeaderBoardCard from '../LeaderBoardCard/LeaderBoardCard'
import TaskProgressCard from '../TaskProgressCard/TaskProgressCard';

const tg = window.Telegram.WebApp;

import { animated, useSpring } from '@react-spring/web'
import { useCallback, useEffect, useState } from 'react';
import MembersCard from '../MembersCard/MembersCard';


const Account = ({hidden, opacity}) => {

    const [url, _] = useState("https://t.me/testmyprojects_bot");

    const [sizeW, setSizeW] = useState(280)
    const [sizeH, setSizeH] = useState(280)
    
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

    const [tgId, setTgId] = useState("");

    const [coins, setCoins] = useLocalStorageArray("coins")
    const [clicks, setClicks] = useState([]);

    const [balance, setBalance] = useState(0)
    const [energy, setEnergy] = useState(500);

    const [userReferalLink, setUserReferalLink] = useState("")

    const [barWidth, setBarWidth] = useState(100);
    const [lastBarWidth, setLastBarWidth] = useState(100);
    const [lastEnergy, setLastEnergy] = useState(500);

    // const [username, setUsername] = useState("Андрей Штакельберг");
    const [userData, setUserData] = useState(null);
    const [userImage, setUserImage] = useState("none");
    const [userRefsCount, setUserRefsCount] = useState("0");

    const [leaderBoardInfo, setLeaderBoardInfo] = useState([]);
    const [membersInfo, setMembersInfo] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    const getReferalLink = async (id) => {
        await axios.post('https://polemos.na4u.ru/getUserRefs', {referer: id})
            .then(response => {
                // Проверка на успешное получение данных
                if (response.status === 200) {
                    setUserRefsCount(response.data.refs.count)
                } else {
                    console.error('Error fetching data', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });
    };

    const shareLink = async () => {
        navigator.clipboard.writeText(userReferalLink)
        tg.showAlert("Ссылка скопирована")
    };

    const getUserInfo = async (id) => {
        try {
            const response = await axios.post('https://polemos.na4u.ru/getInfoByTelegramId', {
                telegramId: id
            });

            const data = response.data
            // console.log(data)
            setUserImage(data.photo_url)
            setBalance(data.balance)
            setEnergy(data.energy)
            setBarWidth(data.bar_width)
            setTgId(data.telegramId)
            setUserReferalLink(`${url}?start=${data.telegramId}`)
            getReferalLink(data.telegramId)
        } catch (err) {
            console.log(err)
        }
    };


    const tasksRefresh = () => {
        axios.post('https://polemos.na4u.ru/getAllTasks')
            .then(response => {
                // Проверка на успешное получение данных
                if (response.status === 200) {
                    setAllTasks(response.data);
                } else {
                    console.error('Error fetching data', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });
    };

    useEffect(() => {
        if (tg.initDataUnsafe)
        {
            setUserData(tg.initDataUnsafe.user)
            tg.disableVerticalSwipes()
            // setUserImage(tg.initDataUnsafe.user.photo_url)
            getUserInfo(tg.initDataUnsafe.user.id)
            // getUserInfo("5961301232")
            
        }
    }, [])

    useEffect (() => {
        axios.post('https://polemos.na4u.ru/getLeaderBoard')
            .then(response => {
                // Проверка на успешное получение данных
                if (response.status === 200) {
                    setLeaderBoardInfo(response.data);
                } else {
                    console.error('Error fetching data', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });

        axios.post('https://polemos.na4u.ru/getAllUsers')
            .then(response => {
                // Проверка на успешное получение данных
                if (response.status === 200) {
                    setMembersInfo(response.data);
                } else {
                    console.error('Error fetching data', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });

        axios.post('https://polemos.na4u.ru/getAllTasks')
            .then(response => {
                // Проверка на успешное получение данных
                if (response.status === 200) {
                    setAllTasks(response.data);
                } else {
                    console.error('Error fetching data', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });

        
    }, [])

    // useEffect(() => {
    //     let timer;
    
    //     if (energy < 500) {
    //       // If energy is less than 300, set a timeout for 3 seconds
    //         timer = setTimeout(() => {
    //         // If energy hasn't changed in the last 3 seconds, increase it by 1
    //             if (energy === lastEnergy) {
    //                 setEnergy(prevEnergy => Math.min(prevEnergy + 1, 500));
    //             }
    //         }, 1500);
    //     }
    
    //     // Cleanup the timer on component unmount or when energy changes
    //     return () => clearTimeout(timer);
    
    // }, [energy, lastEnergy]);

    // useEffect(() => {
    //     // Update lastEnergy whenever energy changes
    //     setLastEnergy(energy);
    // }, [energy]);
    

    // useEffect(() => {
    //     let barWidthTimer;
    
    //     if (barWidth < 100) {
    //       // If barWidth is less than 300, set a timeout for 3 seconds
    //         barWidthTimer = setTimeout(() => {
    //         // If barWidth hasn't changed in the last 3 seconds, increase it by 1
    //         if (barWidth === lastBarWidth) {
    //             setBarWidth(prevBarWidth => Math.min(prevBarWidth + 0.2, 100));
    //         }
    //     }, 1500);
    //     }
    
    //     // Cleanup the timer on component unmount or when barWidth changes
    //     return () => clearTimeout(barWidthTimer);
    
    //   }, [barWidth, lastBarWidth]); // This effect depends on barWidth and lastBarWidth
    
    //     useEffect(() => {
    //         // Update lastBarWidth whenever barWidth changes
    //         setLastBarWidth(barWidth);
    //     }, [barWidth]);

    useEffect(() => {
        let recoverInterval;
    
        if (energy < 500) {
            recoverInterval = setInterval(() => {
            const newBarWidth = barWidth + (1/5);
            axios.post('https://polemos.na4u.ru/energyRecover', { telegramId: tgId, barWidth: newBarWidth })
                .then(res => {
                    setEnergy(res.data.energy);
                    setBarWidth(res.data.barWidth);
                })
                .catch(err => console.error(err));
            }, 1000);
        }
    
        return () => clearInterval(recoverInterval);
    }, [energy, tgId]);

    const clicked = (e) => {

        if (energy < 1)
        {
            return
        }

        tg.HapticFeedback.impactOccurred('soft')

        const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClicks((prevClicks) => [...prevClicks, newClick]);
    
        // Remove click after animation
        setTimeout(() => {
            setClicks((prevClicks) => prevClicks.filter((click) => click.id !== newClick.id));
        }, 1000);

        setSizeW(275)
        setSizeH(275)
        
        // let coins = Number(localStorage.getItem("coins"))+1
        // setCoins(coins)

        // setEnergy(energy-1)

        const newBarWidth = barWidth - 0.2;
        axios.post('https://polemos.na4u.ru/click', { telegramId: tgId, barWidth: newBarWidth })
        .then(res => {
            setBalance(res.data.balance);
            setEnergy(res.data.energy);
            setBarWidth(res.data.barWidth);
        })
        .catch(err => console.error(err));

        setTimeout(() => {
            setSkewX(0)
            setSkewY(0)
            setSizeW(280)
            setSizeH(280)
        }, 50)
    };

    const opacityChange = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: { duration: 200 },
    });

    const [waveActive1, setWaveActive1] = useState("wave active");
    const [waveActive2, setWaveActive2] = useState("wave");
    const [waveActive3, setWaveActive3] = useState("wave");
    const [waveActiveShadow, setWaveActiveShadow] = useState("icon");
    const [waveActive4, setWaveActive4] = useState("wave");
    const [waveActive5, setWaveActive5] = useState("wave");

    const [homeActive, setHomeActive] = useState("home active");
    const [testEnv, setTestEnv] = useState("testEnv");
    const [styleHome, setStyleHome] = useState();

    const [friendsActive, setFriendsActive] = useState("friends");
    const [tapActive, setTapActive] = useState("tap");
    const [ratingActive, setRatingActive] = useState("rating");
    const [tasksActive, setTasksActive] = useState("tasks");

    const [notification, setNotification] = useState("none")

    // ---- TASKS ---- //

    // ---- TWITTER TASK ---- //
    const [twitterTask, setTwitterTask] = useState("twitter")
    const [twitterTaskNext, setTwitterTaskNext] = useState("twitterNext")
    const [twitterTaskDone, setTwitterTaskDone] = useState("twitterDone")
    const [twitterTaskStatus, setTwitterTastStatus] = useLocalStorageArray("twitterTask")
    ////////////////////////////

    // ---  STATUS TASKS  --- //
    const [goldStatusTask, setGoldStatusTask] = useState("goldStatus")
    const [silverStatusTask, setSilverStatusTask] = useState("silverStatus")
    const [bronzeStatusTask, setBronzeStatusTask] = useState("bronzeStatus")
    ///////////////////////////

    const twitterClickFirst = () => {
        tg.showConfirm("Я уверен, что подписался на Твиттер", (ok) => {
            if (ok) {
                setWaveActive1("wave")
                setWaveActive2("wave")
                setWaveActive3("wave")
                setWaveActiveShadow("icon")
                setWaveActive4("wave")
                setWaveActive5("wave active")
    
                //displays
                setHomeActive("home")
                setFriendsActive("friends")
                setTapActive("tap")
                setRatingActive("rating")
                setTasksActive("tasks")
                setTwitterTask("twitter")
                setTwitterTaskNext("twitterNext active")
            }
        })
        // setWaveActive1("wave")
        // setWaveActive2("wave")
        // setWaveActive3("wave")
        // setWaveActiveShadow("icon")
        // setWaveActive4("wave")
        // setWaveActive5("wave active")

        // //displays
        // setHomeActive("home")
        // setFriendsActive("friends")
        // setTapActive("tap")
        // setRatingActive("rating")
        // setTasksActive("tasks")
        // setTwitterTask("twitter")
        // setTwitterTaskNext("twitterNext active")
        // setTwitterTaskDone("twitterDone")
    };

    const goToTasks = () => {
        //waves
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave active")

        //displays
        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks active")
        setTwitterTask("twitter")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
        setGoldStatusTask("goldStatus")
        setSilverStatusTask("silverStatus")
        setBronzeStatusTask("bronzeStatus")
    };

    const goldStatusClick = () => {
        //waves
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave active")

        //displays
        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks")
        setTwitterTask("twitter")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
        setGoldStatusTask("goldStatus active")
        setBronzeStatusTask("bronzeStatus")
    };

    const silverStatusClick = () => {
        //waves
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave active")

        //displays
        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks")
        setTwitterTask("twitter")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
        setGoldStatusTask("goldStatus")
        setSilverStatusTask("silverStatus active")
        setBronzeStatusTask("bronzeStatus")
    };

    const bronzeStatusClick = () => {
        //waves
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave active")

        //displays
        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks")
        setTwitterTask("twitter")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
        setGoldStatusTask("goldStatus")
        setSilverStatusTask("silverStatus")
        setBronzeStatusTask("bronzeStatus active")
    };

    const twitterClickDone = () => {
        setTwitterTastStatus("wait")
        tg.showAlert("Задание отправлено на проверку", () => {
            setWaveActive1("wave active")
            setWaveActive2("wave")
            setWaveActive3("wave")
            setWaveActiveShadow("icon")
            setWaveActive4("wave")
            setWaveActive5("wave")
            setStyleHome(opacityChange)
            //displays
            setHomeActive("home active")
            setFriendsActive("friends")
            setTapActive("tap")
            setRatingActive("rating")
            setTasksActive("tasks")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
        })
    };


    const twitterClick = () => {

        if (twitterTaskStatus != "none") {
            tg.showAlert("Вы уже выполнили это задание")
            return
        }

        //waves
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave active")

        //displays
        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks")
        setTwitterTask("twitter active")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
    }

    /////////////////////

    useEffect(() => {
        if (localStorage.getItem("twitterTask") == "[]") {
            setTwitterTastStatus("none")
        }
    }, [])

    const testEnvironment = () => {
        setWaveActive1("wave")
        setWaveActive2("wave")
        setWaveActive3("wave")
        setWaveActiveShadow("icon")
        setWaveActive4("wave")
        setWaveActive5("wave")

        setHomeActive("home")
        setFriendsActive("friends")
        setTapActive("tap")
        setRatingActive("rating")
        setTasksActive("tasks")
        setTwitterTask("twitter")
        setTwitterTaskNext("twitterNext")
        setTwitterTaskDone("twitterDone")
        setGoldStatusTask("goldStatus")
        setSilverStatusTask("silverStatus")
        setBronzeStatusTask("bronzeStatus")
        setTestEnv("testEnv active")
    };

    const navigateMenuHandler = (e) => {
        if (e.currentTarget.getAttribute('nav-id') == 1){
            //waves
            setWaveActive1("wave active")
            setWaveActive2("wave")
            setWaveActive3("wave")
            setWaveActiveShadow("icon")
            setWaveActive4("wave")
            setWaveActive5("wave")
            setStyleHome(opacityChange)

            //displays
            setHomeActive("home active")
            setFriendsActive("friends")
            setTapActive("tap")
            setRatingActive("rating")
            setTasksActive("tasks")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
            setGoldStatusTask("goldStatus")
            setSilverStatusTask("silverStatus")
            setBronzeStatusTask("bronzeStatus")
            setTestEnv("testEnv")

        } else if (e.currentTarget.getAttribute('nav-id') == 2){
            //waves
            setWaveActive1("wave")
            setWaveActive2("wave active")
            setWaveActive3("wave")
            setWaveActiveShadow("icon")
            setWaveActive4("wave")
            setWaveActive5("wave")

            //displays
            setHomeActive("home")
            setFriendsActive("friends active")
            setTapActive("tap")
            setRatingActive("rating")
            setTasksActive("tasks")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
            setGoldStatusTask("goldStatus")
            setSilverStatusTask("silverStatus")
            setBronzeStatusTask("bronzeStatus")
            setTestEnv("testEnv")

        } else if (e.currentTarget.getAttribute('nav-id') == 3){
            //waves
            setWaveActive1("wave")
            setWaveActive2("wave")
            setWaveActive3("wave active")
            setWaveActiveShadow("icon shadow")
            setWaveActive4("wave")
            setWaveActive5("wave")

            //displays
            setHomeActive("home")
            setFriendsActive("friends")
            setTapActive("tap active")
            setRatingActive("rating")
            setTasksActive("tasks")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
            setGoldStatusTask("goldStatus")
            setSilverStatusTask("silverStatus")
            setBronzeStatusTask("bronzeStatus")
            setTestEnv("testEnv")

        } else if (e.currentTarget.getAttribute('nav-id') == 4){
            //waves
            setWaveActive1("wave")
            setWaveActive2("wave")
            setWaveActive3("wave")
            setWaveActiveShadow("icon")
            setWaveActive4("wave active")
            setWaveActive5("wave")

            //displays
            setHomeActive("home")
            setFriendsActive("friends")
            setTapActive("tap")
            setRatingActive("rating active")
            setTasksActive("tasks")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
            setGoldStatusTask("goldStatus")
            setSilverStatusTask("silverStatus")
            setBronzeStatusTask("bronzeStatus")
            setTestEnv("testEnv")

        } else if (e.currentTarget.getAttribute('nav-id') == 5){
            //waves
            setWaveActive1("wave")
            setWaveActive2("wave")
            setWaveActive3("wave")
            setWaveActiveShadow("icon")
            setWaveActive4("wave")
            setWaveActive5("wave active")

            //displays
            setHomeActive("home")
            setFriendsActive("friends")
            setTapActive("tap")
            setRatingActive("rating")
            setTasksActive("tasks active")
            setTwitterTask("twitter")
            setTwitterTaskNext("twitterNext")
            setTwitterTaskDone("twitterDone")
            setGoldStatusTask("goldStatus")
            setSilverStatusTask("silverStatus")
            setBronzeStatusTask("bronzeStatus")
            setTestEnv("testEnv")

        }
    };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [customId, setCustomId] = useState('');
    const [clickEvent, setClickEvent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('caption', title);
        formData.append('text', description);
        formData.append('customTaskId', customId);
        formData.append('clickEvent', clickEvent);
        formData.append('image', image);
    
        try {
            await axios.post('https://polemos.na4u.ru/taskCreate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // alert('Задание успешно создано');
            tg.showAlert("Задание успешно создано")
        } catch (error) {
            console.error('Ошибка при создании задания', error);
            alert('Ошибка при создании задания');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            {hidden ? (
            <div class="container">
                <div className={testEnv} nav-content={"-1"}>
                    <div className="testEnvContainer fadeAnim">
                        <div className='testEnvInfo'>
                            <p>Тестовое окружение</p>
                            <span>admin - backend - user</span>
                        </div>
                        <div className="adminEnv">
                            <p>Admin Env</p>
                            <div className="formEnv">
                                <p onClick={tasksRefresh}>Создать новое задание</p>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Название задания' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    <textarea placeholder='Описание задания (кратко)' value={description} onChange={(e) => setDescription(e.target.value)} required />
                                    <input type="text" placeholder='Кастомный ID Задания' value={customId} onChange={(e) => setCustomId(e.target.value)} required />
                                    <input type="text" placeholder='Событие клика (ссылка)' value={clickEvent} onChange={(e) => setClickEvent(e.target.value)} required />
                                    <input type="file" onChange={handleImageChange} required />
                                    <button type="submit">Создать задание</button>
                                </form>
                            </div>
                        </div>

                        <div className="userEnv">
                            <p>User Env</p>
                            {allTasks.map((task) => (
                                <TestTaskCard key={task.customTaskId} taskName={task.caption} taskDesc={task.text} img={task.img} link={task.clickEvent}/>
                            ))}
                        </div>
                    </div>
                    <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                </div>

                <div className={homeActive} nav-content={"1"}>
                    <div className="notificationContainer" style={{display: notification}}>
                        <div className='notificationBlank fadeAnim'>
                            <div className="raffle">
                                <div className="image">
                                    <img src={require('../../img/about.png')} alt="dog" draggable={false} />
                                    <p>Розыгрыш токенов проекта Canza</p>
                                </div>
                                <div className='notificationText'>
                                    <p>Зарабатывай BOOSTS и получай токены проекта.</p>
                                    <span>Чем больше BOOSTS Вы зарабаотаете, тем больше шанс выиграть до 1000$ в токенах проекта</span>
                                </div>
                                <div className='btn unselectable' onClick={() => {
                                    setNotification("none")
                                }}>
                                    <p>Понятно</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homeAccount fadeAnim">
                        <div className="score unselectable">
                            <p>Кол-во BOOSTS</p>
                            <div className="info" onClick={testEnvironment}>
                                <img src={require('../../img/coin_small.png')} alt="dog" width={34} height={34} draggable={false} />
                                <p>{balance}</p>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12.9 7C12.9 6.50294 12.4971 6.1 12 6.1C11.5029 6.1 11.1 6.50294 11.1 7V11.1H7C6.50294 11.1 6.1 11.5029 6.1 12C6.1 12.4971 6.50294 12.9 7 12.9H11.1V17C11.1 17.4971 11.5029 17.9 12 17.9C12.4971 17.9 12.9 17.4971 12.9 17V12.9H17C17.4971 12.9 17.9 12.4971 17.9 12C17.9 11.5029 17.4971 11.1 17 11.1H12.9V7Z" fill="#B51310"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="account unselectable">
                            <div className="accountInfo">
                                {userImage == "none" ? (
                                    <img src={require('../../img/avatar.png')} alt="dog" width={48} height={48} draggable={false} />
                                ) : (
                                    <div style={{borderRadius: '50px'}}>
                                        <img src={userImage} alt="avatar" width={48} height={48} draggable={false} />
                                    </div>
                                )}
                                <div className="accountInfoText">
                                    {userData == null ? (
                                        <>
                                            <p>b e r r i x</p>
                                            <span>Твой ID: 5035389002</span>
                                        </>
                                    ) : (
                                        <>
                                            <p>{userData.first_name} {userData.last_name}</p>
                                            <span>Твой ID: {userData.id}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="place">
                                <p>Place</p>
                                <span>#1501</span>
                            </div>
                        </div>

                        <div className="referal">
                            <div className='referalText unselectable'>
                                <p>Получите +2000 BOOSTS за каждого друга, которого вы пригласите по этой ссылке:</p>
                            </div>
                            <div className='details'>
                                <div className="textField">
                                    <div className="text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                        </svg>
                                        <p>{userReferalLink}</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={shareLink}>
                                    <p>Поделиться</p>
                                </div>
                            </div>
                        </div>

                        <div className='tasksPanel'>
                            <div className='tasksText unselectable'>
                                <p>Выполняй задания и получай</p>
                                <p>до 5 000 BOOSTS за выполненные задания</p>
                            </div>
                            <div className='taskCards unselectable'>
                                {/* {allTasks.map((item, index) => (
                                    <TaskCard
                                        key={index}
                                        img={item.img}
                                        taskName={item.caption}
                                        taskDesc={item.text}
                                        onClick={() => {
                                            if (item.clickEvent == "twitterClick") {
                                                return twitterClick
                                            } else if (item.clickEvent == "goldStatusClick") {
                                                return goldStatusClick
                                            } else if (item.clickEvent == "silverStatusClick") {
                                                return silverStatusClick
                                            } else if (item.clickEvent == "bronzeStatusClick") {
                                                return bronzeStatusClick
                                            } else {
                                                return
                                            }
                                        }}
                                        status={() => {
                                            if (item.clickEvent == "twitterClick") {
                                                return twitterTaskStatus
                                            } else if (item.clickEvent == "goldStatusClick") {
                                                return "none"
                                            } else if (item.clickEvent == "silverStatusClick") {
                                                return "none"
                                            } else if (item.clickEvent == "bronzeStatusClick") {
                                                return "none"
                                            } else {
                                                return
                                            }
                                        }}
                                    />
                                ))} */}

                                <TaskCard onClick={twitterClick} img={require('../../img/x.png')} taskName={"Подписаться на твиттер"} taskDesc={"Получите +200 BOOSTS"} status={twitterTaskStatus} />
                                <TaskCard onClick={goldStatusClick} img={require('../../img/goldmedal.png')} taskName={"Достигните уровня “Золото”"} taskDesc={"Получите +5000 BOOSTS"} status={"none"} />
                                <TaskCard onClick={silverStatusClick} img={require('../../img/silvermedal.png')} taskName={"Достигните уровня “Серебро”"} taskDesc={"Получите +2500 BOOSTS"} status={"none"} />
                                <TaskCard onClick={bronzeStatusClick} img={require('../../img/bronzemedal.png')} taskName={"Достигните уровня “Бронза”"} taskDesc={"Получите +500 BOOSTS"} status={"none"} />
                            </div>
                        </div>

                        <div className="slide">
                            <div className='card' onClick={() => {
                                setNotification("flex")
                            }}>
                                <img id='background' src={require('../../img/card_back.png')} alt="dog" width={252} height={266} draggable={false} />
                                <img id='polemos' src={require('../../img/polemos.png')} alt="dog" width={75} height={75} draggable={false} />
                                <div className="cardInfo">
                                    <p>О проекте</p>
                                    <span>Подробнее</span>
                                </div>
                            </div>
                            
                        </div>

                        <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                    </div>

                    
                </div>

                <div className={friendsActive} nav-content={"2"}>
                    <div className='friendsAccount fadeAnim'>
                        <div className='friendsInfo'>
                            <div className='infoCard'>
                                <p>Приглашенные пользователи:</p>
                                <div className='statistic'>
                                    <img src={require('../../img/chel.png')} alt="dog" width={42} height={52} draggable={false} />
                                    <p>{userRefsCount}</p>
                                </div>
                            </div>
                            <div className='infoCard'>
                                <p>Участники розыгрыша от Polemos</p>
                                <div className='statistic'>
                                    <img src={require('../../img/chel.png')} alt="dog" width={42} height={52} draggable={false} />
                                    <p>8398</p>
                                </div>
                            </div>
                            <div className='infoCard'>
                                <p>Общее охваченное число участников</p>
                                <div className='statistic'>
                                    <img src={require('../../img/chel.png')} alt="dog" width={42} height={52} draggable={false} />
                                    <p>8398</p>
                                </div>
                            </div>
                        </div>
                        <div className="referalInfo">
                            <div className='referalText unselectable'>
                                    <p>Get Tasks — rise in the ranking by inviting friends</p>
                                </div>
                                <div className='details'>
                                    <div className="textField">
                                        <div className="text">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                            </svg>
                                            <p>{userReferalLink}</p>
                                        </div>
                                    </div>
                                    <div className='btn unselectable' onClick={shareLink}>
                                        <p className='unselectable'>Поделиться</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                <div className={tapActive} nav-content={"3"}>
                <img src={require('../../img/backgr.png')} alt="dog" draggable={false} />
                    <div className="checkAccount fadeAnim">
                            <div className="score">
                                <p>Кол-во BOOSTS</p>
                            </div>

                            <div className="dogInfo">
                                <div className="dogCoin">
                                    <img src={require('../../img/coin.png')} alt="dog" width={42} height={42} draggable={false} />
                                    <p>{balance}</p>
                                </div>
                                <p className='status'>Bronze <span><AiOutlineRight /></span></p>
                            </div>

                            <div className='coin'>
                                <img onClick={
                                    clicked
                                } src={require('../../img/coin_big.png')} alt="dog" width={sizeW} height={sizeH} draggable={false} />
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

                            

                    </div>
                    <div className='energyBar'>
                        <div className="energyText">
                            <img src={require('../../img/energy.png')} alt="dog" width={10} height={14} draggable={false} />
                            <span>{energy}/500</span>
                        </div>
                        <div className='backgroundBar'>
                            <div className='bar' style={{width: `${barWidth}%`}} />
                        </div>
                    </div>
                </div>

                <div className={ratingActive} nav-content={"4"}>
                    <div className="ratingAccount fadeAnim">
                        <div className="account unselectable">
                                <div className="accountInfo">
                                    {userImage == "none" ? (
                                        <img src={require('../../img/avatar.png')} alt="dog" width={48} height={48} draggable={false} />
                                    ) : (
                                        <div style={{borderRadius: '50px'}}>
                                            <img src={userImage} alt="avatar" width={48} height={48} draggable={false} />
                                        </div>
                                    )}
                                    <div className="accountInfoText">
                                        {userData == null ? (
                                            <>
                                                <p>Твой ID: 5035389002</p>
                                                <span>0 rows found</span>
                                            </>
                                        ) : (
                                            <>
                                                <p>Твой ID: {userData.id}</p>
                                                <span>0 rows found</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                        </div>
                        <div className="ratingText">
                            <p>В нашей системе розыгрыша каждый BOOSTS, который вы зарабатываете, увеличивает ваши шансы на победу.</p>
                            <p>Чем больше у вас BOOSTS, тем больше ваши шансы на победу.</p>
                        </div>
                        <div className='leaderBoard'>
                            <div className='leaderBoardText'>
                                <p>ТАБЛИЦА ЛИДЕРОВ</p>
                                {/* <span>Пока здесь пусто :(</span> */}
                            </div>
                            <div className='leaderBoardContainer'>
                                {leaderBoardInfo.map((item, index) => (
                                    <LeaderBoardCard
                                        key={index}
                                        avatar={item.photo_url}
                                        name={item.name}
                                        coins={item.balance}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='leaderBoard'>
                            <div className='leaderBoardText'>
                                <p>ТАБЛИЦА ВСЕХ УЧАСТНИКОВ</p>
                                {/* <span>Пока здесь пусто :(</span> */}
                            </div>
                            <div className='leaderBoardContainer'>
                                    <MembersCard
                                        kerg={"Row"}
                                        id={"ID"}
                                    />
                                {membersInfo.map((item, index) => (
                                    <MembersCard
                                        key={index}
                                        kerg={index+1}
                                        id={item.telegramId}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                </div>

                <div className={tasksActive} nav-content={"5"}>
                    <div className="homeAccount fadeAnim">
                        <div className="account unselectable">
                            <div className="accountInfo">
                                {userImage == "none" ? (
                                    <img src={require('../../img/avatar.png')} alt="dog" width={48} height={48} draggable={false} />
                                ) : (
                                    <div style={{borderRadius: '50px'}}>
                                        <img src={userImage} alt="avatar" width={48} height={48} draggable={false} />
                                    </div>
                                )}
                                <div className="accountInfoText">
                                    {userData == null ? (
                                        <>
                                            <p>b e r r i x</p>
                                            <span>Твой ID: 5035389002</span>
                                        </>
                                    ) : (
                                        <>
                                            <p>{userData.first_name} {userData.last_name}</p>
                                            <span>Твой ID: {userData.id}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="place">
                                <p>Place</p>
                                <span>#1501</span>
                            </div>
                        </div>

                        <div className="referal">
                            <div className='referalText unselectable'>
                                <p>Получите +2000 BOOSTS за каждого друга, которого вы пригласите по этой ссылке:</p>
                            </div>
                            <div className='details'>
                                <div className="textField">
                                    <div className="text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                        </svg>
                                        <p>{userReferalLink}</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={shareLink}>
                                    <p>Поделиться</p>
                                </div>
                            </div>
                        </div>

                        <div className='tasksPanel'>
                            <div className='tasksText unselectable'>
                                <p>Выполняй задания и получай</p>
                                <p>до 5 000 BOOSTS за выполненные задания</p>
                            </div>
                            <div className='taskCards unselectable'>
                                <TaskCard onClick={twitterClick} img={require('../../img/x.png')} taskName={"Подписаться на твиттер"} taskDesc={"Получите +200 BOOSTS"} status={twitterTaskStatus} />
                                <TaskCard onClick={goldStatusClick} img={require('../../img/goldmedal.png')} taskName={"Достигните уровня “Золото”"} taskDesc={"Получите +5000 BOOSTS"} status={"none"} />
                                <TaskCard onClick={silverStatusClick} img={require('../../img/silvermedal.png')} taskName={"Достигните уровня “Серебро”"} taskDesc={"Получите +2500 BOOSTS"} status={"none"} />
                                <TaskCard onClick={bronzeStatusClick} img={require('../../img/bronzemedal.png')} taskName={"Достигните уровня “Бронза”"} taskDesc={"Получите +500 BOOSTS"} status={"none"} />
                            </div>
                        </div>

                        <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                    </div>
                </div>

                <div className={twitterTask} nav-content={"6"}>
                    <div className='taskContainer fadeAnim'>
                        <div className='taskTop'>
                            <img src={require('../../img/peoples.png')} alt="peoples" width={84} height={84} draggable={false} />
                            <p>Как получить +200 BOOSTS за подписку на Твиттер?</p>
                        </div>
                        <div className="taskBottom">
                            <div className='taskInfo'>
                                <p>1. Подпишитесь на Твиттер Polemos</p>
                                <p>2. Пришлите ссылку на Twitter</p>
                            </div>
                            <div className='taskButtons'>
                                <div className="textField">
                                    <div className="text unselectable">
                                        <p>Subscribe on Twitter</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={twitterClickFirst}>
                                    <p>Проверить задание</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={twitterTaskNext} nav-content={"7"}>
                    <div className='taskContainer'>
                        <div className='taskTop'>
                            <img src={require('../../img/peoples.png')} alt="peoples" width={84} height={84} draggable={false} />
                            <p>Введите ссылку на ваш аккаунт</p>
                        </div>
                        <div className='taskBottom'>
                            <div className='taskInfo'>
                                <p>Ссылка на Twitter должна выглядеть так:</p>
                            </div>
                            <div className='taskButtons'>
                                <div className="textField">
                                    <div className="text unselectable">
                                        <p style={{fontSize: "14px", fontWeight: "400"}} contentEditable>https://twitter.com/ВАШ_АККАУНТ</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={twitterClickDone}>
                                    <p>Получить +200 BOOSTS</p>
                                </div>
                            </div>
                            <div className="taskSuperBottom">
                                <p>Важно : запрещено использовать фейки/боты.</p>
                                <span>Мы проверяем каждого участника и в случае махинаций - аккаунт будет заблокирован и участие в розыгрыше онулировано. Нажимая на кнопку вы согласны с этими условиями</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={goldStatusTask} nav-content={'8'}>
                    <div className='statusTaskContainer fadeAnim'>
                        <div className='taskTop'>
                            <div className="taskText">
                                <p>+5,000</p>
                                <img src={require('../../img/coin_big.png')} alt="peoples" width={32} height={32} draggable={false} />
                            </div>
                            <p>переход на уровень золото</p>
                            <img src={require('../../img/gold.png')} alt="peoples" width={311} height={207} draggable={false} />
                        </div>
                        <div className="taskMiddle">
                            <p>Пригласите 3 друзей по своей ссылке и помогите как минимум 3 друзьям достичь уровня «Серебро».</p>
                            <div className="taskButtons">
                                <div className="textField">
                                    <div className="text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                        </svg>
                                        <p>{userReferalLink}</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={shareLink}>
                                    <p>Поделиться</p>
                                </div>
                            </div>
                        </div>
                        <div className='taskBottom'>
                            <div className="taskProgress">
                                <p>Прогресс:</p>
                                <div className='tasks'>
                                    <TaskProgressCard img={require('../../img/silvermedal.png')} taskName={"Друзей уровня «Серебро»"} taskDesc={"0/3"} status={"none"} />
                                    <TaskProgressCard img={require('../../img/friends.png')} taskName={"Всего приглашенных"} taskDesc={"0"} status={"none"} />
                                </div>
                            </div>
                            <div className="textField" onClick={goToTasks}>
                                <div className="text unselectable">
                                    <p>Вернуться ко всем заданиям</p>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                    </div>
                </div>

                <div className={silverStatusTask} nav-content={'9'}>
                    <div className='statusTaskContainer fadeAnim'>
                        <div className='taskTop'>
                            <div className="taskText">
                                <p>+2,500</p>
                                <img src={require('../../img/coin_big.png')} alt="peoples" width={32} height={32} draggable={false} />
                            </div>
                            <p>переход на уровень серебро</p>
                            <img src={require('../../img/silver.png')} alt="peoples" width={311} height={207} draggable={false} />
                        </div>
                        <div className="taskMiddle">
                            <p>Пригласите 3 друзей по своей ссылке и помогите как минимум 3 друзьям достичь уровня «Бронза».</p>
                            <div className="taskButtons">
                                <div className="textField">
                                    <div className="text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                        </svg>
                                        <p>{userReferalLink}</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={shareLink}>
                                    <p>Поделиться</p>
                                </div>
                            </div>
                        </div>
                        <div className='taskBottom'>
                            <div className="taskProgress">
                                <p>Прогресс:</p>
                                <div className='tasks'>
                                    <TaskProgressCard img={require('../../img/bronzemedal.png')} taskName={"Друзей уровня «Бронза»"} taskDesc={"0/3"} status={"none"} />
                                    <TaskProgressCard img={require('../../img/friends.png')} taskName={"Всего приглашенных"} taskDesc={"0"} status={"none"} />
                                </div>
                            </div>
                            <div className="textField" onClick={goToTasks}>
                                <div className="text unselectable">
                                    <p>Вернуться ко всем заданиям</p>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                    </div>
                </div>

                <div className={bronzeStatusTask} nav-content={'10'}>
                    <div className='statusTaskContainer fadeAnim'>
                        <div className='taskTop'>
                            <div className="taskText">
                                <p>+500</p>
                                <img src={require('../../img/coin_big.png')} alt="peoples" width={32} height={32} draggable={false} />
                            </div>
                            <p>переход на уровень бронза</p>
                            <img src={require('../../img/silver.png')} alt="peoples" width={311} height={207} draggable={false} />
                        </div>
                        <div className="taskMiddle">
                            <p>Пригласите 3 друзей по своей ссылке.</p>
                            <div className="taskButtons">
                                <div className="textField">
                                    <div className="text">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5633 4.2049H6.74346C6.59726 4.2049 6.45705 4.26297 6.35367 4.36635C6.2503 4.46973 6.19222 4.60994 6.19222 4.75614V7.51235H3.43601C3.28981 7.51235 3.1496 7.57043 3.04622 7.6738C2.94284 7.77718 2.88477 7.91739 2.88477 8.06359V16.8835C2.88477 17.0297 2.94284 17.1699 3.04622 17.2733C3.1496 17.3766 3.28981 17.4347 3.43601 17.4347H12.2559C12.4021 17.4347 12.5423 17.3766 12.6457 17.2733C12.749 17.1699 12.8071 17.0297 12.8071 16.8835V14.1273H15.5633C15.7095 14.1273 15.8497 14.0692 15.9531 13.9658C16.0565 13.8624 16.1146 13.7222 16.1146 13.576V4.75614C16.1146 4.60994 16.0565 4.46973 15.9531 4.36635C15.8497 4.26297 15.7095 4.2049 15.5633 4.2049ZM11.7046 16.3322H3.98725V8.61483H11.7046V16.3322ZM15.0121 13.0248H12.8071V8.06359C12.8071 7.91739 12.749 7.77718 12.6457 7.6738C12.5423 7.57043 12.4021 7.51235 12.2559 7.51235H7.2947V5.30738H15.0121V13.0248Z" fill="white"/>
                                        </svg>
                                        <p>{userReferalLink}</p>
                                    </div>
                                </div>
                                <div className='btn unselectable' onClick={shareLink}>
                                    <p>Поделиться</p>
                                </div>
                            </div>
                        </div>
                        <div className='taskBottom'>
                            <div className="taskProgress">
                                <p>Прогресс:</p>
                                <div className='tasks'>
                                    <TaskProgressCard img={require('../../img/friends.png')} taskName={"Всего приглашенных"} taskDesc={"0"} status={"none"} />
                                </div>
                            </div>
                            <div className="textField" onClick={goToTasks}>
                                <div className="text unselectable">
                                    <p>Вернуться ко всем заданиям</p>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop: "150px"}}>ㅤㅤㅤㅤㅤㅤㅤㅤ</div>
                    </div>
                </div>

                <nav className="panel">
                    <button className={waveActive1} nav-id="1" onClick={navigateMenuHandler}>
                        <i class="icon">
                            <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.2533 2.09998H12.3387C13.9453 2.09997 15.2097 2.09996 16.2242 2.18805C17.259 2.27791 18.1186 2.46459 18.8905 2.88892C19.9511 3.47201 20.824 4.34485 21.407 5.40549C21.8314 6.17735 22.0181 7.03702 22.1079 8.07181C22.196 9.08626 22.196 10.3507 22.196 11.9573V12.0427C22.196 13.6493 22.196 14.9137 22.1079 15.9281C22.0181 16.9629 21.8314 17.8226 21.407 18.5945C20.824 19.6551 19.9511 20.5279 18.8905 21.111C18.1186 21.5354 17.259 21.722 16.2242 21.8119C15.2097 21.9 13.9453 21.9 12.3387 21.9H12.2533C10.6467 21.9 9.38228 21.9 8.36783 21.8119C7.33304 21.722 6.47337 21.5354 5.70151 21.111C4.64087 20.5279 3.76803 19.6551 3.18494 18.5945C2.76061 17.8226 2.57393 16.9629 2.48407 15.9281C2.39598 14.9137 2.39599 13.6493 2.396 12.0427V11.9573C2.39599 10.3507 2.39598 9.08626 2.48407 8.07181C2.57393 7.03702 2.76061 6.17735 3.18494 5.40549C3.76803 4.34485 4.64087 3.47201 5.70151 2.88892C6.47337 2.46459 7.33304 2.27791 8.36783 2.18805C9.38229 2.09996 10.6467 2.09997 12.2533 2.09998ZM8.52354 3.9813C7.60741 4.06086 7.02939 4.21299 6.56866 4.46628C5.80735 4.88481 5.18083 5.51133 4.7623 6.27264C4.50901 6.73337 4.35688 7.31139 4.27733 8.22752C4.19679 9.15501 4.196 10.3414 4.196 12C4.196 13.6586 4.19679 14.8449 4.27733 15.7724C4.35688 16.6886 4.50901 17.2666 4.7623 17.7273C5.18083 18.4886 5.80735 19.1151 6.56866 19.5337C7.02939 19.787 7.60741 19.9391 8.52354 20.0186C9.45103 20.0992 10.6374 20.1 12.296 20.1C13.9546 20.1 15.141 20.0992 16.0685 20.0186C16.9846 19.9391 17.5626 19.787 18.0233 19.5337C18.7846 19.1151 19.4112 18.4886 19.8297 17.7273C20.083 17.2666 20.2351 16.6886 20.3147 15.7724C20.3952 14.8449 20.396 13.6586 20.396 12C20.396 10.3414 20.3952 9.15501 20.3147 8.22752C20.2351 7.31139 20.083 6.73337 19.8297 6.27264C19.4112 5.51133 18.7846 4.88481 18.0233 4.46628C17.5626 4.21299 16.9846 4.06086 16.0685 3.9813C15.141 3.90077 13.9546 3.89998 12.296 3.89998C10.6374 3.89998 9.45103 3.90077 8.52354 3.9813ZM8.88753 5.62171H8.95868C9.32166 5.62169 9.65194 5.62166 9.92646 5.64654C10.2223 5.67336 10.5405 5.73465 10.8469 5.91153C11.1757 6.10139 11.4488 6.37447 11.6387 6.70333C11.8155 7.0097 11.8768 7.3279 11.9036 7.62374C11.9285 7.89826 11.9285 8.22854 11.9285 8.59152V8.66265C11.9285 9.02564 11.9285 9.35591 11.9036 9.63043C11.8768 9.92627 11.8155 10.2445 11.6387 10.5508C11.4488 10.8797 11.1757 11.1528 10.8469 11.3426C10.5405 11.5195 10.2223 11.5808 9.92646 11.6076C9.65193 11.6325 9.32166 11.6325 8.95867 11.6325H8.88754C8.52456 11.6325 8.19428 11.6325 7.91976 11.6076C7.62392 11.5808 7.30572 11.5195 6.99935 11.3426C6.67049 11.1528 6.39741 10.8797 6.20755 10.5508C6.03067 10.2445 5.96938 9.92627 5.94256 9.63043C5.91768 9.35592 5.91771 9.02564 5.91773 8.66266V8.59151C5.91771 8.22853 5.91768 7.89826 5.94256 7.62374C5.96938 7.3279 6.03067 7.0097 6.20755 6.70333C6.39742 6.37447 6.6705 6.10139 6.99935 5.91153C7.30572 5.73465 7.62392 5.67336 7.91976 5.64654C8.19428 5.62166 8.52455 5.62169 8.88753 5.62171ZM7.89874 7.47072C7.84396 7.50248 7.79848 7.54799 7.76672 7.60277C7.76234 7.61331 7.74665 7.66007 7.73522 7.78621C7.7186 7.96957 7.71774 8.21698 7.71774 8.62709C7.71774 9.03719 7.7186 9.2846 7.73522 9.46796C7.74665 9.5941 7.76234 9.64086 7.76672 9.6514C7.79848 9.70619 7.84401 9.75172 7.89879 9.78347C7.90934 9.78785 7.95611 9.80354 8.08223 9.81498C8.26559 9.83159 8.513 9.83246 8.92311 9.83246C9.33321 9.83246 9.58062 9.83159 9.76398 9.81498C9.89012 9.80354 9.93688 9.78785 9.94742 9.78347C10.0022 9.75171 10.0477 9.70619 10.0795 9.6514C10.0839 9.64087 10.0996 9.5941 10.111 9.46796C10.1276 9.2846 10.1285 9.03719 10.1285 8.62709C10.1285 8.21698 10.1276 7.96957 10.111 7.78621C10.0996 7.66009 10.0839 7.61332 10.0795 7.60277C10.0477 7.54799 10.0022 7.50246 9.94742 7.4707C9.93688 7.46632 9.89011 7.45063 9.76398 7.4392C9.58062 7.42258 9.33321 7.42171 8.92311 7.42171C8.513 7.42171 8.26559 7.42258 8.08223 7.4392C7.95609 7.45063 7.90928 7.46634 7.89874 7.47072ZM15.6333 5.62171H15.7045C16.0674 5.62169 16.3977 5.62166 16.6722 5.64654C16.9681 5.67336 17.2863 5.73465 17.5926 5.91153C17.9215 6.10139 18.1946 6.37448 18.3844 6.70333C18.5613 7.0097 18.6226 7.3279 18.6494 7.62374C18.6743 7.89826 18.6743 8.22854 18.6743 8.59152V8.66265C18.6743 9.02564 18.6743 9.35591 18.6494 9.63044C18.6226 9.92627 18.5613 10.2445 18.3844 10.5508C18.1946 10.8797 17.9215 11.1528 17.5926 11.3426C17.2863 11.5195 16.9681 11.5808 16.6722 11.6076C16.3977 11.6325 16.0674 11.6325 15.7045 11.6325H15.6333C15.2703 11.6325 14.9401 11.6325 14.6655 11.6076C14.3697 11.5808 14.0515 11.5195 13.7451 11.3426C13.4163 11.1528 13.1432 10.8797 12.9533 10.5508C12.7764 10.2445 12.7152 9.92627 12.6883 9.63043C12.6635 9.35591 12.6635 9.02564 12.6635 8.66265V8.59152C12.6635 8.22854 12.6635 7.89826 12.6883 7.62374C12.7152 7.3279 12.7764 7.0097 12.9533 6.70333C13.1432 6.37447 13.4163 6.10139 13.7451 5.91153C14.0515 5.73465 14.3697 5.67336 14.6655 5.64654C14.9401 5.62166 15.2703 5.62169 15.6333 5.62171ZM14.6445 7.47072C14.5897 7.50248 14.5443 7.54799 14.5125 7.60277C14.5081 7.61331 14.4924 7.66009 14.481 7.78621C14.4644 7.96957 14.4635 8.21698 14.4635 8.62709C14.4635 9.03719 14.4644 9.2846 14.481 9.46796C14.4924 9.59411 14.5081 9.64087 14.5125 9.65141C14.5443 9.70619 14.5898 9.75171 14.6446 9.78347C14.6551 9.78785 14.7019 9.80354 14.828 9.81498C15.0114 9.83159 15.2588 9.83246 15.6689 9.83246C16.079 9.83246 16.3264 9.83159 16.5098 9.81498C16.6359 9.80354 16.6827 9.78785 16.6932 9.78347C16.748 9.75171 16.7935 9.70618 16.8253 9.6514C16.8297 9.64085 16.8453 9.59408 16.8568 9.46796C16.8734 9.2846 16.8743 9.03719 16.8743 8.62709C16.8743 8.21698 16.8734 7.96957 16.8568 7.78621C16.8453 7.66009 16.8297 7.61332 16.8253 7.60277C16.7935 7.54799 16.748 7.50246 16.6932 7.4707C16.6827 7.46632 16.6359 7.45063 16.5098 7.4392C16.3264 7.42258 16.079 7.42171 15.6689 7.42171C15.2588 7.42171 15.0114 7.42258 14.828 7.4392C14.7019 7.45063 14.6551 7.46634 14.6445 7.47072ZM8.88754 12.3675H8.95867C9.32166 12.3675 9.65193 12.3674 9.92646 12.3923C10.2223 12.4191 10.5405 12.4804 10.8469 12.6573C11.1757 12.8472 11.4488 13.1203 11.6387 13.4491C11.8155 13.7555 11.8768 14.0737 11.9036 14.3695C11.9285 14.644 11.9285 14.9743 11.9285 15.3373V15.4084C11.9285 15.7714 11.9285 16.1017 11.9036 16.3762C11.8768 16.6721 11.8155 16.9903 11.6387 17.2966C11.4488 17.6255 11.1757 17.8986 10.8469 18.0884C10.5405 18.2653 10.2223 18.3266 9.92646 18.3534C9.65193 18.3783 9.32166 18.3783 8.95867 18.3782H8.88754C8.52456 18.3783 8.19428 18.3783 7.91976 18.3534C7.62392 18.3266 7.30572 18.2653 6.99935 18.0884C6.6705 17.8986 6.39742 17.6255 6.20755 17.2966C6.03067 16.9903 5.96938 16.6721 5.94256 16.3762C5.91768 16.1017 5.91771 15.7714 5.91773 15.4084V15.3373C5.91771 14.9743 5.91768 14.644 5.94256 14.3695C5.96938 14.0737 6.03067 13.7555 6.20755 13.4491C6.39741 13.1203 6.67049 12.8472 6.99935 12.6573C7.30572 12.4804 7.62392 12.4191 7.91976 12.3923C8.19428 12.3674 8.52456 12.3675 8.88754 12.3675ZM7.89875 14.2165C7.84397 14.2483 7.79848 14.2938 7.76672 14.3485C7.76234 14.3591 7.74665 14.4059 7.73522 14.532C7.7186 14.7154 7.71774 14.9628 7.71774 15.3729C7.71774 15.783 7.7186 16.0304 7.73522 16.2137C7.74665 16.3399 7.76234 16.3866 7.76672 16.3972C7.79848 16.452 7.84401 16.4975 7.89879 16.5293C7.90934 16.5336 7.95611 16.5493 8.08223 16.5608C8.26559 16.5774 8.513 16.5782 8.92311 16.5782C9.33321 16.5782 9.58062 16.5774 9.76398 16.5608C9.8901 16.5493 9.93687 16.5336 9.94742 16.5293C10.0022 16.4975 10.0477 16.452 10.0795 16.3972C10.0839 16.3866 10.0996 16.3399 10.111 16.2137C10.1276 16.0304 10.1285 15.783 10.1285 15.3729C10.1285 14.9628 10.1276 14.7154 10.111 14.532C10.0996 14.4059 10.0839 14.3591 10.0795 14.3486C10.0477 14.2938 10.0022 14.2482 9.94742 14.2165C9.93687 14.2121 9.8901 14.1964 9.76398 14.185C9.58062 14.1684 9.33321 14.1675 8.92311 14.1675C8.513 14.1675 8.26559 14.1684 8.08223 14.185C7.9561 14.1964 7.90929 14.2121 7.89875 14.2165ZM15.6333 12.3675H15.7045C16.0674 12.3675 16.3977 12.3674 16.6722 12.3923C16.9681 12.4191 17.2863 12.4804 17.5926 12.6573C17.9215 12.8472 18.1946 13.1203 18.3844 13.4491C18.5613 13.7555 18.6226 14.0737 18.6494 14.3695C18.6743 14.644 18.6743 14.9743 18.6743 15.3373V15.4084C18.6743 15.7714 18.6743 16.1017 18.6494 16.3762C18.6226 16.6721 18.5613 16.9903 18.3844 17.2966C18.1946 17.6255 17.9215 17.8986 17.5926 18.0884C17.2863 18.2653 16.9681 18.3266 16.6722 18.3534C16.3977 18.3783 16.0674 18.3783 15.7045 18.3782H15.6333C15.2703 18.3783 14.9401 18.3783 14.6655 18.3534C14.3697 18.3266 14.0515 18.2653 13.7451 18.0884C13.4163 17.8986 13.1432 17.6255 12.9533 17.2966C12.7764 16.9902 12.7152 16.6721 12.6883 16.3762C12.6635 16.1017 12.6635 15.7714 12.6635 15.4084V15.3373C12.6635 14.9743 12.6635 14.644 12.6883 14.3695C12.7152 14.0737 12.7764 13.7555 12.9533 13.4491C13.1432 13.1203 13.4163 12.8472 13.7451 12.6573C14.0515 12.4804 14.3697 12.4191 14.6655 12.3923C14.9401 12.3674 15.2703 12.3675 15.6333 12.3675ZM14.6445 14.2165C14.5897 14.2483 14.5443 14.2938 14.5125 14.3485C14.5081 14.3591 14.4924 14.4059 14.481 14.532C14.4644 14.7154 14.4635 14.9628 14.4635 15.3729C14.4635 15.783 14.4644 16.0304 14.481 16.2137C14.4924 16.3399 14.5081 16.3866 14.5125 16.3972C14.5443 16.452 14.5898 16.4975 14.6446 16.5293C14.6551 16.5336 14.7019 16.5493 14.828 16.5608C15.0114 16.5774 15.2588 16.5782 15.6689 16.5782C16.079 16.5782 16.3264 16.5774 16.5098 16.5608C16.6359 16.5493 16.6827 16.5336 16.6932 16.5293C16.748 16.4975 16.7935 16.452 16.8253 16.3972C16.8297 16.3866 16.8453 16.3399 16.8568 16.2137C16.8734 16.0304 16.8743 15.783 16.8743 15.3729C16.8743 14.9628 16.8734 14.7154 16.8568 14.532C16.8453 14.4058 16.8296 14.3591 16.8253 14.3485C16.7935 14.2938 16.748 14.2482 16.6932 14.2165C16.6827 14.2121 16.6359 14.1964 16.5098 14.185C16.3264 14.1684 16.079 14.1675 15.6689 14.1675C15.2588 14.1675 15.0114 14.1684 14.828 14.185C14.7019 14.1964 14.6551 14.2121 14.6445 14.2165Z" fill="#78797E"/>
                            </svg>
                        </i>
                        <span>Home</span>
                    </button>
                    <button className={waveActive2} nav-id="2" onClick={navigateMenuHandler}>
                        <i class="icon">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_20_4484)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.8725 5.12657C7.53776 5.12657 6.42131 6.23897 6.42131 7.65412C6.42131 9.06927 7.53776 10.1817 8.8725 10.1817C10.2072 10.1817 11.3237 9.06927 11.3237 7.65412C11.3237 6.23897 10.2072 5.12657 8.8725 5.12657ZM4.62131 7.65412C4.62131 5.2833 6.50562 3.32657 8.8725 3.32657C11.2394 3.32657 13.1237 5.2833 13.1237 7.65412C13.1237 10.0249 11.2394 11.9817 8.8725 11.9817C6.50562 11.9817 4.62131 10.0249 4.62131 7.65412ZM17.1216 7.98149C16.3558 7.98149 15.6986 8.62336 15.6986 9.46059C15.6986 10.2978 16.3558 10.9397 17.1216 10.9397C17.8875 10.9397 18.5447 10.2978 18.5447 9.46059C18.5447 8.62336 17.8875 7.98149 17.1216 7.98149ZM13.8986 9.46059C13.8986 7.66994 15.3215 6.18149 17.1216 6.18149C18.9218 6.18149 20.3447 7.66994 20.3447 9.46059C20.3447 11.2512 18.9218 12.7397 17.1216 12.7397C15.3215 12.7397 13.8986 11.2512 13.8986 9.46059ZM4.63421 17.4363C3.83579 18.1734 3.53393 19.0374 3.48476 19.5404C3.43639 20.0351 2.99615 20.3969 2.50145 20.3485C2.00676 20.3002 1.64493 19.8599 1.6933 19.3652C1.78376 18.4401 2.2778 17.1619 3.4133 16.1137C4.56859 15.0473 6.33239 14.2684 8.8725 14.2684C11.4126 14.2684 13.1764 15.0473 14.3317 16.1137C15.4672 17.1619 15.9612 18.4401 16.0517 19.3652C16.1001 19.8599 15.7382 20.3002 15.2435 20.3485C14.7488 20.3969 14.3086 20.0351 14.2602 19.5404C14.2111 19.0374 13.9092 18.1734 13.1108 17.4363C12.3322 16.7176 11.024 16.0684 8.8725 16.0684C6.72095 16.0684 5.41283 16.7176 4.63421 17.4363ZM15.9781 15.1684C15.9781 14.6713 16.381 14.2684 16.8781 14.2684C19.4182 14.2684 21.182 15.0473 22.3373 16.1137C23.4728 17.1619 23.9668 18.4401 24.0573 19.3652C24.1057 19.8599 23.7438 20.3002 23.2491 20.3485C22.7544 20.3969 22.3142 20.0351 22.2658 19.5404C22.2167 19.0374 21.9148 18.1734 21.1164 17.4363C20.3378 16.7176 19.0296 16.0684 16.8781 16.0684C16.381 16.0684 15.9781 15.6654 15.9781 15.1684Z" fill="#78797E"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_20_4484">
                                        <rect width="24.0013" height="24" fill="white" transform="translate(0.874512)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </i>
                        <span>Friends</span>
                    </button>
                    <button className={waveActive3} nav-id="3" onClick={navigateMenuHandler}>
                        <i class={waveActiveShadow}><img src={require('../../img/tap.png')} alt="tap" width={24} height={24} /></i>
                        <span className='tapbtn'>Tap</span>
                    </button>
                    <button className={waveActive4} nav-id="4" onClick={navigateMenuHandler}>
                        <i class="icon">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.31581 9.74998C4.10967 10.4643 3.99922 11.2193 3.99922 12C3.99922 12.7807 4.10967 13.5356 4.31581 14.25H7.72598C7.64421 13.5521 7.59922 12.8027 7.59922 12C7.59922 11.1973 7.64421 10.4479 7.72598 9.74998H4.31581ZM5.08285 7.94998H8.0394C8.39707 6.43374 8.93849 5.23133 9.53396 4.3146C7.64433 4.94503 6.06457 6.25289 5.08285 7.94998ZM12.0992 4.07646C11.4475 4.61026 10.4766 5.8131 9.89391 7.94998H14.3045C13.7218 5.8131 12.7509 4.61026 12.0992 4.07646ZM14.66 9.74998H9.53839C9.44973 10.4311 9.39922 11.1795 9.39922 12C9.39922 12.8204 9.44973 13.5689 9.53839 14.25H14.66C14.7487 13.5689 14.7992 12.8204 14.7992 12C14.7992 11.1795 14.7487 10.4311 14.66 9.74998ZM16.4725 14.25C16.5542 13.5521 16.5992 12.8027 16.5992 12C16.5992 11.1973 16.5542 10.4479 16.4725 9.74998H19.8829C20.0887 10.4635 20.1992 11.2182 20.1992 12C20.1992 12.7817 20.0887 13.5364 19.8829 14.25H16.4725ZM14.3045 16.05H9.89391C10.4766 18.1868 11.4475 19.3897 12.0992 19.9235C12.7509 19.3897 13.7218 18.1868 14.3045 16.05ZM9.53396 19.6854C8.93849 18.7686 8.39707 17.5662 8.0394 16.05L5.08285 16.05C6.06457 17.7471 7.64433 19.0549 9.53396 19.6854ZM14.6645 19.6853C15.26 18.7686 15.8014 17.5662 16.159 16.05L19.1158 16.05C18.1339 17.7475 16.5538 19.055 14.6645 19.6853ZM19.1158 7.94998H16.159C15.8014 6.43375 15.26 5.23134 14.6645 4.31461C16.5538 4.94492 18.1339 6.25245 19.1158 7.94998ZM2.19922 12C2.19922 6.53236 6.6316 2.09998 12.0992 2.09998C16.3492 2.09998 19.9716 4.77764 21.3756 8.53494C21.7791 9.61458 21.9992 10.7826 21.9992 12C21.9992 13.2174 21.7791 14.3854 21.3756 15.465C19.9716 19.2223 16.3492 21.9 12.0992 21.9C6.6316 21.9 2.19922 17.4676 2.19922 12Z" fill="#78797E"/>
                            </svg>
                        </i>
                        <span>Rating</span>
                    </button>
                    <button className={waveActive5} nav-id="5" onClick={navigateMenuHandler}>
                        <i class="icon">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0767 1.59827H16.8233C17.7289 1.59826 18.4623 1.59825 19.0571 1.64605C19.6704 1.69533 20.2138 1.79972 20.7193 2.0523C21.5534 2.46904 22.2296 3.14526 22.6463 3.97928C22.8989 4.48478 23.0033 5.02825 23.0526 5.64152C23.1004 6.23634 23.1004 6.96971 23.1003 7.87532V17.0929C23.1003 19.4707 21.1728 21.3983 18.7949 21.3983H11.6185C9.5094 21.3983 7.79962 19.6885 7.79962 17.5794V7.87533C7.79961 6.96971 7.7996 6.23634 7.8474 5.64152C7.89668 5.02825 8.00107 4.48478 8.25365 3.97928C8.67039 3.14526 9.3466 2.46904 10.1806 2.0523C10.6861 1.79972 11.2296 1.69533 11.8429 1.64605C12.4377 1.59825 13.1711 1.59826 14.0767 1.59827ZM11.9871 3.44027C11.4831 3.48076 11.1984 3.55594 10.9852 3.66248C10.4998 3.90499 10.1063 4.2985 9.86383 4.78384C9.75729 4.99707 9.68211 5.28174 9.64161 5.78571C9.60029 6.29991 9.59962 6.96081 9.59962 7.91296V15.448L9.83286 15.2211C9.88045 15.1748 9.92236 15.134 9.96229 15.0982C10.951 14.2117 12.4485 14.2117 13.4373 15.0982C13.4772 15.134 13.5191 15.1748 13.5667 15.2211L13.5774 15.2316C13.6421 15.2945 13.6553 15.307 13.664 15.3149C13.969 15.5883 14.4308 15.5883 14.7358 15.3149C14.7445 15.307 14.7577 15.2945 14.8224 15.2316L15.7083 14.3696C16.0158 14.0705 16.2835 13.81 16.522 13.6122C16.7747 13.4026 17.051 13.2142 17.3903 13.1031C17.9165 12.9308 18.4838 12.9308 19.0099 13.1031C19.3493 13.2142 19.6256 13.4026 19.8783 13.6122C20.1168 13.81 20.3844 14.0704 20.6919 14.3695L21.3003 14.9616V7.91296C21.3003 6.96081 21.2997 6.29991 21.2584 5.78571C21.2179 5.28174 21.1427 4.99707 21.0361 4.78384C20.7936 4.2985 20.4001 3.90499 19.9148 3.66248C19.7015 3.55594 19.4169 3.48076 18.9129 3.44027C18.3987 3.39894 17.7378 3.39827 16.7857 3.39827H14.1143C13.1622 3.39827 12.5013 3.39894 11.9871 3.44027ZM21.2753 17.4485L19.4605 15.6828C19.1224 15.3539 18.906 15.1444 18.7292 14.9977C18.5604 14.8577 18.4854 14.8254 18.4499 14.8137C18.2876 14.7606 18.1126 14.7606 17.9504 14.8137C17.9148 14.8254 17.8398 14.8577 17.6711 14.9977C17.4942 15.1444 17.2779 15.3539 16.9398 15.6828L16.0668 16.5322C16.0193 16.5785 15.9773 16.6193 15.9374 16.6551C14.9487 17.5416 13.4511 17.5416 12.4624 16.6551C12.4225 16.6193 12.3806 16.5785 12.333 16.5322L12.3222 16.5217C12.2576 16.4588 12.2444 16.4462 12.2357 16.4384C11.9307 16.165 11.4688 16.165 11.1639 16.4384C11.1552 16.4462 11.142 16.4588 11.0773 16.5217L9.62994 17.9299C9.79589 18.8778 10.6231 19.5983 11.6185 19.5983H18.7949C20.0579 19.5983 21.1026 18.6638 21.2753 17.4485ZM2.29932 6.45786C2.29932 4.58002 3.82161 3.05773 5.69945 3.05773C6.19651 3.05773 6.59945 3.46067 6.59945 3.95773C6.59945 4.45478 6.19651 4.85773 5.69945 4.85773C4.81572 4.85773 4.09932 5.57413 4.09932 6.45786V17.5116C4.09932 18.3954 4.81572 19.1118 5.69945 19.1118C6.19651 19.1118 6.59945 19.5147 6.59945 20.0118C6.59945 20.5088 6.19651 20.9118 5.69945 20.9118C3.82161 20.9118 2.29932 19.3895 2.29932 17.5116V6.45786Z" fill="#78797E"/>
                                <ellipse cx="17.7002" cy="7.00067" rx="1.50052" ry="1.50067" fill="#B51310"/>
                            </svg>
                        </i>
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