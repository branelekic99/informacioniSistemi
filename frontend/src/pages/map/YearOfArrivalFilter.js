import React from 'react';
import { DatePicker } from 'antd';

const YearOfArrivalFilter = ({activeFilter,handleYearArrivalFilter}) => {
    return (
        <div className={"arrival-year-filter " + `${activeFilter==="arrival"?"arrival-year-filter-visible":""}`}>
            <DatePicker picker="year" placeholder={"select year"} onChange={handleYearArrivalFilter}/>
        </div>
    );
};
export default YearOfArrivalFilter;