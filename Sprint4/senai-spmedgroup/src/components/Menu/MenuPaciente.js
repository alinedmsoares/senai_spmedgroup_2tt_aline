import React from 'react'
import logoMenu from "../../assets/img/icon.png"
import "../../assets/css/menu.css"

function Menu() {
    
    return (
        <div>
            <div className="nav-side-menu">
                <div className="menu--logo">
            <img src={logoMenu} className="menu--logo__img"/>
                </div>
                </div>
        </div>


    );
}

export default Menu;