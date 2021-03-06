import React, {useState, useEffect, useMemo} from 'react';
import {Form, Input, Select, DatePicker, InputNumber, Button} from "antd";
import axios from "axios";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Loader from "react-loader-spinner";
import Captcha from "../components/Captcha";
import "../styles/user-form.css";

const errorUsername = "Unesite Vaše ime.";
const errorPassword = "Unesite Vaše prezime.";
const errorEmail = "Unesite Vašu email adresu.";
const errorPhoneNumber = "Unesite Vaš broj telefona.";
const errorCitizenship = "Unesite državljanstvo.";
const errorSex = "Odaberite pol."
const errorCity = "Unesite mjesto življenja.";
const errorEducation = "Unesite edukaciju.";
const errorWorkplace = "Unesite radno mijesto.";
const errorYearOfArrival = "Unesite godinu dolaska.";
const errorNumberOfFamily = "Unesite broj članova domaćinstva.";

const {Option} = Select;

const UserForm = () => {
    const navigation = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [captcha, setCaptcha] = useState("");
    const [municipalitiesOptions, setMunicipalitiesOptions] = useState([]);
    const [formData, setFormData] = useState(null);
    const [captchaFailedMessage, setCaptchaFailedMessage] = useState("");

    useEffect(() => {
        if (formSubmitted && captcha.length > 0) createNewCitizen();

    }, [captcha]);

    useEffect(() => {
        getCityData();
    }, []);
    const getCityData = async () => {
        try {
            const result = await axios.get("/cities");
            setMunicipalitiesOptions(result.data);
        } catch (err) {
            console.log(err);
        }
    }
    const onFinish = async (values) => {
        try {
            if (values.year_of_birth)
                values.year_of_birth = values.year_of_birth.year().toString();
            if (values.year_of_arrival)
                values.year_of_arrival = values.year_of_arrival.year().toString();
            for (const [key, value] of Object.entries(values)) {
                if (value === undefined)
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

            formData.token = captcha;
            console.log(formData)
            const formDataString = JSON.stringify(formData);
            console.log(formDataString)
            try {
                const result = await axios.post("/citizens", formData);
                navigation("/user-form-success");
            } catch (err) {
                console.log(err);
                setFormSubmitted(false);
                setCaptcha("");
            }
        }
    }
    const handleRedirect = () => {
        window.location.href = "https://sss-zss.si/";
    }
    if (formSubmitted && !captcha) {
        return <Captcha setCaptcha={setCaptcha}/>
    }
    if (formSubmitted && captcha) {
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
                <h2>Popunite obrazac sa ličnim podacima</h2>
                <p className={"muted-text"}>*Podaci će biti korišteni isključivo od strane <a onClick={handleRedirect}>Saveza
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
                                   rules={[{required: true, message: errorUsername}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Prezime"} className={"inline-item"} name={"lastname"}
                                   rules={[{required: true, message: errorPassword}]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Email"} className={"inline-item"} name={"email"}
                                   rules={[{
                                       required: true,
                                       type: "email",
                                       message: errorEmail
                                   }]}>

                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Broj telefona"} className={"inline-item"} name={"phone"}
                                   rules={[{
                                       required: true,
                                       type: "string",
                                       min: 9,
                                       message: errorPhoneNumber
                                   }]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Drzavljanstvo"} className={"inline-item"} name={"citizenship_id"}
                                   rules={[{required: true, message: errorCitizenship}]}>
                            <Select placeholder={"Izaberite drzavljanstvo"} filterOption={false}

                            >
                                <Option value={3}>BiH</Option>
                                <Option value={1}>Srbija</Option>
                                <Option value={2}>Hrvatska</Option>
                                <Option value={4}>Crna Gora</Option>
                                <Option value={5}>Slovenija</Option>
                                <Option value={6}>Makedonija</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Grad/Mjesto zivljenja"} className={"inline-item"} name={"city_id"}
                                   rules={[{required: true, message: errorCity}]}>
                            <Select placeholder={"Izaberite mjesto zivljenja"} showSearch allowClear
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }>
                                {municipalitiesOptions.map((item) => <Option value={item.id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Stručna sprema"} className={"inline-item"} name={"education"} rules={[{
                            required: true,
                            message: errorEducation
                        }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Radno mjesto"} className={"inline-item"} name={"workplace"} rules={[{
                            required: true,
                            message: errorWorkplace
                        }]}>
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Godina dolaska"} className={"inline-item"} name={"year_of_arrival"} rules={[{
                            required: true,
                            message: errorYearOfArrival
                        }]}>
                            <DatePicker picker={"year"} className={"bl-datepicker"}
                                        disabledDate={(current) => current > moment(new Date())}/>
                        </Form.Item>
                        <Form.Item label={"Broj članova domaćinstva"} className={"inline-item"}
                                   name={"num_of_family_members"} rules={[{
                            required: true,
                            message: errorNumberOfFamily
                        }]}
                        >
                            <InputNumber className={"members-num"} min={1}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Kompanija"} className={"inline-item"} name={"company"}  rules={[{required: true, message: "Unesite kompaniju."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Godina rođenja"} className={"inline-item"} name={"year_of_birth"}
                                   rules={[{required: true, message: "Unesite godinu rođenja."}]}>
                            <DatePicker picker={"year"} className={"bl-datepicker"}
                                        disabledDate={(current) => current > moment(new Date())}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className={"item-box"}>
                        <Form.Item label={"Pol"} className={"inline-item"} name={"sex"}
                                   rules={[{required: true, message: errorSex}]}>
                            <Select placeholder={"Izaberite pol"} filterOption={false}>
                                <Option value={"male"}>Muško</Option>
                                <Option value={"female"}>Žensko</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={"Ostalo"} className={"inline-item"} name={"other"}>
                            <Input.TextArea/>
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