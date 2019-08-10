import React from 'react';

import FullScreenContainer from '../../atoms/layout/FullScreenContainer';
import Container from '../../atoms/layout/Container';
import { palette } from '../../styles/theme';
import log from "../../assets/LOGO-COMPLETO.svg"
import {Link} from "react-router-dom";
import down from "../../assets/down.svg"
import AmgButton from '../../atoms/Button';
import solicitud from "../../assets/SOLICITUD DE INGRESO AMG.pdf"

function PreSign() {
    return (
        <FullScreenContainer
            lateralSpace="0px"
            paddingTop="0px"
            paddingBottom="0px"
            flexWrap="nowrap"
        >
            <Container className="login-left" height="110vh" width="50%">
                <div className="padd">
                    <Link to="/">
                        <img src={log} alt="logo-oficial"/>
                    </Link>

                    <h2 className="titles">Registro</h2>
                    <p>Este es el registro en línea para la Asociación Mexicana de Gastroenterología. El formulario tiene una duración aproximada de 15 minutos. </p>
                    <br/>
                    <p>Formulario para imprimir
                        <a href={solicitud} target="blank">
                            <img style={{width:"14px", marginLeft:"8px"}} src={down} alt="icon-download"/>
                        </a>
                    </p>
                    <h2 className="titles">Ten a la mano</h2>
                    <ul>
                        <li>Una fotografía tamaño infantil</li>
                        <li>Titulo universitario</li>
                        <li>Cédula profesional</li>
                        <li>Certficación de especialidad</li>
                    </ul>
                    <br/>
                    <p>NOTA: La solicitud de ingreso no podrá ser evaluada hasta contar con la  documentación completa. Solamente se registrarán en el Directorio las especialidades que cuenten con documentación que lo avale. </p>

                    <Link to="/signup/general">
                        <AmgButton
                            htmlType="submit"
                            width="100%">
                            Comenzar
                        </AmgButton>
                    </Link>

                </div>
            </Container>
            <Container
                className="login-right"
                bgColor={palette.secondary}
                height="110vh"
                width="50%"
            >
                <div className="login-bg">
                    <div className="login-logo" />
                </div>
            </Container>
        </FullScreenContainer>
    );
}

export default PreSign;
