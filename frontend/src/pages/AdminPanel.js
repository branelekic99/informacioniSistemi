import React, {useEffect, useState} from 'react'

import "antd/dist/antd.css";
import {Button, Input, Table} from 'antd';
import styles from "../styles/adminPanel.css"
import Icon, {SearchOutlined} from "@ant-design/icons";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import axios from 'axios'

const token = "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzIiwic3ViIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJleHAiOjE2Mzk4NDY0Mjl9.hUYOvQ8yiM6NV3i3MzA5zClIuFHQ9BjeRUqCNrkERIlNC95-SFtyWcV4cekLUvLB8BCxs2bYuMdUc7DhZaLWCg";





const AdminPanel = () => {

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            const result = await axios.get("/citizens", {headers: {"Authorization": `Bearer ${token}`}});
            setData(result.data);
            setIsLoaded(true);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        }
    };

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
            <Loader>
                Loading
            </Loader>
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
