import React, {useState, useEffect} from 'react'
import TextField from '../../molecules/TextFields'
import {TimePicker,Select, Icon,Skeleton, DatePicker} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest } from '../../store/ducks/testsDuck'


const { Option } = Select


const AdminTestForm = ({history, match, location, fetching, test, events, writingTest, getAdminEvents, saveTest, getSingleTest}) => {
    

    const [header, setHeader] = useState("Crear Test")
    //const [test, setTest] = useState(testMock)

    useEffect(() => {        
        getAdminEvents()
        let { id } = match.params
        if (id) {
            getSingleTest(id)
            setHeader("Editar Test " + test.title)
        }
    }, [])

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        saveTest(test)
        //history.push('/admin/tests/questions')          
        
    }
    const saveDraft=()=>{
        saveTest(test)
    }
    const handleChange=(e)=>{
        test[e.target.name] = e.target.value
        writingTest(test)        
    }

    const handleSelect=(val, name)=>{
        test[name] = val
        writingTest(test)
    }

    const handleDate=(val,name)=>{
        test[name] = val
        writingTest(test)
    }
    console.log(test) 

    if(fetching)return <p>Loading</p>
    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>{header}</h1>
                <button onClick={saveDraft}>Guardar como borrador</button>
            </div>
            <div className="admin-form-two-columns-container">

            <form
                method="POST"
                className="admin-flex-column"
                onSubmit={handleSubmit}>
                <div className="admin-form-group">
                    <b>Evento al que pertenece</b>
                    <Select
                        name="event"
                        label="Evento al que pertenece"
                        onChange={(value)=>handleSelect(value, 'event')}                    
                        style={{ width: 300 }}
                        defaultValue="Elije un evento">
                        {events.map((event, key) => (
                            <Option key={key} value={event._id} >{event.title}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <TextField
                        onChange={handleChange}
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
                        {[1,2,3,4,5].map((n, key) => (
                            <Option key={key} value={n} >{n}min</Option>
                        ))}
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

function mapStateToProps({events, tests}) {    
    return {
        test:tests.test,
        events:events.array,
        fetching:tests.fetching    
    }
}



export default connect(mapStateToProps,{getAdminEvents, writingTest, saveTest, getSingleTest})(AdminTestForm)
