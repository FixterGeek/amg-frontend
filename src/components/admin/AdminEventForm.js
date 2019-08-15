import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../molecules/TextFields'
import {
    TimePicker,
    Select,
    Modal,
    Skeleton
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
import { saveDraftEvent, getSingleEvent, updateWorkingOn, addModuleAction, removeModuleAction } from '../../store/ducks/adminDuck'
import ListAndModal from './reusables/ListAndModal'
import ImageGalleryPicker from './reusables/ImageGalleryPicker'
import ModuleModal from './reusables/ModuleModal';

let { Option } = Select
const { Dragger } = Upload;

function AdminEventForm({
    saveDraftEvent,
    getSingleEvent,
    setState,
    match,
    state,
    fetching,
    event,
    addModuleAction,
    removeModuleAction
}) {

    let [imageUrl, setImageUrl] = useState(null)
    let [loading, setLoading] = useState(false)
    let [speakerModal, setSpeakerModal] = useState(true)
    let [header, setHeader] = useState("Nuevo Evento")

    useEffect(() => {
        let { id } = match.params
        if (id) {
            getSingleEvent(id)
            setHeader("Editar Evento")
        }
    }, [])


    function handleChange(e, sub) {
        let { name, value } = e.target
        if (name === "description") {
            setState({ [name]: [value] })
            return
        }
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
        //saveDraftEvent(r)
        // savePublishedEvent(r)
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
                if (k === "permisos" || k === "mainImages") {
                    formData.append(k, obj[k])
                    continue
                }
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

    function saveDraft() {
        //e.preventDefault()
        //transform to formData
        let form = new FormData()
        let st = { ...state }
        //validations
        delete st.modules
        delete st.assistants
        let id = st._id
        delete st._id
        let r = transformToFormData(form, st)
        let pics = getPicturesFilesWithOrder(state.speakers)
        console.log("fotos speakers", pics)
        saveDraftEvent({ body: r, id })
    }

    function uploadModule(list) {
        // return
        let module = list[0]
        // AGREGA EL MALDITO EVENTO
        module.event = state._id
        // AGREGA EL MALDITO EVENTO
        addModuleAction(module)
        // subir con un action
    }

    function removeModule(object) {
        removeModuleAction(object)
    }

    if (fetching) return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => <div style={{ width: 320 }} ><Skeleton active /></div>)}

    </div>)

    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>{header}</h1>
                <button onClick={saveDraft} >Guardar como borrador</button>
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
                        value={state.description[0]}
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

                {state._id && <div className="segunda-columna">
                    <ListAndModal
                        list={state.modules}
                        modal={<ModuleModal />}
                        label="Secciones del evento"
                        buttonText="Agregar Sección"
                        keys={["title"]}
                        onChange={uploadModule} // returns a list
                        onDelete={removeModule} // returns an index
                        externalList={true}
                    />
                </div>}

            </div>



            {/* modals */}
            <ImageGalleryPicker />
            {/* {speakerModal && <SpeakerModal
                onFinish={addSpeaker}
                onCancel={() => setSpeakerModal(false)}
            />} */}
        </div>
    )
}

function mapState({ admin }) {
    let events = Object.values(admin.draftEvents)
    console.log(admin.workingOn)
    return {
        events,
        state: admin.workingOn,
        fetching: admin.workingOn.fetching
    }
}

export default connect(mapState, {
    saveDraftEvent,
    getSingleEvent,
    setState: updateWorkingOn,
    addModuleAction,
    removeModuleAction
})(AdminEventForm)