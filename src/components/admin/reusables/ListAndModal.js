import React, { useState, useEffect, cloneElement } from 'react'
import {
    Icon,
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function ListAndModal({
    list = [],
    modal,
    label,
    buttonText,
    keys,
    onChange,
    externalList,
    onDelete = () => { }
}) {

    let [showModal, setShowModal] = useState(false)
    let [array, setArray] = useState(list)

    useEffect(() => {
        if (externalList || list.length > 0) {
            return
        }
        else onChange(array)
    }, [array])

    // useEffect(() => {
    //     onChange(list)
    // }, [list])

    function onCancel() {
        setShowModal(false)
    }

    function removeObject(index, object) {
        if (!window.confirm(`¿Estas seguro de borrar?`)) return
        let filtered = array.filter((o, i) => i !== index)
        setArray(filtered)
        onDelete(object)
    }

    function onFinish(newObject) {
        setArray([newObject, ...array])
        if (list.length > 0) {
            onChange([newObject])
        }
    }

    return (
        <div className="admin-form-group">
            <b>{label}</b>

            {array.map((s, i) => (
                <div className="admin-form-speaker" >
                    {s[keys[0]]} {s[keys[1]]}
                    <Icon
                        onClick={() => removeObject(i, s)}
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