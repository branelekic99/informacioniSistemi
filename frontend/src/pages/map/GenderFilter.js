import React from 'react';
import {Select} from "antd";
const {Option} = Select;

const GenderFilter = ({activeFilter,handleGenderFilter}) => {
    return (
        <div className={"gender-filter " + `${activeFilter==="gender"?"gender-filter-visible":""}`}>
            <Select style={{ width: 120 }} onChange={handleGenderFilter} allowClear={true} placeholder={"Izaberite pol"}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
            </Select>
        </div>
    );
};
export default GenderFilter;