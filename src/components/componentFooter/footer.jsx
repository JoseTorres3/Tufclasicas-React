import React from "react";
import '../styles/App.css'
import descarga2 from '../img/descarga2.png'


export default function Footer() {
    return (
        <footer className="footer">
      <p>Ubicación: Aranjuez - Álamos</p>
      <p>Contáctanos: 314xxxxxxx</p>
      <p>Email: tuclasicastore@gmail.com</p>
      <img src={descarga2} alt="Facebook" />
    </footer>

    )
}