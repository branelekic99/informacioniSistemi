import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';

import {MenuOutlined, CloseCircleOutlined} from "@ant-design/icons";
import logo from "../styles/icons/logo-sr.png";
import UserContext from "../context/user/userContext";
import {TOKEN, USER_STATUS} from "../constants/variables";

import "../styles/nav.css";
import {checkUserStatus} from "../helper_functions/checkUserStatus";


const Nav = () => {
    const {userStatus, setUserStatus} = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    console.log("ovo je user status", userStatus)
    useEffect(() => {
        const {pathname} = location;

        if (pathname === "/login") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [location]);

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        const checkUser = async () => {
            const user = await checkUserStatus();
            if (user !== null)
                setUserStatus(USER_STATUS.AUTHENTICATED);
            else setUserStatus(USER_STATUS.NOT_AUTHENTICATED);
        }
        window.addEventListener("resize", handleResize);
        checkUser();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const loginClickHandler = () => {
        menuToggleHandler();
        navigate("/login");
    };
    const logOutClickHandler = () => {
        setUserStatus(USER_STATUS.NOT_AUTHENTICATED);
        localStorage.setItem(TOKEN, null);
        navigate("/")
    }
    if (isLogin) {
        return "";
    }

    return (
        <header className={"header"}>
            <div className={"header__content"}>
                <Link to={"/"} className={"header__content__logo"}>
                    <img src={logo} alt={"Logo"}/>
                </Link>
                <nav
                    className={`${"header__content__nav"} ${
                        menuOpen && size.width < 768 ? "isMenu" : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/" onClick={menuToggleHandler}>
                                Naslovna
                            </Link>
                        </li>
                        <li>
                            <Link to="/user-form" onClick={menuToggleHandler}>
                                Obrazac
                            </Link>
                        </li>
                        {userStatus === USER_STATUS.AUTHENTICATED && <li>
                            <Link to="/map" onClick={menuToggleHandler}>
                                Mapa
                            </Link>
                        </li>}
                        {userStatus === USER_STATUS.AUTHENTICATED && <li>
                            <Link to="/adminPanel" onClick={menuToggleHandler}>
                                AdminPanel
                            </Link>
                        </li>}
                        {userStatus === USER_STATUS.AUTHENTICATED && <li>
                            <Link to="/statistic-year" onClick={menuToggleHandler}>
                                Statistika
                            </Link>
                        </li>}

                    </ul>
                    {userStatus === USER_STATUS.AUTHENTICATED ?
                        <button onClick={logOutClickHandler}>Izloguj se</button> :
                        <button onClick={loginClickHandler}>Uloguj se</button>}

                </nav>
                <div className={"header__content__toggle"}>
                    {!menuOpen ? (
                        <MenuOutlined onClick={menuToggleHandler}/>
                    ) : (
                        <CloseCircleOutlined onClick={menuToggleHandler}/>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Nav;