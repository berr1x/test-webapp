
const TaskCard = ({img, taskName, taskDesc, onClick}) => {

    return (
        <div className='taskCard' onClick={onClick}>
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