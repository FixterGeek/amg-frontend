import React, {useState, useEffect} from 'react'
import TextField from '../../molecules/TextFields'
import {TimePicker,Select, Icon,Skeleton, DatePicker} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'


const { Option } = Select


const AdminTestForm = ({history, match, location, events}) => {

    const testMock = {
        event:'12341234',
        title:'El test maestro',
        date:'10/10/10',
        beginingTime:'10:10:10',
        endTime:'10:15:00',
        questions:[{
            question:'quien se comió la kk del caba?',
            answers:[
                'yo',
                'tu',
                'lol',
                'ño'
            ],
            correct:'yo'
        }],
    }

    const [header, setHeader] = useState("Crear Test")
    const [test, setTest] = useState(testMock)

    useEffect(() => {
        getAdminEvents()
        // let { id } = match.params
        // if (id) {
        //     //getSingleEvent(id)
        //     //setHeader("Editar Test del Evento: " + test.event.title)
        // }
    }, [])

    const saveDraft=()=>{}
    const handleSubmit=()=>{}
    const handleChange=()=>{}

    const handleSelect=(a,b,c)=>{

    }

    const handleDate=()=>{}
    const handleTime=()=>{}
    console.log(events)
    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>{header}</h1>
                <button onClick={saveDraft}>Guardar como borrador</button>
            </div>
            <div className="admin-form-two-columns-container">

            <form
                className="admin-flex-column"
                onSubmit={handleSubmit}>
                <div className="admin-form-group">
                    <b>Evento al que pertenece</b>
                    <Select
                        label="Evento al que pertenece"
                        onChange={e => handleSelect(e, "state", "location")}                    
                        style={{ width: 300 }}
                        defaultValue="Elije un evento">
                        {events.map((event, key) => (
                            <Option key={key} value={event._id} >{event.title}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <TextField
                        onChange={e => handleChange(e, "title")}
                        name="title"
                        value={test.title}
                        label="Nombre del test"
                        placeholder="Test 001"
                        style={{ width: 300 }}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Fecha</b>
                    <DatePicker
                        label="Fecha"
                        onChange={m => handleDate(m, "date")}
                        style={{ width: 300 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={test.date ? moment(test.date) : null}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Horario disponible</b>
                    <span>De</span>
                    <TimePicker
                        onChange={m => handleDate(m, "beginingTime")}
                        placeholder="Selecciona la hora de inicio"
                        style={{ width: 300 }}
                        value={test.beginingTime ? moment(test.beginingTime) : null}
                    />
                    <span>A</span>        
                    <TimePicker
                        onChange={m => handleDate(m, "endTime")}
                        placeholder="Selecciona la hora de fin"
                        style={{ width: 300 }}
                        value={test.endTime ? moment(test.endTime) : null}
                    />
                </div>
                <div className="admin-form-group">
                    <b>Límite de tiempo por pregunta</b>
                    <Select
                        //onChange={e => handleSelect(e, "state", "questionDuration")}                    
                        style={{ width: 300 }}
                        defaultValue="Elije un evento">
                        {/* {Object.values(estados).map(name => {
                            return <Option value={name} >{name}</Option>
                        })} */}
                    </Select>
                </div>
                <input
                    className="admin-form-submit-button"
                    type="submit" value="Siguiente" />

            </form>
            </div>
        </div>
    )
}

function mapStateToProps({events}) {    
    const eventsList = events.array
    return {
        events:eventsList        
    }
}



export default connect(mapStateToProps,{})(AdminTestForm)
