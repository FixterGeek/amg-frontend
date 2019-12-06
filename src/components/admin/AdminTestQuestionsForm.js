import React, {useState, useEffect} from 'react'
import { Typography } from 'antd'
import {connect} from 'react-redux'
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { writingTest, saveTest, getSingleTest, resetTest } from '../../store/ducks/testsDuck'
import QuestionFormInput from './QuestionFormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'

import Button from '../reusables/Button';


const AdminTestQuestionsForm = ({history, match, fetching, test, writingTest, getAdminEvents, saveTest, getSingleTest, resetTest}) => {
    const { Title } = Typography;        

    useEffect(() => {        
        getAdminEvents()
        let { id } = match.params
        if (id) {
            getSingleTest(id)
            
        }else{
            resetTest()
        }
    }, [])

    
    const handleImage=(img,keyQuestion)=>{        
        const question = {...test.questions[keyQuestion]}        
        question.imageURL = img
        test.questions.splice(keyQuestion,1,question)        
        writingTest(test) 
    }
    const handleOpen=(open,keyQuestion)=>{
        const question = {...test.questions[keyQuestion]}        
        question.open = open
        test.questions.splice(keyQuestion,1,question)        
        writingTest(test)
    }

    const addQuestion=()=>{
        const newQuestion = {
            question:'',
            answers:['a', 'b', 'c', 'd'],
            correct:'a'
        }
        test.questions = [...test.questions, newQuestion]
        writingTest(test)
    }

    const deleteQuestion=(idx)=>{        
        test.questions.splice(idx,1)
        writingTest(test)
    }

    
    const handleSubmit=(e, redirect=false)=>{        
        if(redirect){                       
            saveTest(test)
            history.push('/admin/tests')         
        }else{
            saveTest(test)
        }
        
    }    
    const handleChange=(e, keyQuestion)=>{
        const question = {...test.questions[keyQuestion]}        
        question.question = e.target.value
        test.questions.splice(keyQuestion,1,question)
        
        writingTest(test)        
    }  

    const handleChangeAnswer=(e,keyQuestion, keyAnswer)=>{
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
        <div className="admin-event-form-container">
            <Link to={`/admin/tests/edit/${test._id}`}>
                    Volver                
                </Link>
            <div className="admin-form-header">
                <Title>Preguntas del test {test.title}</Title>                
                <Button onClick={(e)=>handleSubmit(e)} line>
                    Guardar como borrador
                </Button>
            </div>
            <div>
                <QuestionFormInput
                    {...test}                    
                    handleOpen={handleOpen}
                    handleImage={handleImage}
                    handleCorrectAnswer={handleCorrectAnswer}
                    questions={test.questions} 
                    handleChange={handleChange} 
                    handleChangeAnswer={handleChangeAnswer}
                    deleteQuestion={deleteQuestion}/>
                <div className="tests-right-button">
                    <Button width="200px" line onClick={addQuestion}>
                        Nueva pregunta ✚
                    </Button>
                </div>                
                <div className="tests-center-button">
                    <button className="admin-form-submit-button" onClick={(e)=>handleSubmit(e,true)}>Publicar</button>
                </div>
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
