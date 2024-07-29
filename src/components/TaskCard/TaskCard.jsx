
const TaskCard = ({img, taskName, taskDesc}) => {

    return (
        <div className='taskCard'>
            <div className='icon'>
                <img src={img} alt="dog" width={20} height={20} draggable={false} />
            </div>
            <div className='taskName'>
                <p>{taskName}</p>
                <span>{taskDesc}</span>
            </div>
        </div>
    );
};

export default TaskCard;