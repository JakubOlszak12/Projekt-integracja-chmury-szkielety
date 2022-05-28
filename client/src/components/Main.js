import React, {useContext, useState} from 'react';
import axios from 'axios'
import Wrapper from "../wrapper/PageBtnContainer";
import {Link} from "react-router-dom"
import {AppContext} from "../AppContext";

const Main = () => {
    const {dane} = useContext(AppContext)


    const handleLogout = async () => {
        const url = "http://localhost:8000/api/logout"
        const json = JSON.stringify({token:`${localStorage.getItem("token")}`})
        console.log(json)
        const {data: res} = await axios.post(url, json,{headers:{
            'Content-Type': 'application/json'
          }})
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
            if (json[i].hasOwnProperty('givenName'))
                loopData += `<li>${json[i].fullName.en}</li>`
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

    const getUser = async () => {
        const url = "http://127.0.0.1:8000/api/auth/user-profile"
        const token = localStorage.getItem("token");
        const {data: res} = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        localStorage.setItem('user', JSON.stringify(res))
        
    }


    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>MySite</h1>
                    <button className='btn btn-danger' onClick={handleLogout}>
                        Wyloguj się
                    </button>
                    <button className='btn btn-container' onClick={handleReadJson}>
                        ReadLaureates
                    </button>
                    <button className='btn btn-container' onClick={handleStore}>
                        StoreLaureates
                    </button>
                    <button className='btn btn-container' onClick={handleReadPrizes}>
                        ReadPrizes
                    </button>
                    <button className='btn btn-container' onClick={handeStorePrizes}>
                        StorePrizes
                    </button>
                    <Link to='/user'>
                        <button className='btn btn-container' onClick={getUser}>Profile</button>
                    </Link>

                </nav>
                <div className='content'>
                    <ul dangerouslySetInnerHTML={{__html: dane}}></ul>
                </div>
            </div>
        </Wrapper>
    )
}
export default Main