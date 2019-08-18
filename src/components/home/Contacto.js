import React  from 'react';
import NavBar from "../../organisms/NavBar";
import TextField from "../../molecules/TextFields";
import {Select} from "antd";
import Footer from "./Footer";

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
            <form>
                    <TextField style={{maxWidth:"1500px"}} label="¿Cuál es tu correo?" value=""/>
                    <TextField style={{maxWidth:"1500px"}} label="¿Cuál es tu nombre?"/>
                    <label style={{color:"#333333", fontWeight: "bold"}} htmlFor="">¿De qué se trata?</label>
                    <br/>
                    <Select   defaultValue="Tema" style={{ width: "100%"}}>
                        <Option  value="Academico">Académico</Option>
                        <Option value="Pagos">Pagos</Option>
                        <Option value="Revista">Revista</Option>
                        <Option value="Técnico">Técnico</Option>
                    </Select>
                    <br/>
                    <br/>
                    <button style={{width:"100%"}} className="btn-blue-dark">Enviar</button>
                </form>
            </section>
            <Footer/>
        </section>
);
}

export default Contacto;