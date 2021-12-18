import React, {useEffect, useState} from 'react'

import "antd/dist/antd.css";
import {Button, Input, Table} from 'antd';
import styles from "../styles/adminPanel.css"
import Icon, {SearchOutlined} from "@ant-design/icons";
import axios from 'axios'

const token = "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzIiwic3ViIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJleHAiOjE2Mzk3NTg5MzR9.z6xqzeVWdE9TUZKTdI5CxXFFCLVWYnTkI3x6nzyJMqfWNukjDMIKF278SY01s87T2xdNdvH5jGvLCil8CkQbdQ";



const AdminPanel = () => {

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const result = await axios.get("/citizens", {headers: {"Authorization": `Bearer ${token}`}});
            setData(result.data);
            console.log(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const columns = [
        {
            title: 'Ime i prezime',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <p> {record.name} {record.lastname}</p>,


        },
        {
            title: 'Godine starosti',
            dataIndex: 'year',
            key: 'year',
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
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Strucna sprema',
            dataIndex: 'citizencol',
            key: 'citizencol',
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
            dataIndex: ['citizenshipEntity','country'],
            key: 'country',
        },
        {
            title: 'Godina dolaska ',
            dataIndex: 'comingYear',
            key: 'comingYear',
            width: 15,
        },

        {
            title: 'Broj clanova domacinstva',
            dataIndex: 'num_of_family_members',
            key: 'num_of_family_members',
            width: 15,
        }
    ];

    const onSelect = (e) => {
        console.log('onSelect ', e.target);
    }

    const doSomething = (e) => {
        console.log('Kliknuto je na dugme', e);
    }


    return (
        <div className="AdminPanel">
            <div className= "table-component">
                <Table className="table"
                        pagination={{pageSize: 7}}
                        dataSource={data}
                        columns={columns}
                        onRow={record => ({
                           onClick: (e) => onSelect(e)
                        })}
                        rowClassName={"rows"}
                />
            </div>

        </div>
    );


}
export default AdminPanel;
