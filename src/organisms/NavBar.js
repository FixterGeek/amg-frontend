import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import log from '../assets/log.png';
import menu from "../assets/bars-solid.png"

function NavBar() {
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt="" style={{ marginTop: '8px', maxHeight: '50px' }} className="main-logo-desk" />
            </Link>
            <div className="web">
                {/* <Link to="/semana-nacional">
                    <p>Semana Nacional</p>
                    <hr className="blue-line"/>
                </Link> */}
                <Link to="/biblioteca">
                    <p>Biblioteca</p>
                    <hr className="blue-line"/>
                </Link>
                <Link to="/sesion-mensual">
                    <p>Sesión Mensual</p>
                    <hr className="blue-line"/>
                </Link>
                <Link to="/nosotros">
                    <p>Nosotros</p>
                    <hr className="blue-line"/>
                </Link>
                <Link to="/contacto">
                    <p>Contacto</p>
                    <hr className="blue-line"/>
                </Link>
                <Link
                    to="/login"

                    style={{ color: 'white', fontSize: '1.2em' }}>
                    <div className="btn-log"><p>Iniciar sesión</p></div>
                </Link>
            </div>
            <div className="movil dropdown">
                <img className="bars" src={menu} alt="bar-icon"/>
                <div className="dropdown-content">
                    <Link to="/semana-nacional">
                        <p>Semana Nacional</p>
                        <hr className="blue-line"/>
                    </Link>
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
                    <Link to="/login">
                        <p className="linea">Iniciar sesión</p>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default NavBar;
