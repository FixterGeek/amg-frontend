import React, { useEffect, useState, useRef } from 'react'
import {
    Modal,
    Spin,
    Icon,

} from 'antd'
import { storage } from '../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import Upload from './Upload'


export default function ImageGalleryPicker({ refName = "admin", onChange, visible, onClose }) {
    let inputRef = useRef()
    let [imageList, setImageList] = useState([])
    let [loading, setLoading] = useState(true)
    let [previewImage, setPreviewImage] = useState(null)

    useEffect(() => {
        loadImages()
    }, [])

    useEffect(() => {
        if (imageList.length > 0) setLoading(false)
    }, [imageList])

    function uploadFile(file) {
        setLoading(true)
        storage.ref(refName).child(file.name).put(file)
            .then(res => {
                loadImages()
                //inputRef.current.value = null
            })
    }

    async function getImages() {
        return storage.ref(refName).listAll()
            .then(snap => {
                return Promise.all(snap.items.map(imRef => {
                    return imRef.getDownloadURL()
                }))
            })
    }

    function loadImages() {
        setLoading(true)
        getImages()
            .then(linksArray => {
                setImageList(linksArray)
            })
    }

    function deleteImage(link) {
        if (!window.confirm("¿Estas segur@ de eliminar la imagen?")) return
        storage.refFromURL(link).delete()
            .then(() => {

                loadImages()
            })
    }

    function showImage(link) {
        setPreviewImage(link)
    }

    function onSelect(link) {
        onClose()
        onChange(link)

    }

    if (previewImage) return (
        <Modal
            visible={visible}
            footer={<div >
                <button onClick={() => onSelect(previewImage)} style={{ margin: "20px 20px" }}>Seleccionar</button>
                <button onClick={() => setPreviewImage(null)} style={{ margin: "20px 20px" }}>Cancelar</button>
            </div>}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onCancel={() => setPreviewImage(null)}
        >
            <div
                style={{ position: "relative" }}
            >
                <img style={{ maxWidth: "80vw" }} src={previewImage} alt={previewImage} />
            </div>

        </Modal>
    )
    return (
        <div >

            <Modal
                onCancel={onClose}
                visible={visible}
                footer={null}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                {loading && <Spin />}
                <Upload
                    placeholder="Sube un archivo desde tu equipo"
                    ref={inputRef}
                    onChange={uploadFile}
                />

                <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30, justifyContent: "center", alignItems: "center" }}>

                    {imageList.map(link => {
                        return (
                            <div style={{ width: 150, position: "relative" }}>
                                <Icon
                                    onClick={() => deleteImage(link)}
                                    style={{ padding: 10, borderRadius: "50%", background: "rgba(0,0,0,0.7)", color: "white", position: "absolute", right: 10, top: 10 }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Icon>
                                <img
                                    onClick={() => showImage(link)}
                                    style={{ marginRight: 20, cursor: "pointer", width: "100%", height: "auto" }} src={link} alt={link} />
                            </div>
                        )
                    })}
                </div>

            </Modal>
        </div>
    )
}