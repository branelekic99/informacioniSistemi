import React, {useContext, useEffect, useRef, useState} from 'react';
import mapboxgl from "mapbox-gl";
import MapControls from "./MapControls";
import "../../styles/map.css";
import {TOKEN, USER_STATUS} from "../../constants/variables";
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import UserContext from "../../context/user/userContext";
import {Navigate} from "react-router-dom";
mapboxgl.accessToken = "pk.eyJ1IjoiYnJhbmVsZWtpYyIsImEiOiJjbDA3NWRxcnEwMnNjM2JuNXlodzdqazNyIn0.QFBHouN8IR97RYuAzmoWRw";

export const groupElementsByCityName = (array)=>{
    const newArray = [];
    array.forEach((citizen)=>{
        const existingObject = newArray.find(itm=>itm.city_name === citizen.city_name)
        if(existingObject !== undefined){
            existingObject.citizens++;
        }else{
            newArray.push({
                city_name:citizen.city_name,
                citizens:1,
                latitude:citizen.latitude,
                longitude:citizen.longitude
            })
        }
    })
    return newArray;
}
export const generateFeatureColection = (data)=>{
    return {
        "type":"FeatureCollection",
        "features":data.map(item=>{
            return {
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[item.longitude,item.latitude]
                },
                'properties': {
                    "number_of_citizens":item.citizens,
                    "city_name":item.city_name
                },
            }
        })
    }
}
export const generateGeoJson = (data)=>{
    const groupedData = groupElementsByCityName(data);
    const featureCollection = {
        "type":"geojson",
        "data":generateFeatureColection(groupedData)
    }
    return featureCollection;
}


const MapBox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(14.5058);
    const [lat, setLat] = useState(46.0569);
    const [zoom, setZoom] = useState(9);
    const [geoData,setGeoData] = useState([]);
    const {userStatus,setUserStatus} = useContext(UserContext);

    const getCitizens = async()=>{
        try{
            const result  = await axios.get("/citizens/map",{
                headers: {"Authorization":`Bearer ${localStorage.getItem(TOKEN)}`}
            })
            const data = generateGeoJson(result.data);
                setGeoData(result.data);
                map.current.addSource("points",data);
                map.current.addLayer({
                    "id":"points",
                    "type":"circle",
                    "source":"points",
                    'paint': {
                        'circle-radius': 10,
                        'circle-color': '#007cbf'
                    }
                })
                map.current.on("click","points",(e)=>{
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const number = e.features[0].properties.number_of_citizens;
                    const city_name = e.features[0].properties.city_name;

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`<div class="bl-map-popup"><p>Citizens: ${number}</p><p>City name: ${city_name}</p></div>`)
                        .addTo(map.current);
                })
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        if (map.current || !mapContainer.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        })
        map.current.on("load",()=>{
            getCitizens();
        })
    }, []);
    if(userStatus === USER_STATUS.NOT_AUTHENTICATED)
        return <Navigate to={"/login"}/>
    return (
        <div style={{width: "100%", height: "88vh",position:"relative"}}>
            <div ref={mapContainer} className={"map-container"}>
            </div>
            <MapControls mapRef={map} data={geoData}/>
        </div>
    );
};

export default MapBox;