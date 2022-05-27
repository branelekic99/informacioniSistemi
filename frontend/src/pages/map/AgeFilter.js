import React from 'react';
import {DatePicker} from "antd";

const AgeFilter = ({activeFilter,handleAgeFilter}) => {
    return (
        <div className={"arrival-year-filter " + `${activeFilter==="age"?"arrival-year-filter-visible":""}`}>
            <DatePicker picker="year" placeholder={"select year"} onChange={handleAgeFilter}/>
        </div>
    );
};

export default AgeFilter;