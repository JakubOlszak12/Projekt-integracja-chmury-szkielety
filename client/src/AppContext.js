import React, {useContext,createContext, useState, useEffect} from 'react';
import axios from "axios";

export const AppContext = createContext();



const AppContextProvider = (props) => {
  

    useEffect(() =>{
        handleReadJson();
        handleReadPrizesFromDatabase();
    },[])

        const [dane, ustawDane] = useState('')
        const [jsonData, setJSON] = useState([]) 
        const [jsonPrizeData, setJsonPrizeData] = useState([])   
    const handleLogout = async () => {
        const url = "http://localhost:8000/api/logout"
        const json = JSON.stringify({token: `${localStorage.getItem("token")}`})
        console.log(json)
        const {data: res} = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.reload()
        
    }

    const handleReadJson = async () => {
        const url = "http://localhost:8000/api/laureates"
        const token = localStorage.getItem("token");
        console.log(token)
        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       
        let json = res['laureates'];
    
        console.log(json[0])
        const jsonArr = [];

        for (let i = 0; i < json.length; i++) {
            const person = json[i]
            //TODO walidacja
            if (person.hasOwnProperty('givenName') &&
                person.hasOwnProperty('familyName') &&
                person.hasOwnProperty('gender') &&
                person.hasOwnProperty('birth')&&
                'place' in person.birth)
            {
                jsonArr.push({
                    column1: person.givenName.en,
                    column2: person.familyName.en,
                    column3: person.gender,
                    column4:  person.birth.date,
                    column5: person.birth.place.country.en,
                    column6: person.wikipedia.english,
                    id: person.id
                })
            }
        }
        setJSON(jsonArr)
    }

    const handleReadPrizesFromDatabase = async () => {
        const url = "http://localhost:8000/api/PrizesFromDatabase"
        const token = localStorage.getItem("token");
        console.log(token);
        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let json = res;
    
        console.log(json[0])
        const jsonArr = [];

        for (let i = 0; i < json.length; i++) {
            const prize = json[i]
            {
                jsonArr.push({
                    column1: prize.laureate_name,
                    column2: prize.award_year,
                    column3: prize.category,
                    column4: prize.prize,
                    column5: prize.prize_adjusted,
                    column6: prize.motivation,
                    column7: prize.wikipedia,
                })
            }
        }
        setJsonPrizeData(jsonArr)
    }

    return (
        <AppContext.Provider value={{
            dane,
            handleLogout,
            handleReadJson,
            jsonData,
            handleReadPrizesFromDatabase,
            jsonPrizeData
        }}>
            {props.children}
        </AppContext.Provider>
    );


}

const useAppContext = () => {
    return useContext(AppContext)
}


export {AppContextProvider,useAppContext}