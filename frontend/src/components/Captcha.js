import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import "../styles/captcha.css";

const captchaErrorMessage = "Netacan broj pokusajte opet!";

const Captcha = ({setCaptcha}) => {
    const [randomNumber,setRandomNumber] = useState(Math.floor(Math.random() * 4000) + 4000);
    const [errorMessage,setErrorMessage] = useState("");
    const [numberValue,setNumberValue] = useState("");

    useEffect(()=>{

    },[]);
    const handleNumberChange = (e)=>{
        setNumberValue(e.target.value);
        if(errorMessage)
            setErrorMessage("");
    }
    const handleCaptchaSubmit = ()=>{
        if(numberValue != randomNumber){
            setErrorMessage(captchaErrorMessage);
        }else{
            setCaptcha(true);
        }
    }
    return (
        <div className={"captcha-container"}>
            <div className={"centered-box"}>
                <h2>{randomNumber}</h2>
                <div className={"input-container"}>
                    <input placeholder={"Unesite broj!"} value={numberValue} onChange={handleNumberChange}/>
                    {errorMessage && <p>{errorMessage}</p>}
                    <Button type={"primary"}  block={true} size={"large"} onClick={handleCaptchaSubmit}>
                        Potvrdi
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Captcha;