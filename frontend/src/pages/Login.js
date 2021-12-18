import React, {useState} from 'react';
import '../styles/login.css';
import background from '../styles/icons/wp3990430.jpg';
import {ArrowRightOutlined, DoubleRightOutlined} from "@ant-design/icons";
import logo from "../styles/icons/logo-sr.png";
import {useNavigate} from "react-router-dom";

const Login = () => {

        const [username, setUsername] = useState();
        const [password, setPassword] = useState();

        const navigate = useNavigate();

        const handleUsernameChange = e => {
            setUsername(e.target.value);
        }

        const handlePasswordChange = e => {
            setPassword(e.target.value);
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
            console.log(username, password);
        }
        return (
            <div className="main">
                <div className="logo">
                    <img className={"image"} src={background}/>
                    {/*<img src={logo} alt={"Logo"} />*/}
                </div>

                <div className="login-wrapper">
                    <div className={"back-wrapper"}>
                        <ArrowRightOutlined onClick={handleLoginBack}/>
                    </div>

                    <div className={"login-title"}>
                        <text className={"title-text"}>
                            Dobrodošli na
                            <text> </text>
                            <text className={"acc-title"}>
                                prijavu!
                            </text>
                        </text>
                    </div>

                    <div className={"input-wrapper"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"username"}>
                                <input className={"input"} type={"text"} name={"Koirničko ime"}
                                       placeholder={"Korisničko ime"} onChange={handleUsernameChange} value={username}/>
                            </div>
                            <div className={"password"}>
                                <input className={"input"} type={"password"} name={"Lozinka"}
                                       placeholder={"Lozinka"} onChange={handlePasswordChange} value={password}/>
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