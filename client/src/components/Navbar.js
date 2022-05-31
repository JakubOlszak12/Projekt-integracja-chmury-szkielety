import React, {useContext, useState} from "react";
import {
    NavbarContainer,
    LeftContainer,
    RightContainer,
    NavbarExtendedContainer,
    NavbarInnerContainer,
    NavbarLinkContainer,
    NavbarLink,
    OpenLinksButton,
    NavbarLinkExtended,
} from "../wrapper/Navbar.style";
import axios from "axios";
import {AppContext} from "../AppContext";

const Navbar = () => {
    const [extendNavbar, setExtendNavbar] = useState(false);
    const {dane, handleReadJson, handleReadPrizes, handleLogout,handleReadPrizesFromDatabase,handleReadChartDataFromDB} = useContext(AppContext)

    return (<NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/laureates">
                            <button className='btn btn-container' onClick={handleReadJson}>
                                Nobel Laureates
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/prizes">
                            <button className='btn btn-container' onClick={handleReadPrizesFromDatabase}>
                                Nobel Prizes
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/charts">
                            <button className='btn btn-container' onClick={handleReadChartDataFromDB}>
                                Charts
                            </button>
                        </NavbarLink>
                        <NavbarLink to='/user'>
                            <button className='btn btn-info'>
                                Profile
                            </button>
                        </NavbarLink>
                        <OpenLinksButton
                            onClick={() => {
                                setExtendNavbar((curr) => !curr);
                            }}
                        >
                            {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
                        </OpenLinksButton>
                    </NavbarLinkContainer>
                </LeftContainer>
                <RightContainer>
                    <NavbarLinkContainer>
                        
                        <NavbarLink to='/'>
                        <button className='btn btn-danger' onClick={handleLogout}>
                            Wyloguj się
                        </button>
                        </NavbarLink>
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
            {
                extendNavbar && (
                    <NavbarExtendedContainer>
                        <button className='btn btn-container' onClick={handleReadJson}>
                            ReadLaureates
                        </button>
                 
                        <button className='btn btn-container' onClick={handleReadPrizes}>
                            ReadPrizes
                        </button>
                    
                        <button className='btn btn-info' onClick={handleLogout}>
                            Profile
                        </button>
                    </NavbarExtendedContainer>
                )
            }
        </NavbarContainer>
    )
        ;
}

export default Navbar;