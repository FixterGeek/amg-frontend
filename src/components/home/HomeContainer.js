
import React, { Component } from 'react';
import "./Home.css";
import ios from "../../assets/40px.png"
import google from "../../assets/40px (1).png"

import NavBar from "../../organisms/NavBar";
import { Link } from "react-router-dom";
import logo1 from "../../assets/Logo_Faes_CVS.png"
import logo2 from "../../assets/Logo Liomont 2017.png"
import logo3 from "../../assets/logo takeda.png"
import logo4 from "../../assets/Gastro Asofarma_logo.png"

import MembershipCards from './reusables/MembershipCards';


import "./Home.css";
import Footer from "./Footer";

class HomeContainer extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <section className="welcome">
          <div className="video-bg">
            <video autoPlay loop name="media" className="desk">
              <source type="video/mp4" src="https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/master.mp4?alt=media&token=5ed271b5-3321-4daa-8a78-99d6497e45d9" />
            </video>
            <video autoPlay loop name="media" className="mobile">
              <source type="video/mp4" src="https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/Dwngrade.mov?alt=media&token=ffea4411-fe87-4c5c-8e34-0aafce39ec30" />
            </video>
          </div>
          <div className="cover">
            <div className="descript">
              <h1>
                GASTR
                <span>O</span>
              </h1>
              <p>
                GASTRO es la plataforma digital de la Asociación Mexicana de
                Gastroenterología.
              </p>
              <Link to="/pre-signup">
                <button className="btn-blue">Quiero ser miembro</button>
              </Link>
            </div>
          </div>
        </section>
        <section className="about">
          <h2 className="titles">Asociación Mexicana de Gastroenterología</h2>
          <div className="about-box">
            <div className="people" />
            <div className="info text">
              <p>
                Fundada en 1935, se caracteriza por la integración de grupos
                multidisciplinarios que comparten y suman sus habilidades y
                esfuerzos para enriquecer y mejorar la práctica de la
                Gastroenterología en México.
              </p>
              <p>
                Es una institución sin fines de lucro que congrega a los
                profesionales interesados en el estudio del aparato digestivo,
                su función y las enfermedades que lo afectan, y promueve la
                educación continua, la investigación y la difusión de esta
                especialidad
              </p>
              <p>
                Con fin de servir mejor a sus miembros, la Asociación Mexicana
                de Gastroenterología ha creado GASTRO, una plataforma que
                contiene recursos digitales como la Revista de la Asociación
                Mexicana de Gastroenterología, Guías y Consensos así como los
                eventos de la asociación como la Semana Nacional de
                Gastroenterología.{" "}
              </p>
            </div>
          </div>
        </section>
        <section className="membership">
          <div className="mm">
            <h2 className="titles">Membresías</h2>
            <MembershipCards />
          </div>
        </section>
          <section className="download">
            <h2 className="titles">¡Donde sea y cuando sea!</h2>

            <div className="bx-app">

              <div className="app-down">

                    <p>Disfruta de los beneficios que ofrece la membresía y lleva
                        toda la AMG donde quiera que estes. Disponible para iOs
                        y Android</p>
                    <div className="tiendas">
                      <a href="https://play.google.com/store/apps/details?id=mx.com.gastro.app" target="_blank">
                        <img src={google} alt=""/>
                      </a>
                      <a href="https://apps.apple.com/us/app/gastro/id1477130303?l=es&ls=1" target="_blank">
                        <img src={ios} alt=""/>
                      </a>
                    </div>
                </div>
                <div className="phone"/>
            </div>
            <h2 className="titles">Nuestros Patrocinadores</h2>
            <div className="partners">
              <a href="https://faesfarma.com" alt="FAES Farma">
                <img src={logo1} alt="logo-faes-farma"/>
              </a>
              <a href="https://liomont.com.mx/?lang=en" alt="Liomont">
                <img src={logo2} alt="logo-liomont"/>
              </a>
              <a href="https://www.takeda.com" alt="Takeada">
                <img src={logo3} alt="logo-takeda"/>
              </a>
              <a href="http://www.asofarma.com.mx" alt="Gastro asofarma">
                <img src={logo4} alt="logo-gastro-asofarma"/>
              </a>
            </div>
          </section>
        <Footer/>
    </div>


    );
  }
}

export default HomeContainer;
