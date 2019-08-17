import React  from 'react';
import NavBar from "../../organisms/NavBar";
import log from "../../assets/log.svg"
import abraham from "../../assets/abraham.svg";
import estatutos from "../../assets/estatutos.png";
import historia from "../../assets/historia_amg.pdf"
import Footer from "./Footer";

function Nosotros() {
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
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-img left">
                    <img id="logo-amg" src={log} alt="bitmap"/>
                </div>
                <div className="biblioteca-text" >
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

                        <button className="btn-blue-dark">Ver estatutos</button>

                </div>
                <div className="biblioteca-img">
                    <img src={estatutos} alt="bitmap"/>
                </div>
            </section>
            <Footer/>

        </section>
    );
}

export default Nosotros;