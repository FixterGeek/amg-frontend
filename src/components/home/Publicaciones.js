import React  from 'react';
import NavBar from "../../organisms/NavBar";
import "./Home.css"
import CardGuia from "./CardGuia";
import publi1 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.36.40.png"
import publi2 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.36.51.png"
import publi3 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.02.png"
import publi4 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.10.png"
import publi5 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.20.png"
import publi6 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.28.png"
import publi7 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.36.png"
import publi8 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.43.png"
import publi9 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.50.png"
import publi10 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.37.59.png"
import publi11 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.38.08.png"
import publi12 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.38.18.png"
import publi13 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.38.26.png"
import publi14 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.38.39.png"
import publi15 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.38.50.png"
import publi16 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.39.15.png"
import publi17 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.39.24.png"
import publi18 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.39.33.png"
import publi19 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.39.41.png"
import publi20 from "../../assets/publicaciones/Captura de pantalla 2019-08-17 a la(s) 19.39.50.png"

import book1 from "../../assets/publicaciones/2018-XV-Gastrotrilogia.pdf"
import book2 from "../../assets/publicaciones/flipbookDurango.pdf"
import book3 from "../../assets/publicaciones/GASTRO-FUTURO-LIBRO.pdf"
import book4 from "../../assets/publicaciones/GASTRO-TRILOGIA-I.pdf"
import book5 from "../../assets/publicaciones/GASTRO-TRILOGIA-III-2016.pdf"
import book6 from "../../assets/publicaciones/GASTRO-TRILOGIA-X_2017.pdf"
import book7 from "../../assets/publicaciones/GASTRO-TRILOGIA-XI_2017.pdf"
import book8 from "../../assets/publicaciones/GASTRO-TRILOGIA-XII_2017.pdf"
import book9 from "../../assets/publicaciones/GASTROTRILOGIA-II-2016.pdf"
import book10 from "../../assets/publicaciones/GASTROTRILOGIA-III.pdf"
import book11 from "../../assets/publicaciones/GASTROTRILOGIA-II.pdf"
import book12 from "../../assets/publicaciones/GASTROTRILOGIA-IV.pdf"
import book13 from "../../assets/publicaciones/GASTROTRILOGIA-V.pdf"
import book14 from "../../assets/publicaciones/GASTROTRILOGIA-VI.pdf"
import book15 from "../../assets/publicaciones/libro-sng-2018-01.pdf"
import book16 from "../../assets/publicaciones/libro-sng-2018-02.pdf"
import book17 from "../../assets/publicaciones/libro-sng-2018-03.pdf"
import book18 from "../../assets/publicaciones/libro-sng-2018-04.pdf"
import book19 from "../../assets/publicaciones/libro-sng-2018-05.pdf"
import book20 from "../../assets/publicaciones/libro-sng-2018-06.pdf"
import book21 from "../../assets/publicaciones/GASTROTRILOGIA-I-2016.pdf"
import Footer from "./Footer";
import { Pagination } from 'antd';


function Publicaciones() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <h2 className="title-black">Publicaciones</h2>
                <div className="multi-guias">
                    <a href={book1} target="_blank">
                        <CardGuia name="Controversias en gastroenterología" image={publi1}
                                  author="R.I. Carmona-Sánchez, R. Bernal-Reyes, M. A. Ruiz-Castillo 2018, Gastrotrilogía XV. "/>
                    </a>
                    <a href={book2} target="_blank">
                        <CardGuia name="Abordaje médico, endoscópico y quirúrgico de problemas clínicos comunes" image={publi2}
                              author="R.I. Carmona-Sánchez, H.M. Huerta-Guerrero, J.S. Jacobo-Karam, H. Rodríguez-Hernández 2018, Gastrotrilogía X. "/>
                    </a>
                    <a href={book3} target="_blank">
                              <CardGuia name="La gastroenterología del futuro:Enfoque para una nueva epidemiología" image={publi3}
                                  author="M.V. Bielsa, M. E. Icaza, A. Noble, Gastroenterología. "/>
                    </a>
                    <a href={book4} target="_blank">
                        <CardGuia name="Microbita, nutrición y obesidad" image={publi4}
                                  author="M.A. Valdovinos, E. Gómez, G. Torres, Gastroenterología I.  "/>
                    </a>
                    <a href={book5} target="_blank">
                        <CardGuia name="Oncología del aparato digestivo y estadística médica" image={publi5}
                                  author="M.V. Bielsa, C. Arnaud, J.R. Nogueira, L.F. Uscanga, Gastrotrilogía Episodio III.  "/>
                    </a>
                    <a href={book6} target="_blank">
                        <CardGuia name="Nuevos horizontes en trastornos funcionales gastrointestinales" image={publi6}
                                  author="M. Amieva, E. Coss, A, López, J.M. Remes, X Gastrotrilogía. "/>
                    </a>
                    <a href={book7} target="_blank">
                        <CardGuia name="Los microorganismos en la salud y enfermedad gastrointestinal" image={publi7}
                                  author="A. López-Colombo, M. Morales Arámbula, S.C. Solórzano-Olmos, J.A. Velarde-Ruíz "/>
                    </a>
                    <a href={book8} target="_blank">
                        <CardGuia name="Nuevos avances terapéuticos en gastroenterología" image={publi8}
                                  author="A. López-Colombo, J.A. González-González, M.A. Lira-Pedrín, XII Gastrotrilogía "/>
                    </a>
                    <a href={book21} target="_blank">
                        <CardGuia name="Patología hepatobiliar y pancreática de la A a la Z" image={publi9}
                                  author="L.F. Uscanga-Domínguez, F. Esquivel-Rodríguez, M.V. Bielsa-Fernández, Gastrotrilogía 2016."/>
                    </a>
                    <a href={book9} target="_blank">
                        <CardGuia name="Urgencias en Gastroenterología" image={publi10}
                                  author="R.H. Raña-Garibay, J.L. Tamayo-De la Cuesta, M.V. Bielsa-Fernández, Gastrotrilogía II. "/>
                    </a>
                    <a href={book11} target="_blank">
                        <CardGuia name="Enfermedad por reflujo gastroesofágico y transtornos funcionales digestivos" image={publi11}
                                  author="M.A. Valdovinos-Díaz, O. Gómez Escudero, J.M. Remes-Troche, M.E. Icaza-Chávez, Gastrotrilogía II. "/>
                    </a>
                    <a href={book10} target="_blank">
                        <CardGuia name="Hepatitis y enfermedad inflamatoria intestinal" image={publi12}
                                  author="M.A. Valdovinos-Díaz, F. Bosques-Padilla, M. Ariño-Suárez, Gastrotrilogía III "/>
                    </a>
                    <a href={book12} target="_blank">
                        <CardGuia name="Transtornos funcionales digestivos y enfermedades gastroduodenales" image={publi13}
                                  author="M.A. Valdovinos-Díaz, F. Bosques-Padilla, M. Ariño-Suárez, Gastrotrilogía 2015 "/>
                    </a>
                    <a href={book13} target="_blank">
                        <CardGuia name="Rompiendo Paradigmas en el Dianóstico y Tratamiento de la enfermedad Inflamatoria Intestinal" image={publi14}
                                  author="Gastrotrilogía 2015 "/>
                    </a>
                    <a href={book14} target="_blank">
                        <CardGuia name="Retos y manejo de los padecimientos hepáticos" image={publi15}
                                  author="F.J. Bosques-Padilla, R. Malé-Velázquez, R. Trejo-Estrada, Gastrotrilogía 2015 "/>
                    </a>
                    <a href={book16} target="_blank">
                        <CardGuia name="Hacia una cirugía personalizada" image={publi16}
                                  author="C. Arnaud-Carreñño, H. Medina-Franco, Semana Nacional de Gastroenterología 2018"/>
                    </a>
                    <a href={book17} target="_blank">
                        <CardGuia name="Temas selectos en la hepatología: La visión de los expertos" image={publi17}
                                  author="A. Torre-Delgadillo, J.F. Sánchez-Ávila, Semana Nacional de Gastroenterología 2018"/>
                    </a>
                    <a href={book18} target="_blank">
                        <CardGuia name="Nuevas fronteras en la endoscopia diagnóstica y terapéutica" image={publi18}
                                  author="M.A. Tanimoto-Licona, L.E. Zamora-Nava, G. Grijales-Figueroa, Semana Nacional de Gastroenterología 2018"/>
                    </a>
                    <a href={book19} target="_blank">
                        <CardGuia name="Nutrición en Gastroenterología: aspectos clínicos y dietéticos" image={publi19}
                                  author="P. Milke-García, A. Espinosa-Marrón, J.A. Levya-Islas, Semana Nacional de Gastroenterología 2018"/>
                    </a>
                    <a href={book20} target="_blank">
                        <CardGuia name="Respuestas práctivas a problemas frecuentes y complejos en gastroenterología" image={publi20}
                                  author="J.L Tamayo, G. Vázquez-Elizondo, L.O. Olivares Guzmán, P.C. Gómez-Castaños , Semana Nacional de Gastroenterología 2018"/>
                    </a>

                         <Pagination defaultCurrent={1} total={1} >
                    </Pagination>
                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default Publicaciones;