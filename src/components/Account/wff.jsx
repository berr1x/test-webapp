const [waveActive1, setWaveActive1] = useState("wave active");
const [waveActive2, setWaveActive2] = useState("wave");
const [waveActive3, setWaveActive3] = useState("wave");
const [waveActiveShadow, setWaveActiveShadow] = useState("icon");
const [waveActive4, setWaveActive4] = useState("wave");
const [waveActive5, setWaveActive5] = useState("wave");

const [homeActive, setHomeActive] = useState("home active");
const [friendsActive, setFriendsActive] = useState("friends");
const [tapActive, setTapActive] = useState("tap");
const [ratingActive, setRatingActive] = useState("rating");
const [tasksActive, setTasksActive] = useState("tasks");

<div class="container">
                <div className={homeActive} nav-content={"1"}>
                    home
                </div>

                <div className={friendsActive} nav-content={"2"}>
                    friends
                </div>

                <div className={tapActive} nav-content={"3"}>
                    tap
                </div>

                <div className={ratingActive} nav-content={"4"}>
                    rating
                </div>

                <div className={tasksActive} nav-content={"5"}>
                    tasks
                </div>

                <nav className="panel">
                    <button className={waveActive1} nav-id="1" onClick={navigateMenuHandler}>
                        <i class="icon"></i>
                        <span>Home</span>
                    </button>
                    <button className={waveActive2} nav-id="2">
                        <i class="icon"></i>
                        <span>Friends</span>
                    </button>
                    <button className={waveActive3} nav-id="3">
                        <i class={waveActiveShadow}></i>
                        <span className='tapbtn'>Tap</span>
                    </button>
                    <button className={waveActive4} nav-id="4">
                        <i class="icon"></i>
                        <span>Rating</span>
                    </button>
                    <button className={waveActive5} nav-id="5">
                        <i class="icon"></i>
                        <span>Tasks</span>
                    </button>
                </nav>
            </div>