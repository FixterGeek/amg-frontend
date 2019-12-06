import React, {useState, useEffect} from 'react'
import TextField from '../reusables/TextField';
import {Select, DatePicker, Typography, Popconfirm } from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest, resetTest, deleteTest } from '../../store/ducks/testsDuck'
import toastr from 'toastr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import Button from '../reusables/Button';
import Spinner from '../reusables/Spinner';


const { Option } = Select


const AdminTestForm = ({history, match, location, fetching, test, events, writingTest, getAdminEvents, saveTest, getSingleTest, resetTest, deleteTest}) => {
    
    const { Title } = Typography;
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

    return (
        <div className="admin-event-form-container">
            { fetching && <Spinner fullScrren /> }
            <div className="admin-form-header">
                <Title style={{ flexGrow: 1 }}>{header}</Title>
                <Popconfirm
                    placement="bottom"
                    okText="SI"
                    cancelText="NO"
                    title={`¿Eliminar ${test.title}?`}
                    onConfirm={() => removeTest()}
                >
                    <Button
                        marginBottom="0px"
                        marginTop="0px"
                        htmlType="button"
                        line
                        bgColor="red"
                        width="200px"
                        style={{ marginRight: 32 }}>
                        Eliminar test
                    </Button>
                </Popconfirm>
                <Button
                    marginBottom="0px"
                    marginTop="0px"
                    onClick={(e)=>handleSubmit(e,true)}
                    line >
                    Guardar como borrador <FontAwesomeIcon icon={faSave} />
                </Button>
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
                        style={{ width: 400 }}
                        defaultValue={(test.event && test.event._id)? test.event._id:test.event? test.event:'Elige un evento'}>
                        {events.filter(e => e.status === 'published').map((event, key) => (
                            <Option key={key} value={event._id} >{event.title}</Option>
                        ))}
                    </Select>
                </div>
                <div className="admin-form-group">
                    <TextField
                        onChange={handleChange}
                        name="title"
                        value={test.title}
                        label="Nombre del test"
                        placeholder="Test 001"
                        style={{ width: 400 }}
                    />
                </div>
                {/* <div className="admin-form-group">    
                    <b>Fecha</b>                
                    <DatePicker
                        className="test-input"               
                        label="Fecha"
                        onChange={m => handleDate(m, "date")}
                        style={{ width: 400 }}
                        format="LL"
                        placeholder="Selecciona la fecha"
                        value={test.date ? moment(test.date) : null}
                    />
                </div> */}
                <div className="admin-form-group">    
                    <b>Horario disponible</b>
                    <div className="admin-test-rage-date">
                        <div>
                            <b>De</b>
                            <DatePicker
                                className="test-input"
                                onChange={m => handleDate(m, "startTime")}
                                placeholder="Inicio"
                                format="LLLL"
                                style={{ width: 400 }}
                                value={test.startTime ? moment(test.startTime) : null}
                            />
                        </div>
                        <div>
                            <b>A</b>        
                            <DatePicker
                                className="test-input"
                                onChange={m => handleDate(m, "endTime")}
                                placeholder="Final"
                                format="LLLL"
                                style={{ width: 400 }}
                                value={test.endTime ? moment(test.endTime) : null}
                            />
                        </div>
                    </div>
                    
                    </div>
                
                    <div className="admin-form-group">    
                    <b>Límite de tiempo por pregunta</b>
                    <Select
                        className="test-input"
                        onChange={val => handleSelect(val, "questionDuration")}                    
                        style={{ width: 400 }}
                        defaultValue={test.questionDuration||"Elije el tiempo"}>
                        {[1,2,3,4,5].map((n, key) => (
                            <Option key={key} value={n} >{n}min</Option>
                        ))}
                    </Select>
                    </div>

                    <div className="admin-form-group" style={{ minWidth: 404 }}>
                        <Button width="100%" htmlType="submit">
                            Siguiente
                        </Button>   
                        {/* <input      
                            style={{ width: 400 }}              
                            className="admin-form-submit-button"
                            type="submit" value="Siguiente" /> */}
                    </div>
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
