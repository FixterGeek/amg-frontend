import React, {Component} from 'react';
import TextField from "../../reusables/TextField";
import TextAreaField from '../../reusables/TextAreaField';
import {Select} from "antd";
import { message} from 'antd';

import Button from '../../reusables/Button';

const baseURL = process.env.REACT_APP_BASE_API_URL;

const { Option } = Select;


class HomeContactForm extends Component {

  state = {
    error:"",
  }

  componentDidMount() {
    const capchaScript = document.createElement('script');
    capchaScript.src = "https://www.google.com/recaptcha/api.js?data";

    document.body.appendChild(capchaScript);
    
    capchaScript.onload = (e) => {
      window.setState = this.setState;
      window.handleCaptcha = function(res) {
        if (res) window.checkedCaptcha = true;
      }
    }
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  sendForm = e => {
    e.preventDefault()
    const captchaResponse = window.grecaptcha.getResponse();

    if (!captchaResponse) return message.error('Resulve el captcha');

    fetch(`${baseURL}/contact`, {
      body: JSON.stringify({ ...this.state, captchaResponse}),
      headers: {"Content-Type": "application/json"},
      method: 'post'
    }).then(res => {
      res.json()
    })
        .then(resp => {
          message.info('¡Hemos recibido tu mensaje! Nos pondremos en contacto contigo.')
          this.props.history.push('/')
        })
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   //?mail=&nombre=&text=&g-recaptcha-response=03AOLTBLTBxuflWMzNXoCSHp_sSIC3cJx4VCLpyrhyIF1c2ncGd14QF0umTuoBnrlys6F63_H2PU4xYmbW6kGgwrKLMWPYRagZx8D8LxdiwpS3giPZZ1-KnxuoEUjfrHoXF9DaurpA9imycW1F1bDglJyoQDIPjwMRfEmlK8j5W1BlPZiUEqGu2twG4Ra0ZoXT0PXVPhQ0sMyRsGlzTcisk3LHe1RM8neNai4_fXsWGSTqepkHJVBLOkq3gSsPMw6O8LzncBR6Ce9l4BMCmslcND_TbilmF5Jjnsjj5S4esMz_30tgMKTPAKxbAhwEwDGX0XOw1GOILq0umj6BN4FVwGWfCfIc1_0_x0Z6PkAabnhFI6jxkU3s6Wd2RP4SFuinEuehcwCLHZ1xuIjLHT81VOUyYrpavkZ_rWc1H2N2vg9EWKytCP8g9esdjdt-HqZ63idJNjd3D-XVKxLjc6CX1w_cJ2s7b6vFXtBoJGZMX4wyKZLsQ4lXQWbqP2H3_pUR3NgFssA_D2yY
  //   console.log();
  // }

  render() {
    console.log(this.state);
    return (
        <section className="">

            <form onSubmit={this.sendForm} action="?">
              <TextField
                  width="100%"
                  dots={false}
                  value={this.state.mail}
                  onChange={this.onChange}
                  // errorMessage={"La dirección de correo no es correcta"}
                  name="mail"
                  type="email"
                  label="¿Cuál es tu correo?"
                  marginBottom="0px" />
              <TextField
                  width="100%"
                  dots={false}
                  value={this.state.nombre}
                  onChange={this.onChange}
                  name="nombre"
                  type="text"
                  label="¿Cuál es tu nombre?"
                  marginBottom="0px" />
              <br/>
              <label style={{color: "#333333", fontWeight: "bold"}} htmlFor="">¿De qué se trata?</label>
              <br/>

              <Select onChange={value=>this.onChange({target:{name:'asunto', value}})}  defaultValue="Tema" style={{width: "100%"}}>
                <Option value="Academico"  name="academico" >Académico</Option>
                <Option value="Pagos" name="apagos">Pagos</Option>
                <Option value="Revista" name="revista" >Revista</Option>
                <Option value="Técnico" name="tecnico" >Técnico</Option>
              </Select>
              <br/>
              <TextAreaField
                dots={false}
                label="¿En que podemos ayudarte?"
                onChange={(v) => this.onChange((v))}
                name="text"
                value={this.state.text}
              />
              <br/>
              <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LfXl7sUAAAAANAztRRuFtdE19H_FSlduja29Qg-"
                    data-callback="handleCaptcha"
                  />
                </div>
                <br />
                <Button
                  htmlType="submit"
                  width="100%"
                  disabled={!this.state.mail || !this.state.nombre || !this.state.asunto || !this.state.text}
                >
                  Enviar
                </Button>
            </form>
          </section>

    );
  }
}
export default HomeContactForm;
