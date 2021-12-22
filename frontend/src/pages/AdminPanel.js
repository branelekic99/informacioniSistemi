import React, {useEffect, useState, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {Table} from 'antd';
import {TOKEN} from "../constants/variables";
import axios from 'axios'
import UserContext from "../context/user/userContext";
import {columns} from "../constants/citizenTableColumMeta";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/adminPanel.css";

const AdminPanel = () => {
    const {isAuthenticated} = useContext(UserContext);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [numOfData, setNumOfData] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const fetchData = async (page) => {
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
            console.log(result.data);
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                console.log(err);
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
        if (!isAuthenticated) {
            navigate("/login");
        }
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (pageSize.width <= 768) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(10);
        }
        setCurrentPage(0);
    }, [pageSize]);

    // const onSelect = (e) => {
    //     console.log('onSelect ', e.target);
    // }

    //not authorized
    if (!isAuthenticated) {
        navigate("/login");
    }
    //loader
    // if(!isLoading){
    //     return (
    //         <div className= "background-div">
    //             <div className = "loader-div">
    //                 <Loader className = "loader"
    //                         type = "Circles"
    //                         color = "#2b5c90"
    //                         width = {100}
    //                 >
    //                     loading
    //                 </Loader>
    //                 <text className= "loading-message">
    //                     Ucitvanje podataka, molimo Vas sacekajte.
    //                 </text>
    //             </div>
    //         </div>
    //     )
    // }

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
                               onChange: (page, pageSize) => {setCurrentPage(page - 1)}
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
