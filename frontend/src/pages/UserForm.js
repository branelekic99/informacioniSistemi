import React, {useState, useEffect, useMemo} from 'react';
import {Form, Input, Select, DatePicker, InputNumber, Button} from "antd";
import axios from "axios";
import {municipalities} from "../constants/siMunicipalities";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Loader from "react-loader-spinner";
import "../styles/user-form.css";

import Captcha from "../components/Captcha";

const {Option} = Select;

const UserForm = () => {
    const navigation = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [captchaCompleted, setCaptchaCompleted] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (formSubmitted && captchaCompleted) createNewCitizen();

    }, [captchaCompleted]);

    const onFinish = async (values) => {
        try {
            if (values.year_of_birth)
                values.year_of_birth = values.year_of_birth.year();
            if (values.year_of_arrival)
                values.year_of_arrival = values.year_of_arrival.year();
            for(const [key,value] of Object.entries(values)){
                if(value === undefined)
                    delete values[key]
            }
            setFormData(values);
            setFormSubmitted(true);
        } catch (err) {
            console.log(err);
        }
    }

    const createNewCitizen = async () => {
        if (formData !== null) {
            const formDataString = JSON.stringify(formData);
            console.log(formDataString);
            try{
                const result = await axios.post("/citizens",formData);
                navigation("/user-form-success");
            }catch (err){
                console.log(err);
            }
        }
    }
    let municipalitiesOptions = [];
    for (const [key, value] of Object.entries(municipalities)) {
        municipalitiesOptions.push(<Option value={value} key={key}>{value}</Option>)
    }
    const handleRedirect = () => {
        window.location.href = "https://sss-zss.si/";
    }
    if (formSubmitted && !captchaCompleted) {
        return <Captcha setCaptcha={setCaptchaCompleted}/>
    }
    if(formSubmitted && captchaCompleted){
        return <div className={"spinner-container"}>
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    }
    return (
        <div className={"container"}>
            <div className={"form-title"}>
                <h2>Popunite obrazac sa vasim licnim podacima</h2>
                <p className={"muted-text"}>*Podaci ce biti koristeni iskljucivo od strane <a onClick={handleRedirect}>Saveza
                    Srba Slovenije</a></p>
            </div>
            <div className={"form-container"}>
                <Form
                    layout={"vertical"}
                    size={"middle"}
                    onFinish={onFinish}
                >
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Ime"} className={"inline-item"} name={"firstname"}
                                   rules={[{required: true, message: "Unesite vase ime."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Prezime"} className={"inline-item"} name={"lastname"}
                                   rules={[{required: true, message: "Unesite vase prezime."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Email"} className={"inline-item"} name={"email"}
                                   rules={[{required: true, message: "Unesite vasu email adresu."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Broj telefona"} className={"inline-item"} name={"phone"}
                                   rules={[{required: true, message: "Unesite vas broj telefona."}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Drzavljanstvo"} className={"inline-item"} name={"citizenshipEntity"} rules={[{required: true, message: "Unesite drzavljanstvo!"}]}>
                            <Select placeholder={"Izaberite drzavljanstvo"} filterOption={false}>
                                <Option value={3}>BiH</Option>
                                <Option value={1}>Srbija</Option>
                                <Option value={2}>Hrvatska</Option>
                                <Option value={4}>Crna Gora</Option>
                                <Option value={5}>Slovenija</Option>
                                <Option value={6}>Makedonija</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Grad/Mjesto zivljenja"} className={"inline-item"} name={"city"} rules={[{required: true, message: "Unesite mjesto zivljenja!"}]}>
                            <Select placeholder={"Izaberite mjesto zivljenja"} showSearch allowClear
                                    filterOption={false}>
                                {municipalitiesOptions.map((item) => item)}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Strucna sprema"} className={"inline-item"} name={"education"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Radno mjesto"} className={"inline-item"} name={"workplace"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Godina dolaska"} className={"inline-item"} name={"year_of_arrival"}>
                            <DatePicker picker={"year"} className={"bl-datepicker"}
                                        disabledDate={(current) => current > moment(new Date())}/>
                        </Form.Item>
                        <Form.Item label={"Broj clanova domacinstva"} className={"inline-item"}
                                   name={"num_of_family_members"}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Kompanija"} className={"inline-item"} name={"company"}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Godina rodjenja"} className={"inline-item"} name={"year_of_birth"}>
                            <DatePicker picker={"year"} className={"bl-datepicker"}
                                        disabledDate={(current) => current > moment(new Date())}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"form-submit-box"}>
                        <Button type={"primary"} htmlType={"submit"} block={true} size={"large"}>
                            Dalje
                        </Button>
                    </Form.Item>

                </Form>
            </div>

        </div>
    );
};

export default UserForm;