import React  from 'react';
import NavBar from "../../organisms/NavBar";
import sesion from "../../assets/sesion-mensaul.svg";


function SeccionMensual() {
    return (
        <section className="app">
            <NavBar />
            <section className="sesion">
                <div className="cover">
                    <div className="descript">
                        <h1 style={{marginBottom:"0px"}}>
                            SESIÓN</h1>
                        <h1>
                            MENSUA
                            <span>L</span>
                        </h1>
                    </div>
                </div>
            </section>
            <section className="biblioteca-box">
                <div className="biblioteca-text">
                    <h2 className="titles">Sesión Mensual</h2>
                    <p>Accede a la transmisión de las sesiones mensuales. Mantente al tanto de las últimas actualizaciones en la rama de la gastroenterología y obtén valor curricular a través de constancias de asistencia emitidas por el Consejo Mexicano de Gastroenterología y el Comité normativo de Medicina General. </p>
                    <button className="btn-blue-dark">Acceder a la sesión mensual</button>
                </div>
                <div className="biblioteca-img">
                    <img src={sesion} alt="bitmap"/>
                </div>
            </section>

        </section>
    );
}

export default SeccionMensual;