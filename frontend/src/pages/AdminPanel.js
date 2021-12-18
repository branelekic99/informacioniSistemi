import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import "antd/dist/antd.css";
import {Button, Input, Table} from 'antd';
import styles from "../styles/adminPanel.css"
import Icon, {SearchOutlined} from "@ant-design/icons";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import axios from 'axios'


const AdminPanel = () => {

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const result = await axios.get("/citizens", {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
            setData(result.data);
            setIsLoaded(true);
            console.log(result.data);
        } catch (err) {
            if(err.response.status == 403){
               // handleTokenExpiration();
            }
        }
    };

    const handleTokenExpiration = () =>{
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
        fetchData();
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    useEffect(()=>{
        if(pageSize.width <= 768){
            setItemsPerPage(5);
        }else{
            setItemsPerPage(10);
        }
    },[pageSize]);

    const columns = [
        {
            title: 'Ime i prezime',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <p> {record.firstname} {record.lastname}</p>,


        },
        {
            title: 'Godine starosti',
            dataIndex: 'year_of_birth',
            key: 'year_of_birth',
            width: 15,
        },
        {
            title: 'Grad',
            dataIndex: 'city',
            key: 'city',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            className:"email-column"
            // render: (text) => <p className={"email-column"}>{text}</p>,
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
            width: 20,
        },
        {
            title: 'Strucna sprema',
            dataIndex: 'education',
            key: 'education',
        },
        {
            title: 'Radno mjesto',
            dataIndex: 'workplace',
            key: 'workplace',
        },
        {
            title: 'Kompanija',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Drzavljanstvo',
            dataIndex: ['citizenshipEntity', 'country'],
            key: 'country',
            width: 20,
        },
        {
            title: 'Godina dolaska ',
            dataIndex: 'year_of_arrival',
            key: 'year_of_arrival',
            width: 15,
        },

        {
            title: 'Broj clanova domacinstva',
            dataIndex: 'num_of_family_members',
            key: 'num_of_family_members',
            // width: 15,
        }
    ];

    const onSelect = (e) => {
        console.log('onSelect ', e.target);
    }

    const doSomething = (e) => {
        console.log('Kliknuto je na dugme', e);
    }

    if(!isLoaded){
        return (
            <div className= "background-div">
                <div className = "loader-div">
                    <Loader className = "loader"
                            type = "Circles"
                            color = "#2b5c90"
                            width = {100}
                    >
                        loading
                    </Loader>
                    <text className= "loading-message">
                        Ucitvanje podataka, molimo Vas sacekajte.
                    </text>
                </div>
            </div>


        )
    }

    return (
        <div className="admin-panel">
            <div className="table-component">
                <Table className="table"
                       pagination={
                           {
                               pageSize: itemsPerPage,
                               position: ["bottomCenter"]
                           }

                       }
                       dataSource={data}
                       columns={columns}
                       onRow={record => ({
                           onClick: (e) => onSelect(e)
                       })}
                       rowClassName={"rows"}
                       size={"small"}
                />
            </div>

        </div>
    );


}
export default AdminPanel;
