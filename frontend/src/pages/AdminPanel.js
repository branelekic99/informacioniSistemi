import React, {useEffect, useState, useContext} from 'react'
import {useNavigate,Navigate} from "react-router-dom";
import {Table} from 'antd';
import {TOKEN, USER_STATUS} from "../constants/variables";
import axios from 'axios'
import UserContext from "../context/user/userContext";
import {columns} from "../constants/citizenTableColumMeta";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/adminPanel.css";
import {checkUserStatus} from "../helper_functions/checkUserStatus";

const AdminPanel = () => {
    const {userStatus,setUserStatus} = useContext(UserContext);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [permistionGranted,setUserChecking] = useState(false);

    const [pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [numOfData, setNumOfData] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filtered, setFiltered] = useState();

    const navigate = useNavigate();

    const fetchData = async (page,itemsPerPage) => {
        setIsLoading(true);
        try {
            const result = await axios.get("/citizens",
                {
                    params:
                        {
                            "page": page,
                            "size": itemsPerPage
                        },
                    headers:
                        {"Authorization": `Bearer ${localStorage.getItem(TOKEN)}`}
                });
            setData(result.data.citizens);
            setNumOfData(result.data.totalItems);
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                console.log(err);
                setData([]);
            }
        }
    };




    const handleTokenExpiration = () => {
        navigate('/login');
    }

    useEffect(() => {
        const handleResize = () => {
            setPageSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        console.log("ovde sam !?");
        if(userStatus === USER_STATUS.NOT_AUTHENTICATED)
            navigate("/login")
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchData(currentPage,itemsPerPage);
    }, [currentPage,itemsPerPage]);

    useEffect(() => {
        if (pageSize.width <= 768) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(10);
        }
        setCurrentPage(0);
    }, [pageSize]);

    if(userStatus === USER_STATUS.CHECKING)
        return <p>loading!!!</p>
    if(userStatus === USER_STATUS.NOT_AUTHENTICATED)
        return <Navigate to={"/login"}/>
    return (
        <div className="admin-panel">
            <div className="table-component">
                <Table className="table"
                       loading={isLoading}
                       pagination={
                           {
                               total: numOfData,
                               pageSize: itemsPerPage,
                               position: ["bottomCenter"],
                               onChange: (page, pageSize) => {
                                   setCurrentPage(page - 1);
                                   setItemsPerPage(pageSize);
                               }
                           }
                       }
                       dataSource={data}
                       columns={columns}
                    // onRow={record => ({
                    //     onClick: (e) => onSelect(e)
                    // })}
                       rowClassName={"rows"}
                       size={"small"}
                />
            </div>

        </div>
    );
}
export default AdminPanel;
