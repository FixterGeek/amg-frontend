import React  from 'react';
import NavBar from "../../organisms/NavBar";
import "./Home.css"
import CardGuia from "./CardGuia";
import publi1 from "../../assets/screen-shot-2019-08-06-at-4-11-36-pm (7).png"
import Footer from "./Footer";


function Publicaciones() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <h2 className="title-black">Publicaciones</h2>
                <div className="multi-guias">
                    <CardGuia name="Controversias en gastroenterología" image={publi1}
                              author="R.I. Carmona-Sánchez, R. Bernal-Reyes, M. A. Ruiz-Castillo 2018, Gastrotrilogía XV. "/>

                    <CardGuia name="Patología hepatobiliar y pancreatica de la A a la Z" image={publi1}
                              author="L.F. Uscanga-Domínguez, F. Esquivel-Ayanegui, M.V. Bielsa-Fernández 2016, Gastrotrilogía I. "/>

                    <CardGuia name="Urgencias en Gastroenterología" image={publi1}
                              author="R.H. Raña-Garibay, J.L. Tamayo-De la Cuesta, M.V. Bielsa-Fernández 2016, Gastrotrilogía II. "/>

                    <CardGuia name="“Nuevos horizontes en trastornos funcionales gastrointestinales”" image={publi1}
                              author="M. Amieva-Balmori, E. Coss-Adame, A. López-Colombo, J.M. Remes-Troche 2017, Gastrotrilogía X."/>

                    <CardGuia name="Abordaje médico, endoscópico y quirúrgico de problemas clínicos comunes" image={publi1}
                              author="R.I. Carmona-Sánchez, H.M. Huerta-Guerrero, J.S. Jacobo-Karam, H. Rodríguez-Hernández 2018, Gastrotrilogía X. "/>

                    <CardGuia name="Oncología del aparato digestivo y estadística médica" image={publi1}
                              author="M.V. Bielsa-Fernández,C. Arnaud-Carreño, J.R. Nogueira-De Rojas, L.F. Uscanga-Domínguez 2016, Gastrotrilogía III."/>

                    <CardGuia name="Retos y manejo de los padecimientos hepáticos" image={publi1}
                              author="F.J. Bosques-Padilla, R. Malé-Velázquez, R. Trejo-Estrada 2015, Gastrotrilogía VI."/>


                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default Publicaciones;