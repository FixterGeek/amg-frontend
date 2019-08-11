import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../molecules/TextFields'
import {
    TimePicker,
    Select,
    Icon,
} from 'antd'
import Upload from './reusables/Upload'
import estados from './estados.json'
import moment from 'moment'
import SpeakerModal from './reusables/SpeakerModal';
import DatePicker from '../../molecules/DatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { saveDraftEvent } from '../../store/ducks/adminDuck'
import ListAndModal from './reusables/ListAndModal'

let { Option } = Select
const { Dragger } = Upload;

function AdminEventForm({
    saveDraftEvent
}) {

    let [imageUrl, setImageUrl] = useState(null)
    let [loading, setLoading] = useState(false)
    let [speakerModal, setSpeakerModal] = useState(true)
    let [state, setState] = useReducer((state, update) => ({ ...state, ...update }), {
        mainImages: "file",
        permisos: "file",
        speakers: [],
        modules: ["ids de los modulos"],
        location: {
            addressName: "",
            street: "",
            outdoorNumber: "",
            interiorNumber: "",
            colony: "",
            zipCode: "",
            city: "",
            state: null,
            coordinates: []
        },
        title: 'titulo',
        startDate: null,
        startTime: '',
        endDate: '',
        description: '',
        mainImagesURLS: ["https://miro.medium.com/fit/c/256/256/0*jp3IFb08Sy3_k3N_."],
        permisosURLS: []

    })

    useEffect(() => {
        console.log(state)
    }, [state])

    function handleChange(e, sub) {
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

    function handleSelect(value, name, sub) {
        if (sub) {
            let object = state[sub]
            object[name] = value
            setState({ [sub]: object })
            return
        }
        setState({ [name]: value })
    }

    function handleFile(file, name) {
        setState({ [name]: file })
    }

    // function addSpeaker(newSpeaker) {
    //     let { speakers } = state
    //     speakers.unshift(newSpeaker)
    //     setState({ speakers })
    // }

    // function removeSpeaker(speaker) {
    //     let { speakers } = state
    //     speakers = speakers.filter(s => s.fullName !== speaker.fullName)
    //     setState({ speakers })
    // }

    function handleSubmit(e) {
        e.preventDefault()
        //transform to formData
        let form = new FormData()
        let r = transformToFormData(form, state)
        let pics = getPicturesFilesWithOrder(state.speakers)
        console.log("fotos speakers", pics)
        saveDraftEvent(r)
    }

    function getPicturesFilesWithOrder(array) {
        let result = []
        for (let el of array) {
            result = [...result, el.photoFile]
        }
        return result
    }

    function transformToFormData(formData, obj, parentKey) {
        if (parentKey) {
            for (let k in obj) {
                formData.append(`${parentKey}[${k}]`, obj[k])
            }
        }
        else {
            for (let k in obj) {
                // if (k === "permisos") {
                //     formData.append(k, obj[k])
                //     continue
                // }
                if (Array.isArray(obj[k]) || typeof obj[k] === "object") {
                    formData.append(k, JSON.stringify(obj[k]))
                    continue
                }
                // if (typeof obj[k] === "object") transformToFormData(formData, obj[k], k)
                else formData.append(k, obj[k])
            }
        }
        return formData
    }

    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>Nuevo Evento</h1>
                <button>Guardar como borrador</button>
            </div>
            <div className="admin-form-two-columns-container">


                <form
                    className="admin-flex-column"
                    onSubmit={handleSubmit}>

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
                    <DatePicker
                        label="De:"
                        onChange={m => handleDate(m, "startDate")}
                        style={{ width: 300 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={state.startDate ? moment(state.startDate) : null}
                    />
                    <DatePicker
                        label="A:"
                        onChange={m => handleDate(m, "endDate")}
                        style={{ width: 300 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={state.endDate ? moment(state.endDate) : null}
                    />
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
                        onChange={e => handleChange(e, "location")}
                        name="street"
                        value={state.location.street}
                        style={{ width: 300 }}
                        label="Dirección"
                        placeholder="Calle"
                    />
                    <TextField
                        onChange={e => handleChange(e, "location")}
                        name="zipCode"
                        value={state.location.zipCode}
                        style={{ width: 300 }}
                        label="Código postal"
                        placeholder="07239"
                    />
                    <TextField
                        onChange={e => handleChange(e, "location")}
                        name="city"
                        value={state.location.city}
                        label="Ciudad"
                        placeholder="San Cristobal"
                        style={{ width: 300 }}
                    />
                    <div className="admin-form-group">
                        <b>Estado</b>
                        <Select
                            onChange={e => handleSelect(e, "state", "location")}
                            value={state.location.state}
                            style={{ width: 300 }}
                            defaultValue="Ciudad de México">
                            {Object.values(estados).map(name => {
                                return <Option value={name} >{name}</Option>
                            })}
                        </Select>
                    </div>
                    <div className="admin-form-group">
                        <b>Imagen del evento</b>
                        <Upload
                            preview={state.mainImagesURLS[0]}
                            onChange={file => handleFile(file, "mainImages")}
                        />
                    </div>
                    <div className="admin-form-group">
                        <b>Carta permiso</b>
                        <Upload
                            preview={state.permisosURLS[0]}
                            onChange={file => handleFile(file, "permisos")}
                            accept="application/pdf" />
                    </div>
                    {/* <div className="admin-form-group">
                        <b>Ponentes</b>

                        {state.speakers.map(s => (
                            <div className="admin-form-speaker" >
                                {s.title} {s.fullName}
                                <Icon
                                    onClick={() => removeSpeaker(s)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Icon>
                            </div>)
                        )}

                        <div
                            onClick={() => { setSpeakerModal(true) }}
                            style={{ textAlign: "center" }}
                            className="admin-form-button-add">
                            Agregar ponente
                        </div>
                    </div> */}

                    <ListAndModal
                        modal={< SpeakerModal />}
                        label="Ponentes"
                        buttonText="Agregar Ponente"
                        keys={["title", "fullName"]}
                        onChange={list => handleChange({ target: { name: "speakers", value: list } })}
                    />

                    <input
                        className="admin-form-submit-button"
                        type="submit" value="Publicar evento" />



                </form>



            </div>

            {/* modals */}
            {/* {speakerModal && <SpeakerModal
                onFinish={addSpeaker}
                onCancel={() => setSpeakerModal(false)}
            />} */}
        </div>
    )
}

function mapState({ admin }) {
    let events = Object.values(admin.draftEvents)
    return {
        events
    }
}

export default connect(mapState, { saveDraftEvent })(AdminEventForm)