import React, {useState, useEffect} from 'react'
import TextField from '../../molecules/TextFields'
import {TimePicker,Select, Icon,Skeleton, DatePicker} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest, resetTest, deleteTest } from '../../store/ducks/testsDuck'
import toastr from 'toastr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';


const { Option } = Select


const AdminTestForm = ({history, match, location, fetching, test, events, writingTest, getAdminEvents, saveTest, getSingleTest, resetTest, deleteTest}) => {
    

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

    
    const handleSubmit=(e, isDraft=false)=> {        
        if(e && !isDraft){
            e.preventDefault()
            if(!test._id)return toastr.warning('Guarda primero como Borrador')
            saveTest(test)
            history.push(`/admin/tests/${test._id}/questions/`)            
        }else{
            saveTest(test)
        }
        
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

    const removeTest=()=>{
        deleteTest(test._id)
        history.push('/admin/tests')
    }

    if(fetching)return <p>Loading</p>
    return (
        <div className="admin-event-form-container">
            <div className="admin-form-header">
                <h1>{header}</h1>
                <div>
                    <button onClick={(e)=>handleSubmit(e,true)}>Guardar como borrador <FontAwesomeIcon icon={faSave} /></button>
                    {test._id && <button style={{ color: "white", background: "red" }} onClick={removeTest} >Eliminar Test</button>}
                </div>
            </div>
            <div className="admin-form-two-columns-container">

            <form
                method="POST"
                className="admin-flex-column"
                onSubmit={handleSubmit}>
                <div className="admin-form-group">
                    <b>Evento al que pertenece</b>
                    <Select
                        className="test-input"
                        name="event"
                        label="Evento al que pertenece"
                        onChange={(value)=>handleSelect(value, 'event')}                    
                        style={{ width: 300 }}
                        defaultValue={(test.event && test.event._id)||"Elije un evento"}>
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
                        className="test-input"               
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
                        className="test-input"
                        onChange={m => handleDate(m, "startTime")}
                        placeholder="Inicio"
                        style={{ width: 130 }}
                        value={test.startTime ? moment(test.startTime) : null}
                    />
                    <span>A</span>        
                    <TimePicker
                        className="test-input"
                        onChange={m => handleDate(m, "endTime")}
                        placeholder="Final"
                        style={{ width: 130 }}
                        value={test.endTime ? moment(test.endTime) : null}
                    />
                </div>
                
                    <b>Límite de tiempo por pregunta</b>
                    <Select
                        className="test-input"
                        onChange={val => handleSelect(val, "questionDuration")}                    
                        style={{ width: 300 }}
                        defaultValue={test.questionDuration||"Elije el tiempo"}>
                        {[1,2,3,4,5].map((n, key) => (
                            <Option key={key} value={n} >{n}min</Option>
                        ))}
                    </Select>
                
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



export default connect(mapStateToProps,{getAdminEvents, writingTest, saveTest, getSingleTest, resetTest, deleteTest})(AdminTestForm)
