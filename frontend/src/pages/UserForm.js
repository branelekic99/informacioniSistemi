import React, {useState, useEffect, useMemo} from 'react';
import {Form, Input, Select, DatePicker, InputNumber,Button} from "antd";
import {municipalities} from "../constants/siMunicipalities";

import "../styles/user-form.css";

const {Option} = Select;

const UserForm = () => {



    const onFinish = (values)=>{
        console.log(values);
    }
    let municipalitiesOptions = [];
    for(const[key,value] of Object.entries(municipalities)){
        municipalitiesOptions.push(<Option value={value} key={key}>{value}</Option>)
    }

    return (
        <div className={"container"}>
            <div className={"form-title"}>
                <h2>Obrazac popisa</h2>
            </div>
            <div className={"form-container"}>
                <Form
                    layout={"vertical"}
                    size={"middle"}
                    onFinish={onFinish}
                >
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Ime"} className={"inline-item"} name={"firstName"} rules={[{required:true,message:"Unesite vase ime."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Prezime"} className={"inline-item"} name={"lastName"} rules={[{required:true,message:"Unesite vase prezime."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Email"} className={"inline-item"} name={"email"} rules={[{required:true,message:"Unesite vasu email adresu."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Broj telefona"} className={"inline-item"} name={"phoneNumber"} rules={[{required:true,message:"Unesite vas broj telefona."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Drzavljanstvo"} className={"inline-item"} name={"status"}>
                            <Select placeholder={"Izaberite drzavljanstvo"}>
                                <Option value={1}>BiH</Option>
                                <Option value={2}>Srbija</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Grad/Mjesto zivljenja"} className={"inline-item"} name={"place"}>
                            <Select placeholder={"Izaberite mjesto zivljenja"} showSearch allowClear>
                                {municipalitiesOptions.map((item)=>item)}
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Strucna sprema"} className={"inline-item"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item label={"Radno mjesto"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Godina dolaska"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Broj clanova u domacinstvu"} className={"inline-item"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label={"Kompanija"} className={"block-item"}>
                        <Input/>
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