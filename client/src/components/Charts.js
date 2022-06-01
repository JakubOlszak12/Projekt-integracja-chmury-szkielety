import React, {useContext, useState} from 'react';
import Wrapper from "../wrapper/MainPageContainer";
import {useAppContext} from "../AppContext";

const Charts = () => {

    const {jsonChartsData} = useAppContext()

    return (
        <Wrapper>
            <div>
                <nav>
                    <h1>MySite</h1>
                </nav>
                <div className='content'>
                    Male {console.log(jsonChartsData)}

                </div>
            </div>
        </Wrapper>
    )
}


export default Charts