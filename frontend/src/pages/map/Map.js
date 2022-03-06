import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from "mapbox-gl";
import MapControls from "./MapControls";
import "../../styles/map.css";

mapboxgl.accessToken = "pk.eyJ1IjoiYnJhbmVsZWtpYyIsImEiOiJjbDA3NWRxcnEwMnNjM2JuNXlodzdqazNyIn0.QFBHouN8IR97RYuAzmoWRw";
const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(17.1910);
    const [lat, setLat] = useState(44.7722);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        })

    }, []);

    return (
        <div style={{width: "100%", height: "88vh",position:"relative"}}>
            <div ref={mapContainer} className={"map-container"}>
                <MapControls mapRef={map}/>
            </div>
        </div>

    );
};

export default Map;