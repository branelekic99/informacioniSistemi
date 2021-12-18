import React from 'react';
import {CheckCircleOutlined} from "@ant-design/icons";
import "../styles/user-form-success.css"

const SuccessfullySumbited = () => {
    return (
        <div className={"success-container"}>
            <div className={"first-part"}>
                <div className={"icon-box"}>
                    <CheckCircleOutlined className={"icon"}/>
                    <p className={"label-success-text"}>Cestitamo</p>
                </div>
            </div>
            <div className={"second-part"}>
                <p className={"first-label-message"}>Uspjesno popunjena forma!</p>
                <p className={"second-label-message"}>Zahvaljujemo se na izdvojenom vremenu!</p>
                <button className={"home-button"}>Pocetna</button>
            </div>
        </div>
    );
};

export default SuccessfullySumbited;