import React  from 'react';

import Guides from '../resources/Guides';
import NavBar from "../../organisms/NavBar";
import "./Home.css"

import Footer from "./Footer";

function Guias() {
    return (
        <section className="guias">
            <div className="back-blue">
                <NavBar/>
            </div>
            <div className="box-guias">
                <Guides />
            </div>
            <Footer/>
        </section>
    );
}

export default Guias;