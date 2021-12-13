import React, {useState, useEffect} from 'react';
import {useNavigate,Link } from 'react-router-dom';

import {MenuOutlined,CloseCircleOutlined} from "@ant-design/icons";
import logo from "../styles/icons/logo-sr.png";

import "../styles/nav.css";

const Nav = () => {
    const navigate = useNavigate();

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
        window.addEventListener("resize", handleResize);

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

    return (
        <header className={"header"}>
            <div className={"header__content"}>
                <Link to={"/"} className={"header__content__logo"}>
                    <img src={logo} alt={"Logo"} />
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
                                User-form
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={menuToggleHandler}>
                                O nama
                            </Link>
                        </li>
                        <li>
                            <Link to="/adminPanel" onClick={menuToggleHandler}>
                                AdminPanel
                            </Link>
                        </li>
                    </ul>
                    <button onClick={loginClickHandler}>Uloguj se</button>
                </nav>
                <div className={"header__content__toggle"}>
                    {!menuOpen ? (
                        <MenuOutlined onClick={menuToggleHandler} />
                    ) : (
                        <CloseCircleOutlined onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Nav;