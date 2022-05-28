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
    const {dane, handleReadJson,handleStore,handleReadPrizes,handeStorePrizes,handleLogout} = useContext(AppContext)

    return (<NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
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
                    <NavbarLink to='/user'>
                        Profile
                    </NavbarLink>
                    <button className='btn btn-danger' onClick={handleLogout}>
                        Wyloguj się
                    </button>
                </RightContainer>
            </NavbarInnerContainer>
            {extendNavbar && (
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
            )}
        </NavbarContainer>
    );
}

export default Navbar;