import React  from 'react';
import NavBar from "../../organisms/NavBar";
import bitmap from "../../assets/Bitmap.png"
import guias from "../../assets/guiasimg.png"
import publi from "../../assets/publi.svg"
import {Link} from "react-router-dom"
import Footer from "./Footer";

function Biblioteca() {
    return (
        <section className="app">
        <NavBar />
        <section className="biblioteca">
        <div className="cover">
        <div className="descript">
        <h1>
        BIBLIOTEC
        <span>A</span>
        </h1>
        <p>Accede a la revista, guías y consensos y publicaciones de la Asociación Mexicana de Gastroenterología</p>
    </div>
    </div>
    </section>
    <section className="biblioteca-box">
        <div className="biblioteca-text">
        <h2 className="titles">Revista</h2>
        <p>La revista de nuestra Asociación se empezó a editar tan sólo dos meses después de su fundación y apareció antes que la revista Gastroenterology que, aunque había tenido otras revistas predecesoras, se empezó a editar como tal en enero de 1943.</p>
    <p>A partir del segundo número nuestra revista se editó ya con el nombre de Revista de Gastro-Enterología de México. El Director y Fundador fue el Dr. Abraham Ayala González y el Gerente el Dr. Alberto Cancino C. Se publicaba bimestralmente y su costo anual de suscripción era de $5.00 M. N., $2.50 dólares para el extranjero y $2.50 M. N. para los estudiantes.</p>
    <p>Hoy en día la Revista de Gastro-Enterología se publica por medio de Elsevier, una plataforma digital pionera en publicaciones médicas y es una de las revistas digitales más consultadas por especialistas en México.
    </p>
            <a href="http://www.revistagastroenterologiamexico.org/?codref=ddh3dk3Yjdsafg503zSInMNxBdsddsa545vs809jdn02nubHHtJufRpNPu3hjd673&py=7jb39db3" target="_blank">
                <button className="btn-blue-dark">Consultar revista</button>
            </a>
    </div>
    <div className="biblioteca-img">
        <img src={bitmap} alt="bitmap"/>
        </div>
        </section>
        <section className="biblioteca-box grey">
        <div className="biblioteca-text">
        <h2 className="titles">Guías y consensos</h2>
    <p>Dentro de las prioridades de la Asociación Mexicana de Gastroenterología se encuentra el ofrecer las guías clínicas y  los consensos. La consulta de las guías clínicas son de gran importancia para la preparación y actualización constante de los gastroenterólogos.  </p>
    <p>Gracias a la nueva plataforma de la Asociación Mexicana de Gastroenterología, ahora puedes consultar de manera digital este material.
    </p>
            <Link to="/guias">
                <button className="btn-blue-dark">Consultar guías</button>
            </Link>
    </div>
    <div className="biblioteca-img">
        <img src={guias} alt="bitmap"/>
        </div>
        </section>
        <section className="biblioteca-box">
        <div className="biblioteca-text">
        <h2 className="titles">Publicaciones</h2>
        <p>Las publicaciones de la Asociación Mexicana de Gastroenterología están dedicadas a la preservación de conocimiento y su difusión. Entre las publicaciones de la Biblioteca Digital de la AMG encontramos la memorias de las Gastro Trilogías y las de la Semana Nacional de Gastroenterología. </p>
    <p>Gracias a esta Biblioteca Digital, es más fácil poner al alcance de los miembros de la AMG publicaciones que ayudan a compartir conocimiento para la mejora de la práctica médica como en los Libros de Especialidad.
    </p>
            <Link to="/publicaciones">
                <button className="btn-blue-dark">Consultar publicaciones</button>
            </Link>
    </div>
    <div className="biblioteca-img">
        <img style={{height:"300px"}} src={publi} alt="bitmap"/>
        </div>
        </section>
            <Footer/>
        </section>
);
}

export default Biblioteca;