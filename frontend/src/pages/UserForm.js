import React, {useState, useEffect, useMemo} from 'react';
import {Form, Input, Select, DatePicker, InputNumber, Button} from "antd";
import axios from "axios";
import {municipalities} from "../constants/siMunicipalities";
import SuccessfullySumbited from "../components/SuccessfullySumbited";
import moment from "moment";

import "../styles/user-form.css";

const {Option} = Select;

const UserForm = () => {
    const [formSubmitted,setFormSubmitted] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        setFormSubmitted(true);
    }
    let municipalitiesOptions = [];
    for (const [key, value] of Object.entries(municipalities)) {
        municipalitiesOptions.push(<Option value={value} key={key}>{value}</Option>)
    }
    if(formSubmitted)
        return <SuccessfullySumbited />
    return (
        <div className={"container"}>
            <div className={"form-title"}>
                <h2>Popunite obrazac sa vasim licnim podacima</h2>
                <p className={"muted-text"}>*Podaci ce biti koristeni iskljucivo od strane Saveza Srba Slovenije</p>
            </div>
            <div className={"form-container"}>
                <Form
                    layout={"vertical"}
                    size={"middle"}
                    onFinish={onFinish}
                >
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Ime"} className={"inline-item"} name={"firstName"}
                                   rules={[{required: true, message: "Unesite vase ime."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Prezime"} className={"inline-item"} name={"lastName"}
                                   rules={[{required: true, message: "Unesite vase prezime."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Email"} className={"inline-item"} name={"email"}
                                   rules={[{required: true, message: "Unesite vasu email adresu."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Broj telefona"} className={"inline-item"} name={"phoneNumber"}
                                   rules={[{required: true, message: "Unesite vas broj telefona."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Drzavljanstvo"} className={"inline-item"} name={"status"}>
                            <Select placeholder={"Izaberite drzavljanstvo"}>
                                <Option value={1}>BiH</Option>
                                <Option value={2}>Srbija</Option>
                                <Option value={3}>Hrvatska</Option>
                                <Option value={4}>Makedonija</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Grad/Mjesto zivljenja"} className={"inline-item"} name={"place"}>
                            <Select placeholder={"Izaberite mjesto zivljenja"} showSearch allowClear>
                                {municipalitiesOptions.map((item) => item)}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Strucna sprema"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Radno mjesto"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Godina dolaska"} className={"inline-item"}>
                            <DatePicker picker={"year"} className={"bl-datepicker"} disabledDate={(current)=>current > moment(new Date())}/>
                        </Form.Item>
                        <Form.Item label={"Broj clanova domacinstva"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Kompanija"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Godina rodjenja"} className={"inline-item"}>
                            <DatePicker picker={"year"} className={"bl-datepicker"} disabledDate={(current)=>current > moment(new Date())}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"form-submit-box"}>
                        <Button type={"primary"} htmlType={"submit"} block={true} size={"large"}>
                            Potvrdi
                        </Button>
                    </Form.Item>

                </Form>
            </div>

        </div>
    );
};

export default UserForm;