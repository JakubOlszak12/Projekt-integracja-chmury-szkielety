import React, {useContext,useState} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {AppContext} from "../AppContext";
import TablePage from "./TablePage";


const Laureates = () => {
    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>Information on Nobel Prize Winners</h1>
                </nav>
                <div className='content'>
                    <TablePage />
                </div>
            </div>
        </Wrapper>
    )
}
export default Laureates