import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <section>
            <div className='nav-container'>
            <nav>
                <div className='logo'>
                    <Link to="/" className='link-logo'><i className="fa-solid fa-microchip logo"></i><p>SUNNY</p></Link>
                </div>
                <div className='icon-container'>
                    <Link to="/login"><i className="fa-solid fa-user"></i></Link>
                    <Link to="/purchases"><i className="fa-solid fa-wallet"></i></Link>
                    <Link to="/carshop"><i className="fa-solid fa-cart-shopping"></i></Link>
                </div>
            </nav>
        </div>
        </section>
    );
};

export default NavBar;