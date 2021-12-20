import React from 'react';
import {useNavigate} from "react-router-dom";

import "../styles/home.css";

const Home = () => {
    const navigation = useNavigate();

    const handleLinkClick = ()=>{
        navigation("/user-form");
    }
    return (
        <div className={"home-container"}>
            <div className={"home-title"}>
                <div className={"home-title-container"}>
                    Dobrodosli na registar
                </div>
                <div className={"home-second-title"}>
                    Saveza Srba Slovenije
                </div>
                <div className={"home-link"}>
                    <a onClick={handleLinkClick}>Klikom na ovaj link otvara vam se kratki obrazac popisa!</a>
                </div>
            </div>
        </div>
    );
};

export default Home;