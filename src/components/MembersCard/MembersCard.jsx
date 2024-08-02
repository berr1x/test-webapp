import './MembersCard.css'

const MembersCard = ({kerg, id}) => {

    return (
        <div className='membersCard'>
            <div className='cardLeft'>
                <p>{kerg}</p>
            </div>
            <div className='cardRight'>
                <p>{id}</p>
            </div>
        </div>
    );
};

export default MembersCard;