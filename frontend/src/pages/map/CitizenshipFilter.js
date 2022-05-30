import React from 'react';
import {Select} from "antd";

const {Option} = Select;

const CitizenshipFilter = ({activeFilter,handleCitizenShipFilter}) => {
    return (
        <div className={"gender-filter " + `${activeFilter==="citizenship"?"gender-filter-visible":""}`}>
            <Select placeholder={"Izaberite drzavljanstvo"} filterOption={false} style={{width:200}} allowClear={true} onChange={handleCitizenShipFilter}>
                <Option value={"BiH"}>BiH</Option>
                <Option value={"Srbija"}>Srbija</Option>
                <Option value={"Hrvatska"}>Hrvatska</Option>
                <Option value={"Crna Gora"}>Crna Gora</Option>
                <Option value={"Slovenija"}>Slovenija</Option>
                <Option value={"Makedonija"}>Makedonija</Option>
            </Select>
        </div>
    );
};

export default CitizenshipFilter;