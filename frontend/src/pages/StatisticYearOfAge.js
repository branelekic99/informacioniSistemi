import React, {useEffect, useState} from 'react';
import '../styles/statistic.css';
import {Pie} from '@ant-design/plots';
import {Link} from "react-router-dom";
import axios from "axios";
import {TOKEN} from "../constants/variables";

const StatisticYearOfAge = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const url = "/citizens/statistics/age"
        try{
            setData([]);
            const result = await  axios.get(url,
                {
                    headers:
                        {"Authorization": `Bearer ${localStorage.getItem(TOKEN)}`}
                });
            const statisticData = result.data;

            const newObject = [];
            for(const [key,value] of Object.entries(statisticData)){
                newObject.push({
                    type:key,
                    value:value,
                })
            }
            setData(newObject);
            console.log(newObject);

        }catch (err){
            console.log("Errr");
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

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