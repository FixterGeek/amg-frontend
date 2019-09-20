import React  from 'react';
import NavBar from "../../organisms/NavBar";
import TextField from "../../molecules/TextFields";
import {Select} from "antd";
import Footer from "./Footer";
import ContactForm from './reusables/HomeContactForm';

const { Option } = Select;

function Contacto() {
    return (
        <section className="app">
            <NavBar />
            <section className="contacto">
                <div className="cover">
                    <div className="descript">
                        <h1>
                        CONTACT
                        <span>O</span>
                        </h1>
                    </div>
                </div>
            </section>
            <section className="form-contacto">
                <h2 className="titles">¿Qué podemos hacer por ti?</h2>
                <ContactForm />
            </section>
            <Footer/>
        </section>
);
}

export default Contacto;