import React, {createContext, useState} from 'react';
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
        var json = res['laureates'];
        console.log(json);
        var loopData = ''
        var i;
        for (i = 0; i < json.length; i++) {
            if (json[i].hasOwnProperty('givenName')) loopData += `<li>${json[i].fullName.en}</li>`
        }
        ustawDane(loopData)

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
        <AppContext.Provider value={{dane}}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider