'use strict';

function expandMenu() {
  const menuNav = document.getElementById('menu_nav');
  if (menuNav.className === 'menu_nav') {
    menuNav.className += 'menu_nav__expanded';
  } else {
    menuNav.className = 'menu_nav';
  }
}

function expandUserMenu() {
  const userMenu = document.getElementById('userMenu');
  if (userMenu.className === 'menu_nav__profile_menu') {
    userMenu.className += ' menu_nav__profile_menu--expanded'
  } else {
    userMenu.className = 'menu_nav__profile_menu';
  }
}

