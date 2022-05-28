import React, {useContext} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {AppContext} from "../AppContext";
import TablePage from "./TablePage";


const Main = () => {
    const {dane} = useContext(AppContext)

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
export default Main