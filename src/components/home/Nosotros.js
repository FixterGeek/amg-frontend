import React  from 'react';
import { Link } from 'react-router-dom';

import { List } from 'antd';

import NavBar from "../../organisms/NavBar";
import ScrollIndicator from './reusables/ScrollIndicator';
import log from "../../assets/log.svg"
import abraham from "../../assets/abraham.svg";
import estatutos from "../../assets/estatutos.png";
import historia from "../../assets/historia_amg.pdf"
import Footer from "./Footer";
import statutos from "../../assets/ESTATUTOS-ACTUALIZADOS-11-JULIO-2018.pdf"
import mesas from '../../assets/mesas.jpg'

/* Logos convenios */
import gastroac from '../../assets/gastroac.jpg';
import hepatologia from '../../assets/epatologia.jpg';
import americangastro from '../../assets/americangastro.jpg';
import americanassociation from '../../assets/americanassociation.jpg';
import gastroargentina from '../../assets/gastroargentina.jpg';
import endoscopia from '../../assets/endoscopia.jpg';
import espanola from '../../assets/SociedadEspanola.png';
import especialistas from '../../assets/Colegio.png';
import digestivo from '../../assets/Aparatodigestivo.png';
import AMEG from '../../assets/AMEG.jpg';
import AMCD from '../../assets/AMCD.png';


function Nosotros() {
    const { Item } = List;
    document.title = 'Nosotros | Asociación Mexicana de Gastroenterología';
    return (
        <section className="app">
            <NavBar />
            <section className="ab">
                <div className="cover">
                    <div className="descript">
                        <h1>
                            NOSOTRO
                            <span>S</span>
                        </h1>
                    </div>
                </div>
                <ScrollIndicator />
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-img left">
                    <img id="logo-amg" src={log} alt="bitmap"/>
                </div>
                <div className="biblioteca-text">
                    <h2 className="titles">Misión</h2>
                    <p>
                        La Asociación Mexicana de Gastroenterología es una institución que agrupa a los profesionales interesados en la salud digestiva, que promueve la educación continua, la investigación, y la difusión en esta materia, para fomentar el desarrollo de la comunidad médica y mejorar la salud de la población
                        <br/>
                        La AMG y sus asociados se distinguen por los altos estándares de calidad, profesionalismo, ética y un fuerte compromiso social con la comunidad.
                    </p>
                    <h2 className="titles">Visión</h2>
                    <p>Ser la institución líder y referente en salud digestiva a nivel nacional e internacional.</p>
                    <h2 className="titles">Valores</h2>
                        <p>&bull; Ética a nivel institucional y de cada uno de sus miembros
                        </p>
                        <p>&bull; Calidad en todos los eventos y actividades de la asociación</p>
                        <p>&bull; Fuerte compromiso social con la comunidad</p>
                        <p>&bull; Amistad, unión y colaboración entre sus miembros</p>
                        <p>&bull; Pluralidad y equidad</p>
                        <p>&bull; Amor por la ciencia y la investigación médica en el área</p>
                </div>
            </section>

            <section className="biblioteca-box grey">
                <div className="biblioteca-text">
                    <h2 className="titles">Historia</h2>
                    <p>La Asociación Mexicana de Gastroenterología fue fundada por el Dr. Abraham Ayala González, junto a 17 médicos más el 16 de julio de 1935 en el Hospital General de México </p>
                    <p>Desde su inicio la actividad académica de la Asociación fue muy productiva  y muestra de ello es que  del 17 al 30 de septiembre de 1936 se impartió en el Hospital General el Primer Curso para Graduados. Asimismo, La revista de nuestra Asociación se empezó a editar tan sólo dos meses después de su fundación y apareció antes que la revista Gastroenterology, saliendo a la luz  el primer número de nuestra revista el 15 de septiembre de 1935 con el nombre de Revista de Gastroenterología.
                    </p>
                    <p>En 1949, la Asociación daba a la luz una obra editorial de gran importancia, la revista Hígado y Bazo, Revista Médica Especializada Patrocinada por la Asociación Mexicana de Gastroenterología, por iniciativa del Dr. Norberto Treviño Zapata, la cual dejó de publicarse en 1965.</p>
                    <a href={historia} target="_blank">
                        <button className="btn-blue-dark">Ver historia</button>
                    </a>
                </div>
                <div className="biblioteca-img">
                    <img style={{width:"250px"}} src={abraham} alt="bitmap"/>
                    <p style={{fontStyle:"italic"}}>Dr. Abraham Ayala González</p>
                </div>
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-text">
                    <h2 className="titles">Estatutos</h2>
                    <p>Si quieres conocer todos los detalles de nuestro funcionamiento, sólo tienes
                        que leer los estatutos de los que nos hemos dotado. En ellos encontrarás nuestros
                        objetivos y nuestra forma de organizarnos como asociación.</p>
                    <a href={statutos} target="_blank">
                        <button className="btn-blue-dark">Ver estatutos</button>
                    </a>
                </div>
                <div className="biblioteca-img">
                    <img src={estatutos} alt="bitmap"/>
                </div>
            </section>
            <section className="biblioteca-box grey">
                <div className="biblioteca-text">
                    <h2 className="titles">Convenios</h2>
                    <List itemLayout="horizontal" className="home-nosotros-convenios">
                        <Item>
                            <Item.Meta
                                avatar={<img src={gastroac} />}
                                title="Consejo Mexicano de Gatroenterología, A.C."
                                title={
                                    <a href="https://www.cmgastro.org.mx" target="_blank">
                                        Consejo Mexicano de Gatroenterología, A.C.
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={hepatologia} />}
                                title={
                                    <a href="https://hepatologia.org.mx" target="_blank">
                                        Asociación Mexicana de Hepatología
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={americangastro} />}
                                title={
                                    <a href="https://gi.org" target="_blank">
                                        American College of Gastroenterology
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={americanassociation} />}
                                title={
                                    <a href="https://www.gastro.org" target="_blank">
                                        The American Gastroenterological Association
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={gastroargentina} />}
                                title={
                                    <a href="https://sage.org.ar" target="_blank">
                                        Sociedad Argentina de Gastroenterología
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={endoscopia} />}
                                title={
                                    <a href="http://amce.com.mx/V2/" target="_blank">
                                        Asociación Mexicana de Cirugía Endoscopica, A.C.
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={espanola} />}
                                title={
                                    <a href="https://www.sepd.es/mision_vision.php" target="_blank">
                                        Sociedad Española de Patología Digestiva
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={especialistas} />}
                                title={
                                    <a href="http://colegiomexicanocoloproctologia.org" target="_blank">
                                        Colegio Mexicano de Proctología
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={digestivo} />}
                                title={
                                    <a href="http://www.amcad.mx" target="_blank">
                                        Asociación Mexicana de Cirugía del Aparato Digestivo A.C.
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={AMEG} />}
                                title={
                                    <a href="http://www.amegendoscopia.org.mx" target="_blank">
                                        Asociación Mexicana de Endoscopia Gastrointestinal
                                    </a>
                                }
                            />
                        </Item>
                        <Item>
                            <Item.Meta
                                avatar={<img src={AMCD} />}
                                title={
                                    <a href="https://amcg.org.mx" target="_blank">
                                        Asociación Mexicana de Cirugía General, A. C.
                                    </a>
                                }
                            />
                        </Item>
                    </List>
                </div>
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-text">
                    <h2 className="titles">Mesas directivas</h2>
                    <p>Conoce todos los detalles de nuestras mesas directivas y quiénes ha estado en ellas.</p>
                    <Link to="/mesa-directiva">
                        <button className="btn-blue-dark">Ver mesas directivas</button>
                    </Link>
                </div>
                <div className="biblioteca-img">
                    <img src={mesas} alt="bitmap"/>
                </div>
            </section>
            <Footer/>

        </section>
    );
}

export default Nosotros;