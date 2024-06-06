import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { faBell, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = () => {
    const navigation = useNavigate();
    // const userInfo = useSelector((state:any) => state?.userInfoSlice);
    const userInfo = useSelector((state: any) => state?.userInfoSlice?.userInfo)
    // console.log('userInfo', userInfo);
    useEffect(() => {
        console.log('userInfo', userInfo)
    }, [userInfo])
    return <>

        <div className="mainHeader text-white">
            {/* <nav className="h-100 d-flex"> */}
            <div className='h-100 appNav d-flex'>
                <div className='d-flex appbrand'>
                    <img src="https://t4.ftcdn.net/jpg/00/90/04/07/360_F_90040768_uax340ASN3Ewca0N42f3EQHCkP2hdQlO.jpg" width={50} height={50} />
                    <p className='brand'>MALASA</p>
                </div>
                <div className='d-flex appbrand'>
                    <div className='position-relative'>
                        <FontAwesomeIcon icon={faBell} className='notification'></FontAwesomeIcon>
                        <div className='notificationCount'>2</div>
                    </div>

                    <Dropdown as={ButtonGroup}>


                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic">
                            <img className="profileImage" src={
                                userInfo?.imageUrl
                                || 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"'} />
                            {/* <span>{userInfo.name}</span> */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={() => {
                                // account
                                navigation("account")
                            }}><FontAwesomeIcon icon={faUser} className='profileOptions' ></FontAwesomeIcon> My Profile</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => {
                                // account
                                localStorage.clear();
                                // navigation("login")
                                window.location.href='/login'
                            }}> <FontAwesomeIcon icon={faSignOut} className='profileOptions'></FontAwesomeIcon>  Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    </>
}

export default Header