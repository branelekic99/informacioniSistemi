import React, {useState} from 'react';
import {Tooltip} from "antd";
import {BsGenderAmbiguous} from "react-icons/bs";
import {GoCalendar} from "react-icons/go";
import {RiCalendar2Line} from "react-icons/ri";
import {AiOutlineFlag, AiOutlineZoomIn, AiOutlineZoomOut} from "react-icons/ai";
import GenderFilter from "./GenderFilter";
import genderFilter from "./GenderFilter";
import YearOfArrivalFilter from "./YearOfArrivalFilter";
import AgeFilter from "./AgeFilter";
import CitizenshipFilter from "./CitizenshipFilter";


const MapControls = ({mapRef}) => {
    const [activeFilter, setActiveFilter] = useState("");

    const handleZoomIn = () => {
        mapRef.current.zoomTo(mapRef.current.getZoom() + 1);
    }
    const handleZoomOut = () => {
        mapRef.current.zoomTo(mapRef.current.getZoom() - 1);
    }
    const handleGenderFilterClick = () => {
        if (activeFilter === "gender")
            setActiveFilter("")
        else setActiveFilter("gender");
    }
    const handleGenderFilter = e => {
        console.log(e)
    }
    const handleYearArrivalFilterClick = () => {
        if (activeFilter === "arrival")
            setActiveFilter("")
        else setActiveFilter("arrival")
    }
    const handleYearArrivalFilter = e => {
        console.log(e)
    }

    const handleAgeFilterClick = () => {
        if (activeFilter === "age")
            setActiveFilter("")
        else setActiveFilter("age")
    }
    const handleAgeFilter = e => {

    }
    const handleCitizenShipFilterClick = () => {
        if (activeFilter === "citizenship")
            setActiveFilter("")
        else setActiveFilter("citizenship")
    }
    const handleCitizenShipFilter = e => {

    }
    return (
        <div className={"map-controls"}>
            <div className={"control-item"}>
                <Tooltip placement={"topLeft"} title={"Uvećaj"}>
                    <AiOutlineZoomIn size={25} onClick={handleZoomIn}/>
                </Tooltip>
            </div>
            <div className={"control-item"}>
                <Tooltip placement={"topLeft"} title={"Odalji"}>
                    <AiOutlineZoomOut size={25} onClick={handleZoomOut}/>
                </Tooltip>
            </div>
            <div className={"control-item " + `${activeFilter === "gender" ? "control-item-active" : ""}`}>
                <Tooltip placement={"topLeft"} title={"Filter po polu"}>
                    <BsGenderAmbiguous size={25} onClick={handleGenderFilterClick}/>
                </Tooltip>
                <GenderFilter activeFilter={activeFilter} handleGenderFilter={handleGenderFilter}/>
            </div>
            <div className={"control-item " + `${activeFilter === "arrival" ? "control-item-active" : ""}`}>
                <Tooltip placement={"topLeft"} title={"Filter po godini dolaska"}>
                    <GoCalendar size={25} onClick={handleYearArrivalFilterClick}/>
                </Tooltip>
                <YearOfArrivalFilter activeFilter={activeFilter} handleYearArrivalFilter={handleYearArrivalFilter}/>
            </div>
            <div className={"control-item " + `${activeFilter === "age" ? "control-item-active" : ""}`}>
                <Tooltip placement={"topLeft"} title={"Filter po starosti"}>
                    <RiCalendar2Line size={25} onClick={handleAgeFilterClick}/>
                </Tooltip>
                <AgeFilter activeFilter={activeFilter} handleAgeFilter={handleAgeFilter}/>
            </div>
            <div className={"control-item"}>
                <Tooltip placement={"topLeft"} title={"Filter po državljanstvu"}>
                    <AiOutlineFlag size={25} onClick={handleCitizenShipFilterClick}/>
                </Tooltip>
                <CitizenshipFilter activeFilter={activeFilter} handleCitizenShipFilter={handleCitizenShipFilter}/>
            </div>
        </div>
    );
};

export default MapControls;