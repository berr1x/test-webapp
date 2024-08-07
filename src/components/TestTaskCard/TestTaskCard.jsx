
const TestTaskCard = ({img, taskName, taskDesc, link}) => {

    const goToTask = () => {
        window.location.href = link;
    };

    return (
        <div className='taskCard' onClick={goToTask}>
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
                <div></div>
            </div>
        </div>
    );
};

export default TestTaskCard;