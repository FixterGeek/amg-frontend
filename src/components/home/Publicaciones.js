import React  from 'react';
import NavBar from "../../organisms/NavBar";
import Posts from '../resources/Posts';
import "./Home.css"
import Footer from "./Footer";


function Publicaciones() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <Posts />
            </div>
            <Footer/>
        </section>
    );
}

export default Publicaciones;