import React from "react";
import "../css/burgerbutton.css"

const BurgerButton = ({id}) => {
    let onClickBurger = () => {/*onclick of the burger button disable the burger icon and element title of teh navbar*/
        let burger = document.getElementById(id);
        burger.classList.toggle("is-active");

        let navbar = document.getElementById("e-navbar");
        navbar.classList.toggle("invisible");
    };

    return (
        <button id={id} className={"hamburger hamburger--slider is-active"} type="button" onClick={() => onClickBurger()}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
        </button>
    );
};


export default BurgerButton;
