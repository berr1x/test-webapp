import './Account.css'
import { AiOutlineRight } from "react-icons/ai";

const Account = ({hidden, opacity}) => {


    return (
        <div>
            {hidden ? (
            <div class="container">
                <div className="checkAccount" style={{opacity: opacity, transition: 'opacity 2s, visibility 0s linear 2s'}}>
                    <div className="score">
                        <p>Кол-во BOOSTS</p>
                    </div>

                    <div className="dogInfo">
                        <div className="dogCoin">
                            <img src={require('../../img/coin.png')} alt="dog" width={42} height={42} />
                            <p>507, 981</p>
                        </div>
                        <p className='status'>Bronze <span><AiOutlineRight /></span></p>
                    </div>

                </div>

                <div className="panel">

                </div>
            </div>
            ) : (
                <div></div>
            )}
        </div>
    );

};

export default Account;