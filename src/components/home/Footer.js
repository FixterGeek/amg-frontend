import React, { Component } from 'react';
import "./Home.css";
import FontAwesome from "react-fontawesome"
import {Link} from "react-router-dom"

class Footer extends Component {
    render() {
        return (
            <div className="footer">
               <div>
                   <p>Redes sociales</p>
                   <a href="https://m.facebook.com/gastromx/" target="_blank">
                        <FontAwesome name="facebook-square"/>
                   </a>
                   <a href="https://twitter.com/gastromx" target="_blank">
                        <FontAwesome name="twitter-square"/>
                   </a>
                   <a href="https://www.youtube.com/user/gastromx" target="_blank">
                        <FontAwesome name="youtube-square"/>
                   </a>
                   <br/>
                   <br/>
                   <p>Asociación Mexicana de Gastroenterología © 2019</p>

               </div>
            </div>
        )
    }
}

export default Footer;