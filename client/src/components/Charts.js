import React, {useEffect, useState} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {useAppContext} from "../AppContext";
import { Chart } from "react-google-charts";
import axios from "axios";

export const data = [
    ["Task", "Hours per Day"],
    ["Male", 1],
    ["Female",1]
];

const Charts = () => {

    const [jsonChartsData,setChartsData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const url = "http://localhost:8000/api/charts"
            const token = localStorage.getItem("token");
            await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setChartsData(response.data)
                console.log(response.data)
                setLoading(false);
            }).catch(err => {
                console.log('handleReadChartDataFromDB ERROR')
                console.log(err)
            })
        }

        fetchData();
    }, [])

    if(isLoading){
        return (
            <Wrapper>
                <div>
                    <div className='content'>
                        <h1>Loading...</h1>
                    </div>
                </div>
            </Wrapper>
        )
    }

    const parseJson = (json,array) => {
        let arr = [];
        arr.push(array)
        Object.entries(json).forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            if(typeof value === 'string'){
                arr.push([key,parseInt(value)]);
            }else{
                arr.push([key,value]);
            }

        });
        return arr;
    }

    const parseToAreaChart = (json,array) => {
        let arr = [];
        arr.push(array)
        Object.entries(json).forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            arr.push([key,value])
        });
        return arr;
    }
    const parseToAreaChart1 = (json,array) => {
        let arr = [];
        arr.push(array)
        Object.entries(json).forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            var arrayOfNumbers = value.map(Number);
            arr.push([key].concat(arrayOfNumbers))
        });
        console.log(arr);
        return arr;

    }

    return (
        <Wrapper>
            <div>
                <div className='content' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                    <Chart
                        chartType="PieChart"
                        data={
                            [["Male And Female Laureates", "Count"],
                                ["Male", jsonChartsData[0].male_count],
                                ["Female",jsonChartsData[0].female_count]
                            ]
                        }
                        options={{
                            title: "Male and Female laureates",
                            is3D: true,
                        }}
                        width={"100%"}
                        height={"400px"}
                    />
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].country_count,["Countries of origin of Nobel Prize winners","Country"])}
                        options={{
                            title: "Countries of origin of Nobel Prize winners",
                            sliceVisibilityThreshold: 0.01, // 20%
                        }}
                    />
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].most_first_names,["Number of Nobel Prize winners with the same name","Number of names"])}
                        options={{
                            title: "Number of Nobel Prize winners with the same name",
                        }}
                    />
                </div>
                <div className='content' style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].most_last_names,["Number of Nobel Prize winners with the same surname","Number of surnames"])}
                        options={{
                            title: "Number of Nobel Prize winners with the same surname",
                        }}
                    />
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].prize_category_count,["Number of Nobel Prizes given out in a given category","Number of prizes given"])}
                        options={{
                            title: "Number of Nobel Prizes given out in a given category",
                        }}
                    />
                </div>
                <div className='content' style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].prize_amount_by_category,["Total amount awarded in a given category at the year of the award","Prize"])}
                        options={{
                            title: "Total amount awarded in a given category at the year of the award",
                        }}
                    />
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={parseJson(jsonChartsData[0].prize_amount_adjusted_by_category,["Total amount awarded in a given category according to Index number yearly average","Prize"])}
                        options={{
                            title: "Total amount  awarded in a given category according to Index number yearly average",
                        }}
                    />
                </div>

                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={parseToAreaChart(jsonChartsData[0].awarded_year,["Year","Number of prizes given"])}
                    options={{
                        title: "Nobel prizes awarded in a given year",
                        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: "80%", height: "70%" },
                    }}
                />

                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={parseToAreaChart1(jsonChartsData[0].awarded_year_by_category,["Year","Chemistry",'Economic Sciences','Literature','Peace','Physics','Physiology or Medicine'])}
                    options={{
                        title: "Nobel prizes awarded in a given year based on Category",
                        isStacked: true,
                        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: "80%", height: "70%" },
                    }}
                />
            </div>
        </Wrapper>
    )
}


export default Charts