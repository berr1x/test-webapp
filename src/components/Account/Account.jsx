import './Account.css'

const Account = ({hidden, opacity}) => {

    return (
        <div>
            {hidden ? (
            <div className="checkAccount" style={{opacity: opacity, transition: 'opacity 2s, visibility 0s linear 2s'}}>
                <div className="score">
                    <p>Your score</p>
                </div>

                <div className="dogInfo">
                    <div className="dogImg">
                        <img src={require('../../img/dog.png')} alt="dog" width={128} height={128} />
                    </div>
                    <div className="dogCoin">
                        800 DOGS
                    </div>
                </div>
            </div>
            ) : (
                <div></div>
            )}
        </div>
    );

};

export default Account;