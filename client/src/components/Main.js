import React, {useContext,useState, useEffect} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {AppContext} from "../AppContext";
import TablePage from "./TablePage";


const Main = () => {
    const {dane,handleReadJson,handleReadPrizesFromDatabase} = useContext(AppContext)
    const [buttonState, setButton] = useState(true)
    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>Welcome!!</h1>
                </nav>
                    
            </div>
        </Wrapper>
    )
}
export default Main