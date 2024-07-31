import './LeaderBoardCard.css'

const LeaderBoardCard = ({avatar, name, coins}) => {

    return (
        <div className='leaderBoardCard'>
            <div className='cardLeft'>
                <img src={avatar} alt="dog" width={48} height={48} draggable={false} />
                <p>{name}</p>
            </div>
            <div className='cardRight'>
                <img src={require('../../img/coin_big.png')} alt="dog" width={24} height={24} draggable={false} />
                <p>{coins}</p>
            </div>
        </div>
    );
};

export default LeaderBoardCard;