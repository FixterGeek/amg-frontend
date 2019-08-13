
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


import "./Home.css";

class HomeContainer extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <section className="welcome">
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
              <Link to="/signup">
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
            <div className="member-box">
              <div className="card">
                <div>
                  <p className="tx1">No socio</p>
                  <h3 className="tx2">Gratis</h3>
                  <span style={{ color: "white" }}>.</span>
                  <br />
                  <span style={{ color: "white" }}>.</span>
                  <hr />
                  <div className="tx5">
                    <p>&bull; Vista previa de revista</p>
                    <p>&bull; Vista previa de eventos</p>
                  </div>
                </div>
                <div>
                  <Link to="/signup">
                    <button className="btn-dark-blue">
                      Quiero ser miembro
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div>
                  <p className="tx1">Socio</p>
                  <h3 className="tx2">$4,750</h3>
                  <span className="tx3">MXN</span>
                  <br />
                  <span className="tx4">anual</span>
                  <hr />
                  <div className="tx5">
                    <p>&bull; Consulta completa de revista </p>
                    <p>&bull; Inscripción a eventos sin costo</p>
                    <p>&bull; Acceso a transmisiones de sesiones en vivo </p>
                    <p>&bull; Descarga constancias de participacón</p>
                  </div>
                </div>

                <div>
                  <Link to="/signup">
                    <button className="btn-dark-blue">
                      Quiero ser miembro
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div>
                  <p className="tx1">Residente</p>
                  <h3 className="tx2">$625</h3>
                  <span className="tx3">MXN</span>
                  <br />
                  <span className="tx4">anual</span>
                  <hr />

                  <div className="tx5">
                    <p>&bull; Consulta completa de revista </p>
                    <p>&bull; Acceso total a calendario de eventos</p>
                    <p>&bull; Inscripción a eventos con costo adicional </p>
                    <p>&bull; Acceso a guías y consensos</p>
                  </div>
                </div>
                <div>
                  <Link to="/signup">
                    <button className="btn-dark-blue">
                      Quiero ser miembro
                    </button>
                  </Link>
                </div>
              </div>
            </div>
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
                        <img src={google} alt=""/>
                        <img src={ios} alt=""/>
                    </div>
                </div>
                <div className="phone"/>
            </div>
            <h2 className="titles">Nuestros Patrocinadores</h2>
            <div className="partners">
              <img src={logo1} alt="logo-faes-farma"/>
              <img src={logo2} alt="logo-liomont"/>
              <img src={logo3} alt="logo-takeda"/>
              <img src={logo4} alt="logo-gastro-asofarma"/>
            </div>
          </section>

    </div>


    );
  }
}

export default HomeContainer;
