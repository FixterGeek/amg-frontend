import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo-gastro.svg"

function NavBar() {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
            <div>
                <Link to="/biblioteca">
                    <p>Biblioteca</p>
                </Link>
                <Link to="/sesion-mensual">
                    <p>Sesión Mensual</p>
                </Link>
                <Link to="/nosotros">
                    <p>Nosotros</p>
                </Link>
                <Link to="/contacto">
                    <p>Contacto</p>
                </Link>
                <Link
                    to="/login"

                    style={{ color: 'white', fontSize: '1.2em' }}>
                    <div className="btn-log"><p>Iniciar sesión</p></div>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
