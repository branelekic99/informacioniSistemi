import React from 'react';
import {Select} from "antd";

const {Option} = Select;

const CitizenshipFilter = ({activeFilter,handleCitizenShipFilter}) => {
    return (
        <div className={"gender-filter " + `${activeFilter==="citizenship"?"gender-filter-visible":""}`}>
            <Select placeholder={"Izaberite drzavljanstvo"} filterOption={false} style={{width:200}} allowClear={true}>
                <Option value={3}>BiH</Option>
                <Option value={1}>Srbija</Option>
                <Option value={2}>Hrvatska</Option>
                <Option value={4}>Crna Gora</Option>
                <Option value={5}>Slovenija</Option>
                <Option value={6}>Makedonija</Option>
                {/*<Option value={0}>-------</Option>*/}
            </Select>
        </div>
    );
};

export default CitizenshipFilter;