import React, {useState} from 'react'

import "antd/dist/antd.css";
import {Button, Input, Table} from 'antd';
import styles from "../styles/adminPanel.css"
import Icon, {SearchOutlined} from "@ant-design/icons";


const AdminPanel = () => {

    const dataSource = [

        {   key : 1,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 2,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 3,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 4,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 5,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 6,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 7,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 8,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 9,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 22,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 10,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 42,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 11,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 18,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 12,
            name : 'jelena',
            lastname: 'Mackic',
            city : 'Banja Luka',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 15,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 13,
            name : 'ivona',
            lastname: 'sukunda',
            city : 'Beograd',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 25,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 14,
            name : 'ana',
            lastname: 'Mackic',
            city : 'Bograd',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 12,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        },
        {   key : 15,
            name : 'ana',
            lastname: 'Mackic',
            city : 'Bijeljina',
            email : 'mackicj@gmail.com',
            phone : '066169912',
            citizencol: 'ne znam',
            workplace: 'student',
            company : 'ETF',
            age : 32,
            citizenship : "BiH",
            comingYear : 2014,
            numOfHouseholdMembers : 3
        }

    ];

    const columns = [
        {
            title: 'Ime i prezime',
            dataIndex: 'name',
            key : 'name',
            render : (text, record) => <p > {record.name} {record.lastname}</p>,


        },
        {
            title: 'Godine starosti',
            dataIndex: 'age',
            key : 'age',
            width:15,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
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
            dataIndex: 'citizenship',
            key: 'citizenship',
        },
        {
            title: 'Godina dolaska ',
            dataIndex: 'comingYear',
            key: 'comingYear',
            width:15,
        },

        {
            title: 'Broj clanova domacinstva',
            dataIndex: 'numOfHouseholdMembers',
            key: 'numOfHouseholdMembers',
            width:15,
        }
    ];

    const onSelect = (e) => {
       console.log('onSelect ', e.target);
    }

    const doSomething = (e) => {
        console.log('Kliknuto je na dugme', e);
    }



    return (
      <div className = "AdminPanel">
          <Table pagination={{ pageSize: 7 }}

                 dataSource = {dataSource}
                 columns = {columns}
                 onRow = {record =>({
                     onClick:(e) => onSelect(e)
                 })}
                 rowClassName={"rows"}
          />
      </div>
    );


}
export default AdminPanel;
