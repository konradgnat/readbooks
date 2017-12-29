'use strict';

function expandMenu() {
    var x = document.getElementById("menu_nav");
    if (x.className === "menu_nav") {
        x.className += " menu_nav__expanded";
    } else {
        x.className = "menu_nav";
    }
}