import React  from 'react';
import { Link } from 'react-router-dom';

import NavBar from "../../organisms/NavBar";
import imgPonentes from "../../assets/semana-ponentes.png";
import semanaCursos from "../../assets/semana-cursos.png";
import semanaPrograma from "../../assets/semana-programa.jpg";
import Footer from "./Footer";


function SemanaNacional() {
    return (
        <section className="app">
            <NavBar />
            <section className="semana">
                <div className="cover">
                    <div className="descript">
                        <h1 style={{ marginBottom: '0px' }}>
                          Semana
                        </h1>
                        <h1>
                          Naciona
                          <span>l</span>
                        </h1>
                        <div className="subtitle">
                            Inscríbete al congreso más grande de México que reune a expertos de Gastroenterología en Cancún el próximo 6 de noviembre 
                          </div>
                          <div>
                            <Link to="/pre-signup">
                              <button className="semana-btn">
                                Inscribirme
                              </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-text">
                    <h2 className="titles">Programa</h2>
                    <p>Ten acceso al programa con cientos de ponentes que participarán en el
                      próximo evento de Semana Nacional el 6 de noviembre en Cancún, Quintana Roo. 
                    </p>
                    <p>
                    Nos acompañarán más de cien expositores nacionales y extranjeros
                    especialistas en gastroenterología. 
                    </p>
                    <Link to="/pre-signup">
                      <button className="btn-blue-dark">Ver Programa</button>
                    </Link>
                </div>
                <div className="biblioteca-img">
                    <img style={{ width: '219px' }} src={semanaPrograma} alt="Programa"/>
                </div>
            </section>

            <section className="biblioteca-box grey">
                <div className="biblioteca-text">
                    <h2 className="titles">Ponentes</h2>
                    <p>
                      Gracias a la nueva plataforma de la Asociación Mexicana de Gastroenterología,
                      ahora puedes consultar los ponentes del evento de manera digital. 
                    </p>
                    <Link to="/pre-signup">
                      <button className="btn-blue-dark">Ver Ponentes</button>
                    </Link>
                </div>
                <div className="biblioteca-img">
                    <img style={{width:"335px"}} src={imgPonentes} alt="Ponentes"/>
                </div>
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-text">
                    <h2 className="titles">Cursos</h2>
                    <p>
                      Inscríbete a cursos pre y trascongreso. Tenemos una variedad
                      de cursos que pueden interesarte.  
                    </p>
                    <Link to="/pre-signup">
                      <button className="btn-blue-dark">Ver Cursos</button>
                    </Link>
                </div>
                <div className="biblioteca-img">
                    <img style={{ width: '232px' }} src={semanaCursos} alt="Cursos"/>
                </div>
            </section>
            <Footer/>

        </section>
    );
}

export default SemanaNacional;