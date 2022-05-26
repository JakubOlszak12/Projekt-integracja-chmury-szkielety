import React, {useEffect,useState} from 'react';
import axios from 'axios'
import Wrapper from "../wrapper/PageBtnContainer";

const Main = () => {
    const [dane,ustawDane] = useState('')

    
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    
    const handleReadJson = async (e) => {
            const url = "http://localhost:8000/api/auth/laureates"
            const { data: res } = await  axios.get(url)
            var json = res['laureates'];
            console.log(json);
            var loopData = ''
            var i;
            for(i=0; i<json.length; i++){
                if(json[i].hasOwnProperty('givenName'))
                loopData += `<li>${json[i].fullName.en}</li>`
            }
            ustawDane(loopData)
           
}

    const handleStore = async (e) => {
        const url = "http://localhost:8000/api/auth/jsonToDatabase"
        const { data: res } = await  axios.post(url)
        console.log(res);
    }

    const handleReadPrizes = async (e) => {
        const url = "http://localhost:8000/api/auth/prizes"
        const { data: res } = await  axios.get(url)
        const json = res['nobelPrizes']
        console.log(json);
    }

    const handeStorePrizes = async (e) => {
        const url = "http://localhost:8000/api/auth/prizesToDatabase"
        const { data: res } = await  axios.post(url)
        console.log(res);
    }

    return (
        <Wrapper>
        <div>
            <nav >
                <h1>MySite</h1>
                <button className='btn btn-danger' onClick={handleLogout}>
                    Wyloguj się</button>
                <button className='btn btn-container' onClick={handleReadJson}>
                    ReadLaureates</button>
                <button className='btn btn-container' onClick={handleStore}>
                    StoreLaureates</button>
                <button className='btn btn-container' onClick={handleReadPrizes}>
                    ReadPrizes</button>
                <button className='btn btn-container' onClick={handeStorePrizes}>
                    StorePrizes</button>
            </nav>
            <div>
                <ul dangerouslySetInnerHTML={{__html: dane}}></ul>
            </div>
        </div>
        </Wrapper>
    )
}
export default Main