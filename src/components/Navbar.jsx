import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg";
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg";
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
    // Hooks for navigation and current location
    const navigate = useNavigate();
    const location = useLocation();

    // Function to match current route with given route
    const pathMatchRoute = (route) => {
        if (location.pathname === route)
            return true;
    };

    // Render the navbar
    return (
        <footer className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    {/* Explore option */}
                    <li className='navbarListItem' onClick={() => navigate('/')}>
                        <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                        <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                    </li>

                    {/* Offers option */}
                    <li className='navbarListItem' onClick={() => navigate('/Offers')}>
                        <OfferIcon fill={pathMatchRoute('/Offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                        <p className={pathMatchRoute('/Offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
                    </li>

                    {/* Profile option */}
                    <li className='navbarListItem' onClick={() => navigate('/Profile')}>
                        <PersonOutlineIcon fill={pathMatchRoute('/Profile') ? '#2c2c2c' : '#8f8f8f'} width='36px'
                                           height='36px'/>
                        <p className={pathMatchRoute('/Profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Navbar;
