import React from 'react'

import "antd/dist/antd.css";
import {Button, Table} from 'antd';
import styles from "../styles/adminPanel.css"


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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            comingYear : 2014
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
            age : 22,
            citizenship : "BiH",
            comingYear : 2014
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
            age : 22,
            citizenship : "BiH",
            comingYear : 2014
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
            age : 22,
            citizenship : "BiH",
            comingYear : 2014
        },
        {   key : 13,
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
            comingYear : 2014
        },
        {   key : 14,
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
            comingYear : 2014
        },
        {   key : 15,
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
            comingYear : 2014
        }

    ];

    const columns = [
        {
            title: 'Ime i prezime',
            dataIndex: 'name',
            key : 'name',
            render : (text, record) => <p > {record.name} {record.lastname}</p>
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
            title: 'Godina',
            dataIndex: 'age',
            key: 'age',
            // className: 'yearColumn'
            width:20
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
        },
    ];

    const onSelect = (e) => {
       console.log('onSelect ', e.target);
    }

    const doSomething = (e) => {
        console.log('Kliknuto je na dugme', e);
    }

 /*   selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
*/


    return (
      <div className = "AdminPanel">
          <Table
                 dataSource = {dataSource}
                 columns = {columns}
                 onRow = {record =>({
                     onClick:(e) => onSelect(e)
                 })}
                 rowClassName={"rows"}
          />
          <Button onClick={doSomething} > Button </Button>
      </div>
    );


}
export default AdminPanel;
