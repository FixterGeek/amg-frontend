import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import TextField from '../../../molecules/TextFields'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileImage,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import {
    Icon, Modal,
    AutoComplete,
} from 'antd'
import Upload from './Upload';

let users = [{ fullName: "Juanito" },
{ fullName: "Javiersito" },
{ fullName: "Oswaldito" },
{ fullName: "Oswald" },
{
    fullName: "Brendi",
    title: "Licenciada",
    city: "Cuautepec de Hinojosa, Hidalgo",
    bio: "Desde chiquita le gustaba mucho cantar",
    photoURL: "https://www.golfchannel.com/sites/default/files/styles/headshot/public/stoelting_98x98.jpg?itok=QvjPRdAu"
},
{ fullName: "Bliss" },
{ fullName: "Polo" },
{ fullName: "David" },
{ fullName: "Raul" },
{ fullName: "Toñito" },
{ fullName: "Pablito" }]

export default function SpeakerModal({
    onCancel,
    onFinish
}) {

    let [search, setSearch] = useState("br")
    let [speaker, setSpeaker] = useState({ photoFile: null })
    let [speakers, setSpeakers] = useState([])


    useEffect(() => {
        console.log(speaker)
    }, [speaker])

    function onChange({ target: { name, value } }) {
        setSpeaker({ ...speaker, [name]: value })
    }

    function onChangeAuto(value) {
        setSearch(value)
    }

    function onSelect(value) {
        let user = users.find(u => u.fullName === value) // check if it's the sae keyname
        setSpeaker({ ...speaker, ...user })
    }

    function searchResults(search) {
        let regex = new RegExp(search, "gi")
        let objs = users.filter(u => regex.test(u.fullName)) // checa si la llave es la misma
        setSpeakers(objs.map(u => u.fullName))

    }

    function addSpeaker() {
        let u = { ...speaker, fullName: search }
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
            <div className="admin-form-second-column">
                <div className="admin-form-group">
                    <b><h2>Ponentes</h2></b>
                    <TextField
                        onChange={onChange}
                        name="title"
                        value={speaker.title}
                        label="Grado del ponente"
                        placeholder="Medico."
                        style={{ width: 300 }}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Nombre completo del ponente</b>
                    <AutoComplete
                        dataSource={speakers}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        onSearch={searchResults}
                        placeholder="input here"
                        onChange={onChangeAuto}
                        value={search}
                        placeholder="Jorge Campos"
                        style={{ width: 300 }}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Foto:</b>
                    <Upload
                        onChange={file => setSpeaker({ ...speaker, photoFile: file })}
                        preview={speaker.photoURL}
                    />
                </div>
                <TextField
                    onChange={onChange}
                    name="city"
                    value={speaker.city}
                    label="Ciudad de origen"
                    placeholder="Jalapa"
                    style={{ width: 300 }}
                />
                <TextField
                    onChange={onChange}
                    name="bio"
                    value={speaker.bio}
                    label="Mini biografía del ponente"
                    placeholder="Juanito publico su primer libro de anatomía a los 15 años"
                    type="textarea"
                    style={{ width: 300 }}
                />

                <button
                    onClick={addSpeaker}
                    className="admin-form-button-add">
                    Agregar ponente
                    </button>
            </div>

        </Modal>
    </>
}

SpeakerModal.propTypes = {
    preview: PropTypes.string,
    onCancel: PropTypes.func,
    onFinish: PropTypes.func,
}

let styles = {

}


SpeakerModal.defaultProps = {
    preview: null,
    onCancel: () => { },
    onFinish: () => { }
}


