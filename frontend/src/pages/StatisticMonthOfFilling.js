import React, {useEffect, useState} from 'react';
import '../styles/statistic.css';
import {G2, Line} from '@ant-design/plots';
import {Link} from "react-router-dom";
import {each, findIndex} from "@antv/util";
import axios from "axios";
import {TOKEN} from "../constants/variables";

const StatisticMonthOfFilling = () => {
    const { InteractionAction, registerInteraction, registerAction } = G2;
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const url = "/citizens/statistics/month"
        try{
            setData([]);
            const result = await  axios.get(url,
                {
                    headers:
                        {"Authorization": `Bearer ${localStorage.getItem(TOKEN)}`}
                });
            const statisticData = result.data;

            const newObject = [];
            for(const [key,value] of Object.entries(statisticData)){
                newObject.push({
                    year:key,
                    value:value,
                })
            }
            setData(newObject);
            console.log(newObject);

        }catch (err){
            console.log("Errr");
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    G2.registerShape('point', 'custom-point', {
        draw(cfg, container) {
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            group.addShape('circle', {
                name: 'outer-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 0.5,
                    r: 6,
                },
            });
            group.addShape('circle', {
                name: 'inner-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 1,
                    r: 2,
                },
            });
            return group;
        },
    });

    class CustomMarkerAction extends InteractionAction {
        active() {
            const view = this.getView();
            const evt = this.context.event;

            if (evt.data) {
                // items: 数组对象，当前 tooltip 显示的每条内容
                const { items } = evt.data;
                const pointGeometries = view.geometries.filter((geom) => geom.type === 'point');
                each(pointGeometries, (pointGeometry) => {
                    each(pointGeometry.elements, (pointElement, idx) => {
                        const active = findIndex(items, (item) => item.data === pointElement.data) !== -1;
                        const [point0, point1] = pointElement.shape.getChildren();

                        if (active) {
                            // outer-circle
                            point0.animate(
                                {
                                    r: 10,
                                    opacity: 0.2,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            ); // inner-circle

                            point1.animate(
                                {
                                    r: 6,
                                    opacity: 0.4,
                                },
                                {
                                    duration: 800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            );
                        } else {
                            this.resetElementState(pointElement);
                        }
                    });
                });
            }
        }

        reset() {
            const view = this.getView();
            const points = view.geometries.filter((geom) => geom.type === 'point');
            each(points, (point) => {
                each(point.elements, (pointElement) => {
                    this.resetElementState(pointElement);
                });
            });
        }

        resetElementState(element) {
            const [point0, point1] = element.shape.getChildren();
            point0.stopAnimate();
            point1.stopAnimate();
            const { r, opacity } = point0.get('attrs');
            point0.attr({
                r,
                opacity,
            });
            const { r: r1, opacity: opacity1 } = point1.get('attrs');
            point1.attr({
                r: r1,
                opacity: opacity1,
            });
        }

        getView() {
            return this.context.view;
        }
    }

    registerAction('custom-marker-action', CustomMarkerAction);
    registerInteraction('custom-marker-interaction', {
        start: [
            {
                trigger: 'tooltip:show',
                action: 'custom-marker-action:active',
            },
        ],
        end: [
            {
                trigger: 'tooltip:hide',
                action: 'custom-marker-action:reset',
            },
        ],
    });
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'custom-point',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'custom-marker-interaction',
            },
        ],
    };

    return (
        <div className={"main"}>
            <div className={"statistic-menu"}>
                <nav
                    className={`${"statistic-nav"} $`}
                >
                    <ul className={"text"}>
                        <li className={"text"}>
                            <Link to="/statistic-year">
                                <text className={"text-view"}>
                                    Godine dolaska
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-age">
                                <text className={"text-view"}>
                                    Starosna struktura
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-month">
                                <text className={"text-view"}>
                                    Mjesečna statistika
                                </text>
                            </Link>
                        </li>
                        <li className={"text"}>
                            <Link to="/statistic-gender">
                                <text className={"text-view"}>
                                    Polna struktura
                                </text>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={"statistic-view"}>
                <Line id={"view"} {...config} />;
            </div>
        </div>);
};

export default StatisticMonthOfFilling;