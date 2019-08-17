import React  from 'react';
import NavBar from "../../organisms/NavBar";
import "./Home.css"
import CardGuia from "./CardGuia";
import guia1 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm.png"
import guia2 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (1).png"
import guia3 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (2).png"
import guia4 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (3).png"
import guia5 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (4).png"
import guia6 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (5).png"
import guia7 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (6).png"
import Footer from "./Footer";

function Guias() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <h2 className="title-black">Guías y consensos</h2>
                <div className="multi-guias">
                    <CardGuia name="Guía Clínica para diagnóstico y tratamiento de la enfermedad celíaca en México" image={guia1} author="J.M. Remes-Troche, L.F. Uscanga-Domínguez, R.G. Aceves-Tavares c, A.M. Calderón de la Barca
                    2018, vol. 83. Páginas 434-450"/>
                    <CardGuia name="Guía de diagnóstico y tratamiento de la diarrea crónica. Parte 1. Epidemiologia, etiología y clasificación   " image={guia2} author="J.M. Remes-Troche, O. Gómez Escudero, M.V. Bielsa-Fernández, J. Garrido-Palma
                    2010, vol. 75. Páginas 223-225"/>
                    <CardGuia
                        name="Guía de diagnóstico y tratamiento de la diarrea crónica. Parte 2. Diagnóstico"
                        image={guia3}
                        author="J.M. Remes-Troche, L.F. Uscanga-Domínguez, M.E. Icaza-Chávez, J.R. Nogueira-de Rojas 2010, vol. 75. Páginas 226-230"/>
                    <CardGuia
                        name="Guía de diagnóstico y tratamiento de la diarrea crónica. Parte 3. Manejo del enfermo con diarrea..."
                        image={guia4}
                        author="J.M. Remes-Troche, G.A. Sagols-Méndez, M.A. Trujeque-Franco 2010, vol. 75. Páginas 231-236"/>
                    <CardGuia
                        name="Guía de diagnóstico y tratamiento del cáncer gástrico. Parte 1. Epidemiología, factores de riesgo,..."
                        image={guia5}
                        author="A. De la Torre-Bravo, W. Kettenhofen-Enríquez, F. Roesch-Dietlen, L. Rodríguez-Moguel 2010, vol. 75. Páginas 223-225"/>
                    <CardGuia
                        name="Guía de diagnóstico y tratamiento del cáncer gástrico. Parte 2. Diagnóstico"
                        image={guia6}
                        author="A. De la Torre-Bravo, A. Hernández-Guerrero, L.F. Peniche-Gallareta, J.L. Tamayo-De la Cuesta 2010, vol. 75. Páginas 240-242"/>

                    <CardGuia
                        name="Guía de diagnóstico y tratamiento del cáncer gástrico. Parte 3. Tratamiento"
                        image={guia7}
                        author="A. De la Torre-Bravo, L.F. Oñate-Ocaña, J.J. Poot-Braga, W.N. Victoria-Flores 2010, vol. 75. Páginas 243-246"/>



                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default Guias;