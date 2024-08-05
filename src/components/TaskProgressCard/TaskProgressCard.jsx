import './TaskProgressCard.css'

const TaskProgressCard = ({img, taskName, taskDesc, status}) => {

    return (
        <div className='taskCard'>
            <div className="cardLeft">
                <div className='icon'>
                    <img src={img} alt="dog" width={20} height={20} draggable={false} />
                </div>
                <div className='taskName'>
                    <p>{taskName}</p>
                    <span>{taskDesc}</span>
                </div>
            </div>
            <div className="cardRight">
                {status == "none" ? (
                    <div></div>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.80001 15.8998L4.60001 11.6998L3.20001 13.0998L8.80001 18.6998L20.8 6.6998L19.4 5.2998L8.80001 15.8998Z" fill="lime"/>
                    </svg>
                )}
                
            </div>
        </div>
    );
};

export default TaskProgressCard;