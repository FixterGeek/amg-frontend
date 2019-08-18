import React  from 'react';
import NavBar from "../../organisms/NavBar";
import "./Home.css"
import CardGuia from "./CardGuia";
import guia1 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.33.16.png"
import guia2 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.33.32.png"
import guia3 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.33.46.png"
import guia4 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.33.57.png"
import guia5 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.05.png"
import guia6 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.12.png"
import guia7 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.25.png"
import guia8 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.32.png"
import guia9 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.39.png"
import guia10 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.45.png"
import guia11 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.52.png"
import guia12 from "../../assets/guias/Captura de pantalla 2019-08-17 a la(s) 22.34.59.png"
import pdf1 from "../../assets/guias/cáncer-gástrico-Diagnóstico.pdf"
import pdf2 from "../../assets/guias/cáncer-gástrico-Tratamiento.pdf"
import pdf3 from "../../assets/guias/diarrea-crónica-y-situaciones-especiales.pdf"
import pdf4 from "../../assets/guias/diarrea-crónica.-Diagnóstico.pdf"
import pdf5 from "../../assets/guias/diarrea-crónica.-Epidemiologia-etiología-y-clasificación-1.pdf"
import pdf6 from "../../assets/guias/Generalidades.pdf"
import pdf7 from "../../assets/guias/Guia_Enfermedad_Celiaca_Rev_No4_2018.pdf"
import pdf8 from "../../assets/guias/guia-ERGE-17-Bernal.pdf"
import pdf9 from "../../assets/guias/guia-ERGE-18-Tamayo.pdf"
import pdf10 from "../../assets/guias/guia-ERGE-19-Huerta.pdf"
import pdf11 from "../../assets/guias/guia-ERGE-20-Angelica.pdf"
import pdf12 from "../../assets/guias/guia-Hepatitis-21-Cisneros.pdf"

import Footer from "./Footer";
import {Pagination} from "antd";

function Guias() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <h2 className="title-black">Guías y consensos</h2>
                <div className="multi-guias">
                    <a href={pdf1} target="_blank">
                        <CardGuia name="Guía Clínica para diagnóstico y tratamiento del cáncer gástrico. Diagnóstico." image={guia1}
                                  author="A. de la Torre-Bravo, L.F Oñate-Ocaña, Revista de Gastroenterología de México 2010. Páginas 243-246."/>
                    </a>
                    <a href={pdf1} target="_blank">
                        <CardGuia name="Guía Clínica para diagnóstico y tratamiento del cáncer gástrico. Tratamiento." image={guia1}
                                  author="A. de la Torre-Bravo, L.F Oñate-Ocaña, J.J. Poot-Braga, V. Flores Wilberth, &&, Revista de Gastroenterología de México 2010. Páginas 243-246."/>
                    </a>
                    <a  href={pdf2} target="_blank">
                        <CardGuia name="Guía de diagnóstico y tratamiento de la diarrea crónica. Manejo del enfermo con diarrea crónica y situaciones especiales" image={guia2}
                                  author="J.M. Remes-Troche, G.A. Sagols-Méndez, M.A.Trujeque-Franco, Revista de Gastroenterología de México 2010. Páginas 226-230."/>
                    </a>
                    <a  href={pdf3} target="_blank">
                        <CardGuia
                            name="Guía de diagnóstico y tratamiento de la diarrea crónica. Diagnóstico"
                            image={guia3}
                            author="J.M. Remes-Troche, L.F. Uscanga-Domínguez, M.E. Icaza-Chávez, J.R. Nogueira-de Rojas 2010, vol. 75. Páginas 226-230"/>
                    </a>
                    <a  href={pdf4} target="_blank">
                        <CardGuia
                        name="Guía de diagnóstico y tratamiento de la diarrea crónica. Epidemiologia, etiología y clasificación"
                        image={guia4}
                        author="J.M. Remes-Troche, O. Goméz-Escudero, M.V. Bielsa-Fernández, J. Garrido-Palma, T. Méndez Gutiérrez, I. Vázquez-Ávila, vol. 75. Páginas 223-225"/>
                    </a>
                    <a  href={pdf5} target="_blank">
                        <CardGuia
                        name="Guías Clínicas de dianóstico y tratamiento de enfermedad por reflujo gastroesofágico"
                        image={guia5}
                        author="J. Pérez-Manauta, M.A. Sedio-Santillana, M. Antonio-Manrique, J.M. Valdéz-López, E. Pérez-Torres . Páginas 223-225"/>
                    </a>
                    <a  href={pdf6} target="_blank">
                        <CardGuia
                        name="Guía de diagnóstico y tratamiento de la enfermedad celíaca en México"
                        image={guia6}
                        author="J.M. Remes-Troche, &&  Páginas 234-250"/>
                    </a>
                    <a  href={pdf7} target="_blank">
                        <CardGuia
                        name="Guías clínias de dianóstico y tratamiento de enfermedad por reflujo gastroesofágico. Dianóstico."
                        image={guia7}
                        author="R. Bernal-Reyes, A. de la Torre-Bravo, J.C. Ahumada-Tarín, &&. Guías de Dianóstico y Tratamiento en Gastroenterología."/>
                    </a>
                    <a  href={pdf8} target="_blank">
                        <CardGuia
                            name="Guías clínias de dianóstico y tratamiento de enfermedad por reflujo gastroesofágico. Tratamiento médico I."
                            image={guia8}
                            author="J.L. Tamayo-de la Cuesta, P. Brito-Lugo, E. Javier-Fernández, &&. Guías de Dianóstico y Tratamiento en Gastroenterología."/>
                    </a>
                    <a  href={pdf9} target="_blank">
                        <CardGuia
                            name="Guías clínias de dianóstico y tratamiento de enfermedad por reflujo gastroesofágico. Tratamiento médico II."
                            image={guia9}
                            author="F. Huerta-Iga, J.A. Villareal-Reta, G. Villareal-García, &&. Guías de Dianóstico y Tratamiento en Gastroenterología."/>
                    </a>
                    <a  href={pdf10} target="_blank">
                        <CardGuia
                            name="Guías clínias de dianóstico y tratamiento de enfermedad por reflujo gastroesofágico por reflujo gastroesofágico. Tratamiento quirúrgico."
                            image={guia10}
                            author="A. Hernández-Guerrero, J. Murray-Nungaray, F. Escobar-Martínez, &&, Guías de Dianóstico y Tratamiento en Gastroenterología."/>
                    </a>
                    <a  href={pdf11} target="_blank">
                        <CardGuia
                            name="Guías Clinicas de Diagnóstico y tratamiento de hepatitis C"
                            image={guia10}
                            author="L.E. Cisneros Garza, M. Avedano Reyes, J.F. Cortés Ramírez, G.R. Aceves-Tavares, Guías de Dianóstico y Tratamiento en Gastroenterología."/>
                    </a>
                    <Pagination defaultCurrent={1} total={1} />


                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default Guias;