import React, { useState } from 'react';
import * as Scroll from 'react-scroll';
const { Link } = Scroll;
import Cart from '../img/cart.png';
import Logo from '../img/logo.png';
import '../styles/Nav.css';



export default function Nav() {
    return (
        <>
            <header className="navbar">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <nav className="menu">
                    <Link to='inicio' spy={true} smooth={false} duration={350} offset={-90}> Inicio </Link>
                    <a>|</a>
                    <Link to='productos' spy={true} smooth={false} duration={350} offset={-90}> Productos </Link>
                    <a>|</a>
                    <Link to='sugerencias' spy={true} smooth={false} duration={350} offset={0}> Sugerencias </Link>
                    <a>|</a>
                    <Link to='panel' spy={true} smooth={false} duration={350} offset={-80}> Panel Admin </Link>
                    <a>|</a>
                    <Link to='products' spy={true} smooth={false} duration={350} offset={-80}> Proyecto Yoimer </Link>
                </nav>
                <div className="cart">
                    {/* <img src={Cart} alt="Carrito" /> (0) */}
                </div>
            </header>
        </>
    )
}