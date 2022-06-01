import React, {useContext,createContext, useState, useEffect} from 'react';
import axios from "axios";
import fileDownload from 'js-file-download'

export const AppContext = createContext();



const AppContextProvider = (props) => {
  

        const [dane, ustawDane] = useState('')
        const [jsonData, setJSON] = useState([]) 
        const [jsonPrizeData, setJsonPrizeData] = useState([])   
        const handleLogout = async () => {
        const url = "http://localhost:8000/api/logout"
        const json = JSON.stringify({token: `${localStorage.getItem("token")}`})
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.reload()
        const {data: res} = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })      
    }

<<<<<<< HEAD
    const handleReadChartDataFromDB = async () => {

    }

    const handleReadJson = async () => {
        const url = "http://localhost:8000/api/laureates"
=======
    const handleDownloadXml = async () => {
        const url = "http://localhost:8000/api/prizesExportToXML"
>>>>>>> f85d4e49ed2b3de6ab673cedda639c6343a5a3ad
        const token = localStorage.getItem("token");
        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) =>{
            fileDownload(res.data, `prizes.xml`);
        })
    }

    const handleDownloadJson= async () => {
        const url = "http://localhost:8000/api/laureatesToJSON"
        const token = localStorage.getItem("token");
        const {data:result} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
  
        fileDownload(JSON.stringify(result), `laureates.json`);
    }


    return (
        <AppContext.Provider value={{
            dane,
            handleLogout,
<<<<<<< HEAD
            handleReadJson,
            jsonData,
            handleReadPrizesFromDatabase,
            handleReadChartDataFromDB,
            jsonPrizeData
=======
            handleDownloadXml,
            handleDownloadJson
>>>>>>> f85d4e49ed2b3de6ab673cedda639c6343a5a3ad
        }}>
            {props.children}
        </AppContext.Provider>
    );


}

const useAppContext = () => {
    return useContext(AppContext)
}


export {AppContextProvider,useAppContext}