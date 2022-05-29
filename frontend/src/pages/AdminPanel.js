import React, {useEffect, useState, useContext,useRef} from 'react'
import {useNavigate, Navigate} from "react-router-dom";
import {Table} from 'antd';
import {TOKEN, USER_STATUS} from "../constants/variables";
import axios from 'axios'
import UserContext from "../context/user/userContext";
import {DatePicker, Input, Select} from "antd";
import moment from "moment";
import "../styles/user-form.css";
import {SearchOutlined, InfoCircleOutlined } from '@ant-design/icons'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/adminPanel.css";
import {Button, Space, Modal} from 'antd';
import {checkUserStatus} from "../helper_functions/checkUserStatus";
const Option = {Select};
const AdminPanel = () => {
    const {userStatus, setUserStatus} = useContext(UserContext);

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
    const [filtered, setFiltered] = useState({});
    const [filteredYearOfArrival, setFilteredYearOfArrival] = useState();
    const [filteredYearOfBirth, setFilteredYearOfBirth] = useState();
    const handleDatePickerChange = (date) => {
        console.log("Handle", date.getYear);
    }
    const [municipalitiesOptions,setMunicipalitiesOptions] = useState([]);
    const getCityData = async () => {
        try {
            const result = await axios.get("/cities");
            setMunicipalitiesOptions(result.data);
        } catch (err) {
            console.log(err);
        }
    }


    function info(record) {
        console.log("recordddddddddddddd",record);
        Modal.info({
            icon: null,
            title: <div className= "info-title"></div>,
            keyboard:true,
            maskClosable:true,
            content: (
                <div className="info-container">
                    <form className="info-form">
                        <div className={"bl-info-box"}>
                            <label>Ime i prezime</label>
                            <span>{record.firstname} {record.lastname}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Pol</label>
                            <span>{record.sex}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Godina rođenja</label>
                            <span>{record.year_of_birth}</span>
                        </div>

                        <div className={"bl-info-box"}>
                            <label>Državljanstvo</label>
                            <span>{record.citizenshipEntity.country}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Godina dolaska</label>
                            <span>{record.year_of_arrival}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Grad</label>
                            <span>{record.cityEntity.name}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Stručna sprema</label>
                            <span>{record.education}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Kompanija</label>
                            <span>{record.company}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Radno mjesto</label>
                            <span>{record.workplace}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Broj članova domaćinstva</label>
                            <span>{record.num_of_family_members}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Broj telefona</label>
                            <span>{record.phone}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Email</label>
                            <span>{record.email}</span>
                        </div>
                        <div className={"bl-info-box"}>
                            <label>Ostalo</label>
                            <span>{record.other}</span>
                        </div>
                    </form>
                </div>

            ),
            onOk() {},
            width : "60%",
            bodyStyle: {
                "background-color" : "white"
            }
        });
    }
    const columns = [
        {
            title: 'Ime i prezime',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <p> {record.firstname} {record.lastname}</p>,
            filterDropdown:({setSelectedKeys, selectedKeys, confirm}) => {
                return <div>
                    <Input
                        autoFocus
                        onPressEnter={() => {
                            confirm()
                        }}
                        value = {selectedKeys[0]}
                        onChange={ (e)=> {
                            setSelectedKeys(e.target.value?[e.target.value]:[]);
                        }}
                        onBlur={() => {
                            confirm()
                        }}>
                    </Input>

                </div>
            },
            filterIcon: ()=> {
                return <SearchOutlined></SearchOutlined>
            }

        },
        {
            title: 'Godina rođenja',
            dataIndex: 'year_of_birth',
            key: 'year_of_birth',
            width: 15,
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => (
                <DatePicker picker={"year"} className={"bl-datepicker"}
                            disabledDate={(current) => current > moment(new Date())}
                            value={selectedKeys[0]}
                            onChange={(date) => {
                                setSelectedKeys(date !== null?[date]:[])
                                confirm()
                                console.log("Izabrana godina rodjenja")
                            }}
                            autoFocus={true}
                />
            ),
            filterMultiple: false
        },
        {
            title: 'Grad',
            dataIndex: ['cityEntity', 'name'],
            key: 'cityEntity',
            width: 25,
            filterDropdown:({setSelectedKeys, selectedKeys, confirm}) => (

                <div>
                    <Select
                            style={{"width" : "100%"}}
                            showSearch
                            allowClear
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                            onSelect={ (key,option) => {
                                console.log("SELECTED ", selectedKeys)
                                setSelectedKeys(option.value);
                                confirm();
                                console.log("SELECTED ", selectedKeys)
                            }}
                            onPressEnter={() => {
                                confirm()
                            }

                            }
                        >
                        {municipalitiesOptions.map((item) => <Option value={item.id}>{item.name}</Option>)}
                    </Select>
                </div>


            ),
            filterMultiple: false,
            filterIcon: ()=> {
                return <SearchOutlined></SearchOutlined>
            }




        },
        {
            title: 'Strucna sprema',
            dataIndex: 'education',
            key: 'education',
        },

        {
            title: 'Kompanija',
            dataIndex: 'company',
            key: 'company',
            width: 20,
        },
        {
            title: 'Drzavljanstvo',
            dataIndex: ['citizenshipEntity', 'country'],
            key: 'country',
            width: 10,
            filters: [
                {
                    text: 'BiH',
                    value: '3'
                },
                {
                    text: 'Srbija',
                    value: '1'
                },
                {
                    text: 'Hrvatska',
                    value: '2'
                },
                {
                    text: 'Crna Gora',
                    value: '4'
                },
                {
                    text: 'Makedonija',
                    value: '6'
                },
                {
                    text: 'Slovenija',
                    value: '5'
                }
            ],
            filterMultiple: false,


        },
        {
            title: 'Godina dolaska ',
            dataIndex: 'year_of_arrival',
            key: 'year_of_arrival',
            width: 15,
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => (
                <DatePicker picker={"year"} className={"bl-datepicker"}
                            disabledDate={(current) => current > moment(new Date())}
                            value={selectedKeys[0]}
                            onChange={(date) => {
                                setSelectedKeys(date !== null?[date]:[])
                                confirm()
                            }}
                            autoFocus={true}
                />
            ),
            filterMultiple: false
        },
        {
            title: 'Pol',
            dataIndex: 'sex',
            key: 'sex',
            width: 15,
            filters: [
                {
                    text: 'ženski',
                    value: 'female'
                },
                {
                    text: 'muški',
                    value: 'male'
                }
            ],
            filterMultiple: false
        },
        {
            title: 'Info',
            render: (record) => <Button
                                shape="circle"
                                icon={<InfoCircleOutlined style={{"width" : "100%"}}/>}
                                onClick={() => info(record)}
                                ></Button>

        }];


    const navigate = useNavigate();
    const createUrl = (baseUrl) => {
        console.log("Uslo u create url");
        if (filtered.country != null) {
            baseUrl += `citizenship_id=${filtered.country}`
        }
        if (filtered.sex != null) {
            baseUrl += `sex=${filtered.sex}`
        }
        if(filtered.name != null){
            baseUrl += `firstname=${filtered.name}`
        }
        if(filtered.year_of_arrival != null){
            console.log("Arrival: ",filtered.year_of_arrival[0].year());
            baseUrl += `year_of_arrival=${filtered.year_of_arrival[0].year()}`
        }
        if(filtered.year_of_birth != null){
            console.log("Birth: ",filtered.year_of_birth[0].year());
            baseUrl += `year_of_birth=${filtered.year_of_birth[0].year()}`
            console.log("base url after birth:  ", baseUrl);

        }
        if(filtered.cityEntity != null){
            console.log("IZabran je grad ", filtered.city[0]);
        }
        console.log("base url: ", baseUrl);
        return baseUrl;
    }
    const fetchData = async (page, itemsPerPage) => {
        setIsLoading(true);
        const newUrl = createUrl("/citizens?");
        try {
            const result = await axios.get(newUrl,
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
        getCityData();
        window.addEventListener("resize", handleResize);
        console.log("ovde sam !?");
        if (userStatus === USER_STATUS.NOT_AUTHENTICATED)
            navigate("/login")
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     console.log("FILTER: ", filteredYearOfBirth);
    // }, filteredYearOfBirth);
    useEffect(() => {
        console.log("nesto se promijenilo::::::::::::::: ",filtered);
        fetchData(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage,filteredYearOfArrival,filtered,filteredYearOfBirth]);

    useEffect(() => {
        if (pageSize.width <= 768) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(10);
        }
        setCurrentPage(0);
    }, [pageSize]);

    if (userStatus === USER_STATUS.CHECKING)
        return <p>loading!!!</p>
    if (userStatus === USER_STATUS.NOT_AUTHENTICATED)
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
                               onChange: (page, pageSize, filter) => {
                                   setCurrentPage(page - 1);
                                   setItemsPerPage(pageSize);
                                   // setFiltered(filter);
                                   console.log(filter)
                               }
                           }
                       }
                       onChange={(pagination, filters, sorter, extra) => {
                           console.log("params", filters);
                           setFiltered(filters);
                           console.log("filtered::: ", filtered);
                           const {year_of_arrival} = filters;

                           setCurrentPage(0);
                           ///iz nekog razlofa mi ne prodje prvo filtriranje bude null vrijednost filtera
                           // fetchData(currentPage, itemsPerPage);
                       }}
                       filterDropdown={
                           console.log("Jelena")
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
