import React, { useState, useEffect } from 'react'
import TextField from '../reusables/TextField';
import {
    TimePicker,
    Select,
    Spin
} from 'antd'
import Upload from './reusables/Upload'
import estados from './estados.json'
import moment from 'moment'
import SpeakerModal from './reusables/SpeakerModal';
import DatePicker from '../../molecules/DatePicker'
import { connect } from 'react-redux'
import {
    saveDraftEvent,
    getSingleEvent,
    updateWorkingOn,
    addModuleAction,
    removeModuleAction,
    addActivityAction,
    removeActivityAction,
    deleteEventAction
} from '../../store/ducks/adminDuck'
import ListAndModal from './reusables/ListAndModal'
import ImageGalleryPicker from './reusables/ImageGalleryPicker'
import ModuleModal from './reusables/ModuleModal';
import ActivityModal from './reusables/ActivityModal';
import MapLocation from '../events/reusables/MapLocation';
import SearchPlaceField from '../reusables/SearchPlaceField';
import Swal from 'sweetalert2'

let { Option } = Select

// COMPONENT
function AdminEventForm({
    saveDraftEvent,
    getSingleEvent,
    setState,
    match,
    state,
    fetching,
    event,
    addModuleAction,
    removeModuleAction,
    activities,
    addActivityAction,
    removeActivityAction,
    history,
    deleteEventAction
}) {

    let [header, setHeader] = useState("Nuevo Evento")

    useEffect(() => {
        let { id } = match.params
        if (id) {
            getSingleEvent(id)
            setHeader("Editar Evento")
        }
    }, [])

    useEffect(() => {
        if (state.new) history.push('/admin/events')
    }, [state])

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
        let st = { ...state }
        //validations
        delete st.modules
        delete st.assistants
        let id = st._id
        delete st._id
        st.status = "published"
        let r = transformToFormData(form, st)
        //let pics = getPicturesFilesWithOrder(state.speakers)
        saveDraftEvent({ body: r, id })
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
        st.status = "draft"
        let r = transformToFormData(form, st)
        let pics = getPicturesFilesWithOrder(state.speakers)
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
    function uploadActivity(list) {
        // return
        let activity = list[0]
        // AGREGA EL MALDITO EVENTO
        activity.event = state._id
        // AGREGA EL MALDITO EVENTO
        addActivityAction(activity)
        // subir con un action
    }

    function removeActivity(object) {
        removeActivityAction(object)
    }

    function removeEvent() {
        Swal.fire({
            title: 'Estas segur@?',
            text: "Esto no podrá revertirse y se perderá toda la información relacionada al evento",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#2d364f',
            confirmButtonColor: "#d33",
            confirmButtonText: 'Si, eliminar evento'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Eliminado!',
                    'El evento ha sido Eliminado de la base de datos.',
                    'success'
                )
                deleteEventAction(state._id)
                    .then(() => {
                        history.goBack()
                    })
            }
        })

    }

    // if (fetching) return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
    //     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => <div style={{ width: 320 }} ><Skeleton active /></div>)}
    // </div>)

    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>{header}</h1>
                {fetching && <Spin />}
                <div>
                    <button onClick={saveDraft} >Guardar como borrador</button>
                    {state._id && <button style={{ color: "white", background: "red" }} onClick={removeEvent} >Eliminar Evento</button>}
                </div>

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
                    <div style={{ width: '100%' }}>
                        <b>Coordenadas</b>
                        <SearchPlaceField />
                        <MapLocation />
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
                        list={state.speakers}
                        modal={< SpeakerModal />}
                        label="Ponentes"
                        buttonText="Agregar Ponente"
                        keys={["title", "fullName"]}
                        onChange={list => handleChange({ target: { name: "speakers", value: [...list, ...state.speakers] } })}
                        externalList={true}
                    />
                    {fetching && <Spin />}
                    {fetching || <input
                        className="admin-form-submit-button"
                        type="submit" value="Publicar evento" />}

                </form>

                {state._id &&
                    <div>
                        <div className="segunda-columna">
                            <ListAndModal
                                list={state.modules}
                                modal={<ModuleModal />}
                                label="Secciones del evento"
                                buttonText="Agregar Sección"
                                keys={["title"]}
                                onChange={uploadModule} // returns a list
                                onDelete={removeModule} // returns an object
                                externalList={true}
                            />
                        </div>
                        <div className="segunda-columna">
                            <ListAndModal
                                list={activities}
                                modal={<ActivityModal speakers={state.speakers} modules={state.modules} />}
                                label="Actividades del Evento"
                                buttonText="Agregar Actividad"
                                keys={["activityName"]}
                                onChange={uploadActivity} // returns a list
                                onDelete={removeActivity} // returns an object
                                externalList={true}
                            />
                        </div>
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
    let activities = []
    admin.workingOn.modules.forEach(module => {
        module.activities.forEach(activity => {
            activities.push(activity)
        })
    })
    return {
        events,
        state: admin.workingOn,
        fetching: admin.workingOn.fetching,
        activities
    }
}

export default connect(mapState, {
    saveDraftEvent,
    getSingleEvent,
    setState: updateWorkingOn,
    addModuleAction,
    removeModuleAction,
    addActivityAction,
    removeActivityAction,
    deleteEventAction
})(AdminEventForm)