import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import TextField from '../../../molecules/TextFields'
import {
    Modal,
    Select,
    DatePicker,
    TimePicker,
} from 'antd'
import moment from 'moment'
import Upload from './Upload';
import ImageGalleryPicker from './ImageGalleryPicker';
let { Option } = Select

export default function ActivityModal({
    onCancel,
    onFinish,
    modules,
    speakers
}) {
    let [item, setItem] = useState({ speakers: [{}] })
    let [error, setError] = useState(null)
    let [galleryOpen, setGalleryOpen] = useState(false)

    useEffect(() => {
        //console.log(item)
    }, [item])

    function onChange({ target: { name, value } }) {
        console.log(name,value)
        setItem({ ...item, [name]: value })
    }

    function validate() {
        let valid = true
        setError(null)
        Object.values(item).forEach(val => {
            if (!val || val === '') {
                valid = false
                setError("No puede haber campos vacios")
            }
        })
        if (Object.keys(item).length < 8) {// how many keys do we need?
            valid = false
            setError("Completa el formulario")
        }

        return valid
    }

    function addItem() {
        if (!validate()) return
        let u = { ...item }
        console.log(u)
        onFinish(u)
        onCancel()
    }


    return <>
        <Modal
            visible={true}
            footer={null}
            onCancel={onCancel}
            style={{ padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <div>
                <div className="admin-form-group">
                    <b><h2>Actividad</h2></b>
                </div>

                <div className="admin-form-group">
                    <b>Sección</b>
                    <Select
                        placeholder="Selecciona el módulo"
                        onChange={value => onChange({ target: { name: "module", value } })}
                        value={item.module}
                        style={{ width: 300 }}
                    >
                        {modules.map(m => <Option key={m._id} value={m._id} >{m.title}</Option>)}
                    </Select>
                </div>
                <div className="admin-form-group">
                    <b>Tipo de actividad</b>
                    <Select
                        placeholder="Tipo de actividad"
                        onChange={value => onChange({ target: { name: "activityType", value } })}
                        value={item.activityType}
                        style={{ width: 300 }}
                    >
                        {["Actividad", "Conferencia", "Taller", "Otro"].map(m => <Option key={m} value={m} >{m}</Option>)}
                    </Select>
                </div>

                <TextField
                    onChange={onChange}
                    name="activityName"
                    value={item.activityName}
                    label="Nombre de la actividad"
                    placeholder="Escribe un nombre para la actividad"
                    style={{ width: 300 }}
                    error={error}
                    errorMessage={error}
                />

                <TextField
                    onChange={onChange}
                    name="description"
                    value={item.description}
                    label="Descripción de la actividad"
                    placeholder="describe la actividad brevemente"
                    type="textarea"
                    style={{ width: 300 }}

                />

                <TextField
                    onChange={onChange}
                    name="cost"
                    value={item.cost}
                    label="Costo de la actividad $"
                    placeholder="$ 1000.00"
                    style={{ width: 300 }}
                    error={error}
                    errorMessage={error}
                />
                <div className="admin-form-group">
                    <b>Fecha de la actividad</b>
                    <DatePicker
                        format="LL"
                        value={moment(item.date)}
                        onChange={value => onChange({ target: { name: "date", value: moment(value).toString() } })}
                    /><br/>
                    <b>Hora de Inicio</b>
                    <TimePicker
                        value={moment(item.startTime)}                                        
                        onChange={value => onChange({ target: { name: "startTime", value: moment(value).toString() } })}
                    /><br/>
                    <b>Hora de Fin</b>
                    <TimePicker
                        value={moment(item.endTime)}                                         
                        onChange={value => onChange({ target: { name: "endTime", value: moment(value).toString() } })}
                    />

                </div>

                <TextField
                    onChange={onChange}
                    name="address"
                    value={item.address}
                    label="Ubicación"
                    placeholder="Sala B"
                    style={{ width: 300 }}
                    error={error}
                    errorMessage={error}
                />

                <div className="admin-form-group">
                    <b>Ponente</b>
                    <Select
                        placeholder="Selecciona el ponente"
                        onChange={fullName => {
                            console.log(fullName)
                            let speaker = speakers.find(s => s.fullName === fullName)
                            if (speaker) setItem({ ...item, speakers: [speaker] })
                        }}
                        value={item.speakers[0].fullName}
                        style={{ width: 300 }}
                    >
                        {speakers.map((m, i) => <Option key={i} value={m.fullName} >{m.fullName}</Option>)}
                    </Select>
                </div>
                <Upload
                    preview={item.constanciaURL}
                    onClick={() => setGalleryOpen(true)}
                />
                <br />
                <br />
                <button
                    onClick={addItem}
                    className="admin-form-button-add">
                    Guardar Sección
                    </button>
            </div>

        </Modal>
        <ImageGalleryPicker
            onChange={constanciaURL => { setItem({ ...item, constanciaURL }) }}
            visible={galleryOpen}
            onClose={() => setGalleryOpen(false)}
        />
    </>
}

ActivityModal.propTypes = {
    preview: PropTypes.string,
    onCancel: PropTypes.func,
    onFinish: PropTypes.func,
}

let styles = {

}


ActivityModal.defaultProps = {
    preview: null,
    onCancel: () => { },
    onFinish: () => { }
}


