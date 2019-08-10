import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../molecules/TextFields'
import {
    DatePicker,
    TimePicker,
    Select,
    Icon,
} from 'antd'
import Upload from './reusables/Upload'
import estados from './estados.json'
import moment from 'moment'

let { Option } = Select
const { Dragger } = Upload;

export default function AdminEventForm() {

    let [imageUrl, setImageUrl] = useState(null)
    let [loading, setLoading] = useState(false)
    let [state, setState] = useReducer((state, update) => ({ ...state, ...update }), {
        mainImages: "file",
        permisos: "file",
        speakers: [{
            title: '',
            fullName: '',
            photoURL: '',
            city: '',
            bio: ''
        }],
        modules: ["ids de los modulos"],
        location: {
            addressName: "",
            street: "",
            outdoorNumber: "",
            interiorNumber: "",
            colony: "",
            zipCode: "",
            city: "",
            state: "",
            coordinates: []
        },
        title: 'titulo',
        startDate: null,
        startTime: '',
        endDate: '',
        description: '',

    })

    useEffect(() => {
        console.log(state)
    }, [state])

    function handleChange(e, sub) {
        console.log(e)
        return
        let { name, value } = e.target
        if (sub) {
            let object = state[sub]
            object[name] = value
            setState({ [sub]: object })
            return
        }
        setState({ [name]: value })
    }

    function handleDate(momentObject, name) {
        let date = momentObject.toString()
        setState({ [name]: date })
    }

    return (
        <div className="admin-event-form-container">
            <h1>Nuevo Evento</h1>
            <form
                className="admin-flex-column"
                onSubmit={() => { }}>

                <TextField
                    value={state.title}
                    onChange={handleChange}
                    marginTop={10}
                    name="title"
                    label="Nombre del evento"
                    placeholder="Evento interdiciplinario"
                />
                <TextField
                    onChange={handleChange}
                    name="description"
                    value={state.description}
                    style={{ width: 300 }}
                    label="Descripción del evento"
                    placeholder="describe el evento"
                    type="textarea"
                />
                <b>Fechas:</b>
                <br />
                <div className="admin-form-group">
                    <b>De:</b>
                    <DatePicker
                        onChange={m => handleDate(m, "startDate")}
                        style={{ width: 300 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={state.startDate ? moment(state.startDate) : null}
                    />
                </div>
                <div className="admin-form-group">
                    <b>A:</b>
                    <DatePicker
                        onChange={m => handleDate(m, "endDate")}
                        style={{ width: 300 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={state.endDate ? moment(state.endDate) : null}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Hora de  inicio</b>
                    <TimePicker
                        onChange={m => handleDate(m, "startTime")}
                        placeholder="Selecciona la hora"
                        style={{ width: 300 }}
                        value={state.startTime ? moment(state.startTime) : null}
                    />
                </div>
                <TextField
                    style={{ width: 300 }}
                    name="street"
                    label="Dirección"
                    placeholder="Calle"
                />
                <TextField
                    style={{ width: 300 }}
                    name="zipCode"
                    label="Código postal"
                    placeholder="07239"
                />
                <TextField
                    name="city"
                    label="Ciudad"
                    placeholder="San Cristobal"
                    style={{ width: 300 }}
                />
                <div className="admin-form-group">
                    <b>Estado</b>
                    <Select
                        style={{ width: 300 }}
                        defaultValue="Ciudad de México">
                        {Object.values(estados).map(name => {
                            return <Option value={name} >{name}</Option>
                        })}
                    </Select>
                </div>
                <div className="admin-form-group">
                    <b>Imagen del evento</b>
                    <Upload />
                </div>
                <div className="admin-form-group">
                    <b>Carta permiso</b>
                    <Upload accept="application/pdf" />
                </div>
                <input
                    className="admin-form-submit-button"
                    type="submit" value="Publicar evento" />



            </form>
        </div>
    )
}