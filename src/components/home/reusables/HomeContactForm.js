import React, {Component} from 'react';
import TextField from "../../reusables/TextField";
import TextAreaField from '../../reusables/TextAreaField';
import {Select} from "antd";
import { message} from 'antd';

const baseURL = process.env.REACT_APP_BASE_API_URL;

const { Option } = Select;


class HomeContactForm extends Component {

  state = {
    error:"",
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  sendForm = e => {
    e.preventDefault()
    fetch(`${baseURL}/contact`, {
      body: JSON.stringify(this.state),
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

  render() {
    return (
        <section className="">

            <form onSubmit={this.sendForm}>
              <TextField
                  width="100%"
                  value={this.state.mail}
                  onChange={this.onChange}
                  errorMessage={"La dirección de correo no es correcta"}
                  name="mail"
                  type="email"
                  label="¿Cuál es tu correo?"
                  marginBottom="0px" />
              <TextField
                  width="100%"
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
                label="¿En que podemos ayudarte?"
                onChange={(v) => this.onChange((v))}
                name="text"
                value={this.state.text}
              />
              <br/>
              <button style={{width: "100%"}} className="btn-blue-dark">Enviar</button>
            </form>
          </section>

    );
  }
}
export default HomeContactForm;
