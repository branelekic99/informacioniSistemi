import React, {useEffect, useState,useContext} from 'react';

import {Pie} from '@ant-design/plots';
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {TOKEN, USER_STATUS} from "../constants/variables";
import {Menu} from "antd";
import {statisticMenu} from "../constants/statisticMenu";
import UserContext from "../context/user/userContext";
import '../styles/statistic.css';
const StatisticYearOfAge = () => {
    const {userStatus, setUserStatus} = useContext(UserContext);
    const [data, setData] = useState([]);

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth);
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
    if (userStatus === USER_STATUS.CHECKING)
        return <p>loading!!!</p>
    if (userStatus === USER_STATUS.NOT_AUTHENTICATED)
        return <Navigate to={"/login"}/>
    return (
        <div className={width > 1200 ? "main" : "main-block"}>
            <div className={width > 1200 ? "statistic-menu" : "statistic-menu-block"}>
                <Menu mode={width > 1200 ? "vertical" : "horizontal"} theme={"dark"}
                      defaultSelectedKeys={['mjesecna-struktura']}
                      style={{
                          background: "#0C4076",
                          fontSize: width>900?"20px":"15px",
                      }}>
                    {statisticMenu.map((item) => <Menu.Item key={item.key} style={{
                        marginBottom: width > 1200 ? "20px" : "0px",
                        fontWeight: width > 1200 ? "bold" : "none",
                    }}>
                        <Link to={item.url}>

                            {item.label}
                        </Link>
                    </Menu.Item>)}
                </Menu>
            </div>
            <div className={width > 1200 ? "statistic-view" : "statistic-view-block"}>
                <Pie id={"view"} {...config} />;
            </div>
        </div>);
};

export default StatisticYearOfAge;