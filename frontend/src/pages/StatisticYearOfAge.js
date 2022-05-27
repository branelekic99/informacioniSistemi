import React, {useEffect, useState} from 'react';
import '../styles/statistic.css';
import {Pie} from '@ant-design/plots';
import {Link} from "react-router-dom";

const StatisticYearOfAge = () => {

    const data = [
        {
            type: '1-10',
            value: 27,
        },
        {
            type: '10-20',
            value: 25,
        },
        {
            type: '20-30',
            value: 18,
        },
        {
            type: '30-40',
            value: 15,
        },
        {
            type: '40-50',
            value: 10,
        },
        {
            type: '50-60',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div className={"main"}>
            <div className={"statistic-menu"}>
                <nav
                    className={`${"statistic-nav"} $`}
                >
                    <ul className={"text"}>
                        <li className={"text"}>
                            <Link to="/statistic-year">
                                <text className={"text-view"}>
                                    Godine dolaska
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-age">
                                <text className={"text-view"}>
                                    Starosna struktura
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-month">
                                <text className={"text-view"}>
                                    Mjesečna statistika
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-gender">
                                <text className={"text-view"}>
                                    Polna struktura
                                </text>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={"statistic-view"}>
                <Pie id={"view"} {...config} />;
            </div>
        </div>);
};

export default StatisticYearOfAge;