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
<<<<<<< HEAD
    const {dane, handleReadJson, handleReadPrizes, handleLogout,handleReadPrizesFromDatabase,handleReadChartDataFromDB} = useContext(AppContext)
=======
    const {dane, handleReadJson, handleReadPrizes, handleLogout,handleReadPrizesFromDatabase,handleDownloadXml,handleDownloadJson} = useContext(AppContext)
>>>>>>> f85d4e49ed2b3de6ab673cedda639c6343a5a3ad

    return (<NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/laureates">
<<<<<<< HEAD
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
=======
                            <button className='btn btn-container'>
                                ReadLaureates
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/prizes">
                            <button className='btn btn-container'>
                                ReadPrizes
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/prizes">
                        <button className='btn btn-container' onClick={handleDownloadXml}>
                           prizes to XML
                        </button>
                        </NavbarLink>
                        <NavbarLink to="/laureates">
                        <button className='btn btn-container' onClick={handleDownloadJson}>
                            laureates to JSON
                        </button>
                        </NavbarLink>
                        
>>>>>>> f85d4e49ed2b3de6ab673cedda639c6343a5a3ad
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
                        
                        <NavbarLink to='/login'>
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
                        <button className='btn btn-container'>
                            ReadLaureates
                        </button>
                 
                        <button className='btn btn-container'>
                            ReadPrizes
                        </button>
                        <button className='btn btn-container' onClick={handleDownloadXml}>
                            Export to XML
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