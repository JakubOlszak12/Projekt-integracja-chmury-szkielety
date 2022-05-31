import React, {useContext,useState, useEffect} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {AppContext} from "../AppContext";
import TablePage from "./TablePage";


const Laureates = () => {
    const {dane} = useContext(AppContext)
    const [buttonState, setButton] = useState(true)
    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>MySite</h1>
                </nav>
                <div className='content'>
                    <TablePage />
                </div>
            </div>
        </Wrapper>
    )
}
export default Laureates