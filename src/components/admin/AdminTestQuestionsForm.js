import React, {useState, useEffect} from 'react'
import TextField from '../../molecules/TextFields'
import {TimePicker,Select, Icon,Skeleton, DatePicker} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest, resetTest } from '../../store/ducks/testsDuck'


const { Option } = Select


const AdminTestQuestionsForm = ({history, match, fetching, test, writingTest, getAdminEvents, saveTest, getSingleTest, resetTest}) => {
    

    const [header, setHeader] = useState("Agregar Preguntas")
    //const [test, setTest] = useState(testMock)

    useEffect(() => {        
        getAdminEvents()
        let { id } = match.params
        if (id) {
            getSingleTest(id)
            setHeader("Preguntas del Test " + test.title)
        }
    }, [])

    
    const handleSubmit=(e, isDraft=false)=>{
        console.log(e)
        if(e && !isDraft){
            e.preventDefault()
            if(test.event && test.event._id)test.event = test.event._id
            saveTest(test)
            if(test._id)history.push(`/admin/tests/${test._id}/questions/`)          
            else history.push('/admin/tests/questions')
        }else{
            saveTest(test)
        }
        
    }    
    const handleChange=(e)=>{
        test[e.target.name] = e.target.value
        writingTest(test)        
    }
    
    console.log(test) 

    if(fetching)return <p>Loading</p>
    return (
        <div className="">
            <div className="admin-form-header">
                <h1>{header}</h1>
                <button onClick={(e)=>handleSubmit(e,true)}>Guardar como borrador</button>
            </div>
            <div>
                {test.questions.map((q, key)=>(
                    <div>
                        <TextField
                            onChange={handleChange}
                            name="question"
                            value={q.question}
                            label={`Pregunta ${key+1}`}
                            placeholder="Texto de la Pregunta"                            
                        /><br/>
                        <b>Respuestas</b>
                        {q.answers.map((a, key)=>(
                            <div key={key}>
                                <TextField
                                onChange={handleChange}
                                name="answer"
                                label={``}
                                value={a}                            
                                placeholder="Texto de la respuesta"                                
                            /><br/>
                            </div>
                        ))}
                    </div>
                ))}
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



export default connect(mapStateToProps,{getAdminEvents, writingTest, saveTest, getSingleTest, resetTest})(AdminTestQuestionsForm)
