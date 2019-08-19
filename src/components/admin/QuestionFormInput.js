import React, {useState} from 'react'
import {Radio} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import Upload from './reusables/Upload'
import ImageGalleryPicker from './reusables/ImageGalleryPicker'

const QuestionFormInput = ({_id,questions=[], handleChange, deleteQuestion, handleCorrectAnswer, handleChangeAnswer, handleImage, handleOpen}) => {


    return (
        <>
            {questions.map((q, keyQuestion)=>(
                    <div key={keyQuestion} className="test-question-form">
                        <b>{`Pregunta ${keyQuestion+1}`}</b> <span style={{cursor:'pointer'}} onClick={()=>deleteQuestion(keyQuestion)}> <FontAwesomeIcon icon={faTrash} /></span>
                        <input
                            className="test-input"
                            onChange={(e)=>handleChange(e,keyQuestion)}
                            name="question"
                            value={q.question}                            
                            placeholder="Texto de la Pregunta"                            
                        /><br/>
                        <div className="center-image-upload">
                            <b>Imágen</b>
                            <Upload onClick={()=>handleOpen(true,keyQuestion)} preview={q.imageURL?q.imageURL:null}/>
                            <ImageGalleryPicker                        
                            visible={q.open}
                            refName={`tests/${_id}}`}
                            onClose={()=>handleOpen(false,keyQuestion)} 
                            onChange={(img)=>handleImage(img,keyQuestion)}/>
                        </div>
                        <b>Respuestas</b>
                        <Radio.Group onChange={handleCorrectAnswer} name={keyQuestion} defaultValue={q.correct} style={{width:'100%'}}>
                        {q.answers.map((a, keyAnswer)=>(
                            <div key={keyAnswer}>
                                <Radio  value={a} style={{width:"97%"}}>
                                <input
                                    className="test-input answer"
                                    onChange={(e)=>handleChangeAnswer(e,keyQuestion,keyAnswer)}
                                    name="answer"
                                    label={``}
                                    value={a}                                       
                                    placeholder="Texto de la respuesta"                                
                                />
                                </Radio><br/>
                                </div>
                            
                        ))}
                        </Radio.Group>
                    </div>
                ))}
        </>
    )
}

export default QuestionFormInput
