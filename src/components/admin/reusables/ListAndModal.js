import React, { useState, useEffect, cloneElement } from 'react'
import {
    Icon,
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function ListAndModal({
    modal,
    label,
    buttonText,
    keys,
    onChange
}) {

    let [showModal, setShowModal] = useState(true)
    let [array, setArray] = useState([])

    useEffect(() => {
        onChange(array)
    }, [array])

    function onCancel() {
        setShowModal(false)
    }

    function removeObject(index) {
        let filtered = array.filter((o, i) => i !== index)
        setArray(filtered)
    }

    function onFinish(newObject) {
        setArray([newObject, ...array])
    }

    return (
        <div className="admin-form-group">
            <b>{label}</b>

            {array.map((s, i) => (
                <div className="admin-form-speaker" >
                    {s[keys[0]]} {s[keys[1]]}
                    <Icon
                        onClick={() => removeObject(i)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Icon>
                </div>)
            )}

            <div
                onClick={() => { setShowModal(true) }}
                style={{ textAlign: "center" }}
                className="admin-form-button-add">
                {buttonText}
            </div>
            {showModal && cloneElement(modal, { onCancel, onFinish })}
        </div>
    )
}