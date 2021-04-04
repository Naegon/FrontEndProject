import React from "react";
import "../css/navbar.css"
import BurgerButton from "./BurgerButton";


const Navbar = () => {

    const onCLickLinkNavbar = () => {
        let navbar = document.getElementById("e-navbar");
        if(window.innerWidth < 736){
            let burger = document.getElementById("e-btn__burger");
            burger.classList.toggle("is-active")
            navbar.classList.add("invisible")
        }
        else{
            navbar.classList.remove("invisible")
        }
    };
    return (
        <header className="c-header" id="c-header">
            <nav className="e-navbar" id="e-navbar">
                <a href="#mainpage" className="e-navbarlink" onClick={() => onCLickLinkNavbar()}>Latest Races</a>
                <a href="#scoreboard" className="e-navbarlink" onClick={() => onCLickLinkNavbar()}>Classment of the year</a>
                <a href="#compare" className="e-navbarlink" onClick={() => onCLickLinkNavbar()}>Compare Drivers</a>
            </nav>
            <BurgerButton id="e-btn__burger" type={"slider"} />
        </header>
    );
};


export default Navbar;
