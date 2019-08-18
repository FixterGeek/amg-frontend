import React, {useState, useEffect} from 'react'
import TextField from '../../molecules/TextFields'
import {Select} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest, resetTest } from '../../store/ducks/testsDuck'
import QuestionFormInput from './QuestionFormInput';


const { Option } = Select


const AdminTestQuestionsForm = ({history, match, fetching, test, writingTest, getAdminEvents, saveTest, getSingleTest, resetTest}) => {
        

    useEffect(() => {        
        getAdminEvents()
        let { id } = match.params
        if (id) {
            getSingleTest(id)
            
        }else{
            resetTest()
        }
    }, [])

    const addQuestion=()=>{
        const newQuestion = {
            question:'',
            answers:['a', 'b'],
            correct:'a'
        }
        test.questions = [...test.questions, newQuestion]
        writingTest(test)
    }

    const deleteQuestion=(idx)=>{
        console.log('deleting')      
        test.questions.splice(idx,1)
        writingTest(test)
    }

    
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
    const handleChange=(e, keyQuestion)=>{
        console.log(keyQuestion)
        const question = {...test.questions[keyQuestion]}        
        question.question = e.target.value
        test.questions.splice(keyQuestion,1,question)
        
        writingTest(test)        
    }  

    const handleChangeAnswer=(e,keyQuestion, keyAnswer)=>{
        console.log(keyAnswer,keyQuestion)
        const question = {...test.questions[keyQuestion]}                            
        question.answers[keyAnswer] = e.target.value           
        test.questions.splice(keyQuestion,1,question)
        
        writingTest(test)  
    }
    
    const handleCorrectAnswer=(e)=>{        
        const question = {...test.questions[e.target.name]}
        question.correct = e.target.value
        test.questions.splice(e.target.name,1,question)
        writingTest(test)
    }
    if(fetching)return <p>Loading</p>
    return (
        <div className="">
            <div className="admin-form-header">
                <h1>Preguntas del test {test.title}</h1>
                <button onClick={(e)=>handleSubmit(e,true)}>Guardar como borrador</button>
            </div>
            <div>
                <QuestionFormInput 
                    handleCorrectAnswer={handleCorrectAnswer}
                    questions={test.questions} 
                    handleChange={handleChange} 
                    handleChangeAnswer={handleChangeAnswer}
                    deleteQuestion={deleteQuestion}/>
                <button className="admin-main-button" onClick={addQuestion}>Agregar pregunta +</button>
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
