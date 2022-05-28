import React, {useContext} from 'react';
import Wrapper from "../wrapper/PageBtnContainer";
import {AppContext} from "../AppContext";

const Main = () => {
    const {dane} = useContext(AppContext)

    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>MySite</h1>
                </nav>
                <div className='content'>
                    <ul dangerouslySetInnerHTML={{__html: dane}}></ul>
                </div>
            </div>
        </Wrapper>
    )
}
export default Main