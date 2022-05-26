import styles from "../index.css"
import React, {useEffect,useState} from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
const Main = () => {
    const [dane,ustawDane] = useState('')
    const [userData, setData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        birth_date: "",
        country: "",
        wikipedia_address: "",
    })
    
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
            setData(res);
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
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się</button>
                    <button className={styles.white_btn} onClick={handleReadJson}>
                    ReadLaureates</button>
                    <button className={styles.white_btn} onClick={handleStore}>
                    StoreLaureates</button>
                    <button className={styles.white_btn} onClick={handleReadPrizes}>
                    ReadPrizes</button>
                    <button className={styles.white_btn} onClick={handeStorePrizes}>
                    StorePrizes</button>
                    
            </nav>
            <div>
            <ul dangerouslySetInnerHTML={{__html: dane}}></ul>
               
            </div>
        </div>
    )
}
export default Main