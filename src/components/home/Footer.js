import React, { Component } from 'react';
import "./Home.css";
import FontAwesome from "react-fontawesome"


class Footer extends Component {
    render() {
        return (
            <div className="footer">
               <div>
                   <p>Redes sociales</p>
                    <FontAwesome name="facebook-square"/>
                   <FontAwesome name="twitter-square"/>
                   <FontAwesome name="youtube-square"/>
                   <p>Asociación Mexicana de Gastroenterología © 2019</p>

               </div>
            </div>
        )
    }
}

export default Footer;