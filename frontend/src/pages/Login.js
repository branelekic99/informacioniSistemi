import React, {useState, useContext, useEffect} from 'react';
import {ArrowRightOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {Navigate, useNavigate} from "react-router-dom";
import logo from "../styles/icons/logo-sr.png";
import axios from 'axios';
import UserContext from "../context/user/userContext";
import {TOKEN, USER_STATUS} from "../constants/variables";
import '../styles/login.css';
const errorUsername = "* korisničko ime je obavezno";
const errorPassword = "* lozinka je obavezna";
const errorLogin = "* unijeti kredencijali nisu ispravni";

const Login = () => {
        const {userStatus, setUserStatus} = useContext(UserContext);

        const [username, setUsername] = useState();
        const [password, setPassword] = useState();
        const [errorMessageUsername, setErrorMessageUsername] = useState("");
        const [errorMessagePassword, setErrorMessagePassword] = useState("");
        const [errorMessageLogin, setErrorMessageLogin] = useState("");

        const navigate = useNavigate();

        const handleUsernameChange = e => {
            setUsername(e.target.value);
            if (errorMessageUsername)
                setErrorMessageUsername("");
            setErrorMessageLogin("");
        }

        const handlePasswordChange = e => {
            setPassword(e.target.value);
            if (errorMessagePassword)
                setErrorMessagePassword("");
            setErrorMessageLogin("");
        }

        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        const handleLoginBack = () => {
            navigate("/");
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!username) {
                setErrorMessageUsername(errorUsername);
            }
            if (!password) {
                setErrorMessagePassword(errorPassword);
            }
            if (username && password) {
                loginCall();
                console.log(username, password);

            }
        }

        const loginCall = async () => {
            try {
                const result = await axios.post("/login", {
                    "username": username,
                    "password": password
                });
                console.log(result.data.token);
                localStorage.setItem(TOKEN, result.data.token);
                setUserStatus(USER_STATUS.AUTHENTICATED);
                navigate("/adminPanel");
            } catch (err) {
                if (err.response.status == 401) {
                    console.log(err.response);
                    setErrorMessageLogin(err.response.data.message);
                }
            }
        }
        if (userStatus === USER_STATUS.AUTHENTICATED)
            return <Navigate to={"/"}/>
        return (
            <div className="main">
                <div className="logo">
                    <div className="logo-div">
                        <text className="admin_title">
                            <span>REGISTAR SRBA SLOVENIJE</span><br />
                            Administratorska stranica
                        </text>
                        <img src={logo} alt={"Logo"}/>
                    </div>
                </div>

                <div className="login-wrapper">
                    <div className={"back-wrapper"}>
                        <ArrowRightOutlined onClick={handleLoginBack}/>
                    </div>

                    <div className={"login-title"}>
                        <text className={"title-text"}>
                            Dobrodošli na prijavu!
                        </text>
                    </div>

                    <div className={"input-wrapper"}>
                        <form onSubmit={handleSubmit}>
                            {errorMessageLogin && <p style={{"color": "red"}}>{errorMessageLogin}</p>}
                            <div className={"username"}>
                                <input className={"input"} type={"text"} name={"Korisničko ime"}
                                       placeholder={"Korisničko ime"} onChange={handleUsernameChange} value={username}/>
                                {errorMessageUsername && <p style={{"color": "red"}}>{errorMessageUsername}</p>}
                            </div>
                            <div className={"password"}>
                                <input className={"input"} type={"password"} name={"Lozinka"}
                                       placeholder={"Lozinka"} onChange={handlePasswordChange} value={password}/>
                                {errorMessagePassword && <p style={{"color": "red"}}>{errorMessagePassword}</p>}
                            </div>
                            <div className={"button-wrapper"}>
                                <button className={"button"} type={"submit"}>PRIJAVI SE</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
;
export default Login;