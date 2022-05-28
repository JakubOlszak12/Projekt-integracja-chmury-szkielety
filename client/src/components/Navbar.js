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
    const {dane, handleReadJson, handleStore, handleReadPrizes, handeStorePrizes, handleLogout} = useContext(AppContext)

    return (<NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/">
                            <button className='btn btn-container' onClick={handleReadJson}>
                                ReadLaureates
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/">
                            <button className='btn btn-container' onClick={handleStore}>
                                StoreLaureates
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/">
                            <button className='btn btn-container' onClick={handleReadPrizes}>
                                ReadPrizes
                            </button>
                        </NavbarLink>
                        <NavbarLink to="/">
                            <button className='btn btn-container' onClick={handeStorePrizes}>
                                StorePrizes
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
                        <NavbarLink to='/user'>
                            <button className='btn btn-info' onClick={handleLogout}>
                                Profile
                            </button>
                        </NavbarLink>
                        <button className='btn btn-danger' onClick={handleLogout}>
                            Wyloguj się
                        </button>
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
            {
                extendNavbar && (
                    <NavbarExtendedContainer>
                        <button className='btn btn-container' onClick={handleReadJson}>
                            ReadLaureates
                        </button>
                        <button className='btn btn-container' onClick={handleStore}>
                            StoreLaureates
                        </button>
                        <button className='btn btn-container' onClick={handleReadPrizes}>
                            ReadPrizes
                        </button>
                        <button className='btn btn-container' onClick={handeStorePrizes}>
                            StorePrizes
                        </button>
                    </NavbarExtendedContainer>
                )
            }
        </NavbarContainer>
    )
        ;
}

export default Navbar;