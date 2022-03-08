import React, {useState} from 'react';
import "../styles/captcha.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Captcha = ({setCaptcha}) => {

    const handleChange = async token=>{
        const result = await axios.post("https://www.google.com/recaptcha/api/siteverify",{
            "secret":"6LdwPcQeAAAAAEVcbTjBM-VuR7ziGWU7pq8AT-d7",
            "response":token
        })
        console.log(result)
    }
    // const [randomNumber,setRandomNumber] = useState(Math.floor(Math.random() * 4000) + 4000);
    // const [errorMessage,setErrorMessage] = useState("");
    // const [numberValue,setNumberValue] = useState("");

    // useEffect(()=>{
    // },[]);
    // const handleNumberChange = (e)=>{
    //     setNumberValue(e.target.value);
    //     if(errorMessage)
    //         setErrorMessage("");
    // }
    // const handleCaptchaSubmit = ()=>{
    //     if(numberValue != randomNumber){
    //         setErrorMessage(captchaErrorMessage);
    //     }else{
    //         setCaptcha(true);
    //     }
    // }
    return (
        <div className={"captcha-container"}>
            <div className={"centered-box"}>
                <ReCAPTCHA
                    sitekey="6LdwPcQeAAAAAEKvUAR6FTJ0SkoOZJqh0RG-N4rJ"
                    onChange={handleChange}
                    // size={"invisible"}
                    onErrored={e=>console.log(e)}
                />
            </div>
        </div>
    );
};

export default Captcha;