import React, {useContext,useState} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import TablePage from "./TablePagePrizes";


const Prizes = () => {
  
    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>Information about Nobel Prizes</h1>
                </nav>
                <div className='content'>
                    <TablePage/>
                </div>
            </div>
        </Wrapper>
    )
}
export default Prizes