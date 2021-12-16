import React from 'react';
import '../styles/login.css';
import background from '../styles/icons/wp3990430.jpg';
import {ArrowRightOutlined, DoubleRightOutlined} from "@ant-design/icons";
import logo from "../styles/icons/logo-sr.png";

const Login = () => {
        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="main">
                <div className="logo">
                    <img className={"image"} src={background}/>
                    {/*<img src={logo} alt={"Logo"} />*/}
                </div>

                <div className="login-wrapper">
                    <div className={"back-wrapper"}>
                        <ArrowRightOutlined/>
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
                        <form>
                            <div className={"username"}>
                                <input className={"input"} type={"text"} name={"Koirničko ime"}
                                       placeholder={"Korisničko ime"} rules={[
                                    {
                                        required: true,
                                        message: 'Unesite korisničko ime!',
                                    },
                                ]}/>
                            </div>
                            <div className={"password"}>
                                <input className={"input"} type={"password"} name={"Lozinka"}
                                       placeholder={"Lozinka"} rules={[
                                    {
                                        required: true,
                                        message: 'Unesite lozinku!',
                                    },
                                ]}/>
                            </div>
                        </form>
                    </div>

                    <div className={"button-wrapper"}>
                        <button className={"button"} type={"primary"} htmlType="submit">PRIJAVI SE</button>
                    </div>
                </div>
            </div>
        );
    }
;
export default Login;