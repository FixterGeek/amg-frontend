import React, { useState } from 'react'
import PropTypes from 'prop-types';
import TextField from '../../../molecules/TextFields'
import {
    Modal,

} from 'antd'

export default function ModuleModal({
    onCancel,
    onFinish
}) {
    let [item, setItem] = useState({})
    let [error, setError] = useState(null)

    function onChange({ target: { name, value } }) {
        setItem({ ...item, [name]: value })
    }

    function validate() {
        let valid = true
        setError(null)
        Object.values(item).forEach(val => {
            if (!val || val.trim() === '') {
                valid = false
                setError("No puede haber campos vacios")
            }
        })
        if (Object.keys(item).length < 2) {// how many keys do we need?
            valid = false
            setError("Completa el formulario")
        }

        return valid
    }

    function addItem() {
        if (!validate()) return
        let u = { ...item }
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
                    <b><h2>Sección</h2></b>
                    <TextField
                        onChange={onChange}
                        name="title"
                        value={item.title}
                        label="Título de la sección"
                        placeholder="Escribe un titulo para la sección"
                        style={{ width: 300 }}
                        error={error}
                        errorMessage={error}
                    />
                </div>

                <TextField
                    onChange={onChange}
                    name="description"
                    value={item.description}
                    label="Descripción de la sección"
                    placeholder="describe la sección brevemente"
                    type="textarea"
                    style={{ width: 300 }}

                />

                <button
                    onClick={addItem}
                    className="admin-form-button-add">
                    Guardar Sección
                    </button>
            </div>

        </Modal>
    </>
}

ModuleModal.propTypes = {
    preview: PropTypes.string,
    onCancel: PropTypes.func,
    onFinish: PropTypes.func,
}


ModuleModal.defaultProps = {
    preview: null,
    onCancel: () => { },
    onFinish: () => { }
}


