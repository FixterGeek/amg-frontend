import React from 'react'

const CardGuia = ({image, name, author}) => {
    return (
        <div className="card-guia">
            <div className="guia-img" style={{backgroundImage:`url("${image}")`}}>

            </div>
            <div className="guia-text">
                <p>{name}</p>
                <p className="author-guia">{author}</p>
            </div>
        </div>
    )
}

export default CardGuia
