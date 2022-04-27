import React, {useEffect, useState} from 'react';
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
import {generateFeatureColection, generateGeoJson, groupElementsByCityName} from "./MapBox";


const MapControls = ({mapRef, data}) => {
    const [activeFilter, setActiveFilter] = useState("");
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        let newData = data;
        console.log(filters)
        filters.forEach(filter => {
            newData = newData.filter(item => item[filter.name] === filter.value)
        })
        const groupedData = groupElementsByCityName(newData);
        const filteredFeatureCollection = generateFeatureColection(groupedData);
        if (mapRef?.current?.loaded)
            mapRef.current.getSource("points").setData(filteredFeatureCollection)
    }, [filters]);
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
    const handleGenderFilter = selectedGender => {
        if (selectedGender !== undefined) {
            if (!filters.some(filter => filter.name === "sex"))
                setFilters(currFilters => [...currFilters, {name: "sex", value: selectedGender}])
            else setFilters(currFilters => currFilters.map(filter => {
                if (filter.name === "sex") {
                    return {
                        ...filter,
                        value: selectedGender
                    }
                }
                return filter;
            }))
        } else {
            setFilters(currFilters => currFilters.filter(item => item.name !== "sex"))
        }
    }

    const handleYearArrivalFilterClick = () => {
        if (activeFilter === "arrival")
            setActiveFilter("")
        else setActiveFilter("arrival")
    }
    const handleYearArrivalFilter = e => {
        if (e !== null) {
            const year = e.year();
            if(!filters.some(item=>item.name === "year_of_arrival"))
                setFilters(currFilters=>[...currFilters,{name:"year_of_arrival",value:year}])
            else{
                setFilters(currFilters=>currFilters.map(filter=>{
                    if(filter.name === "year_of_arrival"){
                        return{
                            ...filter,
                            value:year
                        }
                        return filter;
                    }
                }))
            }
        } else
            setFilters(currFilters=>currFilters.filter(filter=>filter.name !== "year_of_arrival"))
    }

    const handleAgeFilterClick = () => {
        if (activeFilter === "age")
            setActiveFilter("")
        else setActiveFilter("age")
    }
    const handleAgeFilter = e => {
        if (e !== null) {
            const year = e.year();
            if(!filters.some(item=>item.name === "year_of_birth"))
                setFilters(currFilters=>[...currFilters,{name:"year_of_birth",value:year}])
            else{
                setFilters(currFilters=>currFilters.map(filter=>{
                    if(filter.name === "year_of_birth"){
                        return{
                            ...filter,
                            value:year
                        }
                        return filter;
                    }
                }))
            }
        } else
            setFilters(currFilters=>currFilters.filter(filter=>filter.name !== "year_of_birth"))
    }
    const handleCitizenShipFilterClick = () => {
        if (activeFilter === "citizenship")
            setActiveFilter("")
        else setActiveFilter("citizenship")
    }
    const handleCitizenShipFilter = selectedCitizenShip => {
        if (selectedCitizenShip !== undefined) {
            if (!filters.some(filter => filter.name === "citizenship"))
                setFilters(currFilters => [...currFilters, {name: "citizenship", value: selectedCitizenShip}])
            else setFilters(currFilters => currFilters.map(filter => {
                if (filter.name === "citizenship") {
                    return {
                        ...filter,
                        value: selectedCitizenShip
                    }
                }
                return filter;
            }))
        } else {
            setFilters(currFilters => currFilters.filter(item => item.name !== "citizenship"))
        }
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
            <div className={"control-item " + `${activeFilter === "citizenship" ? "control-item-active" : ""}`}>
                <Tooltip placement={"topLeft"} title={"Filter po državljanstvu"}>
                    <AiOutlineFlag size={25} onClick={handleCitizenShipFilterClick}/>
                </Tooltip>
                <CitizenshipFilter activeFilter={activeFilter} handleCitizenShipFilter={handleCitizenShipFilter}/>
            </div>
        </div>
    );
};

export default MapControls;