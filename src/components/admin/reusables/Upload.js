import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileImage,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'antd'

export default function Upload({
    type,
    name,
    placeholder,
    style,
    accept,
    onChange,
    value,
    multiple,
    className,
    hidden,
    iconStyle,
    preview,
    onData,
    onClick
}) {

    let inputRef = useRef()
    let [imageURL, setImageURL] = useState(null)
    let [fileName, setFileName] = useState(null)

    useEffect(() => {
        if (preview) setImageURL(preview)
    }, [preview])

    function handleFile(e) {
        let file = e.target.files[0]
        if (file && file.type === "application/pdf") {
            setImageURL(file.name)
            onChange(file)
            return
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            onData(reader.result)
            setImageURL(reader.result)
            onChange(file)
        }
    }

    return <>
        {!imageURL ? <div
            style={style || { display: "flex", flexDirection: "column", alignItems: "center" }}
            onClick={!onClick ? () => {
                inputRef.current.click()
            } : onClick}
        >

            <Icon
                style={iconStyle}
            >
                <FontAwesomeIcon icon={accept === "application/pdf" ? faFilePdf : faFileImage} />
            </Icon>
            <span>{placeholder}</span>
        </div>
            : accept !== "application/pdf" ?
                <div
                    onClick={!onClick ? () => {
                        inputRef.current.click()
                    } : onClick}
                    style={{
                        ...style,
                        backgroundImage: `url('${imageURL}')`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}
                >
                </div>
                :
                <div
                    onClick={() => {
                        inputRef.current.click()
                    }}
                    style={{
                        ...style
                    }}
                >
                    <h2>{imageURL}</h2>
                </div>
        }
        <input
            ref={inputRef}
            hidden={hidden}
            className={className}
            name={name}
            placeholder={placeholder}
            style={style}
            accept={accept}
            onChange={handleFile}
            value={value}
            type={type}
            multiple={false} // aun se agrega soporte para multiples archivos
        />
    </>
}

Upload.propTypes = {
    preview: PropTypes.string,
    iconStyle: PropTypes.object,
    hidden: PropTypes.bool,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    accept: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    onData: PropTypes.func
}

let styles = {
    div: {
        width: 300,
        backgroundColor: "#F8F8F8",
        height: 100,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "1px lightgrey dashed"
    },
    iconStyle: {
        color: "grey",
        fontSize: "40px"
    }
}


Upload.defaultProps = {
    onData: () => { },
    preview: null,
    iconStyle: styles.iconStyle,
    hidden: true,
    className: null,
    type: "file",
    name: null,
    placeholder: "Sube tu archivo",
    style: styles.div,
    accept: "image/*",
    onChange: () => { },
    value: null,
    multiple: false
}


