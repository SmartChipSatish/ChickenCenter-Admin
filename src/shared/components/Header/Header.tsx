import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    return <><div className="mainHeader text-white">
        <nav className="h-100 d-flex">
            <div className='appNav d-flex'>
                <div className='d-flex appbrand'>
                    <img src="https://t4.ftcdn.net/jpg/00/90/04/07/360_F_90040768_uax340ASN3Ewca0N42f3EQHCkP2hdQlO.jpg" width={50} height={50}/>
                    <p className='brand'>MALASA</p>
                </div>
                
                <div>
                    {/* <FontAwesomeIcon icon={faBell} className=''></FontAwesomeIcon> */}
                {/* fa-bell */}
                    {/* <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="" /> */}
                </div>
            </div>
        </nav>
    </div></>
}

export default Header