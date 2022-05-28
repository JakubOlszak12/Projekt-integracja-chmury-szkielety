import React, {useContext,createContext, useState} from 'react';
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [dane, ustawDane] = useState('')

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
                person.hasOwnProperty('birth'))
            {
                let Dateparts = person.birth.date.split('-');
                var date = new Date(Dateparts[0], Dateparts[1] - 1, Dateparts[2]);

                jsonArr.push({
                    column1: person.fullName.en,
                    column2: person.familyName.en,
                    column3: person.gender,
                    column4: date,
                  //  column5: person.birth.place.countryNow.en,
                    column6: person.wikipedia.english
                })
            }
        }

        console.log(jsonArr)
    }

    const handleStore = async () => {
        const url = "http://localhost:8000/api/jsonToDatabase"
        const token = localStorage.getItem("token");
        console.log(token)
        const {data: res} = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res)

    }

    const handleReadPrizes = async () => {
        const url = "http://localhost:8000/api/prizes"
        const token = localStorage.getItem("token");

        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = res['nobelPrizes']
        console.log(json);
    }

    const handeStorePrizes = async () => {
        const url = "http://localhost:8000/api/prizesToDatabase"
        const token = localStorage.getItem("token");
        console.log(token);

        const {} = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return (
        <AppContext.Provider value={{
            dane,
            handleLogout,
            handeStorePrizes,
            handleReadPrizes,
            handleStore,
            handleReadJson
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppContextProvider,useAppContext,}