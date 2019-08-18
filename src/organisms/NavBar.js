import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo-gastro.svg"
import menu from "../assets/bars-solid.png"

function NavBar() {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
            <div className="web">
                <Link to="/biblioteca">
                    <p>Biblioteca</p>
                    <hr className="blue"/>
                </Link>
                <Link to="/sesion-mensual">
                    <p>Sesión Mensual</p>
                    <hr className="blue"/>
                </Link>
                <Link to="/nosotros">
                    <p>Nosotros</p>
                    <hr className="blue"/>
                </Link>
                <Link to="/contacto">
                    <p>Contacto</p>
                    <hr className="blue"/>
                </Link>
                <Link
                    to="/login"

                    style={{ color: 'white', fontSize: '1.2em' }}>
                    <div className="btn-log"><p>Iniciar sesión</p></div>
                </Link>
            </div>
            <div className="mobile">
                <img className="bars" src={menu} alt="bar-icon"/>


            </div>
        </div>
    );
}

export default NavBar;
