import React, {useEffect} from 'react'
import AdminTestsList from './AdminTestsList';
import { connect } from 'react-redux';
import {getTests, deleteTest} from '../../store/ducks/testsDuck'
import {Link} from 'react-router-dom'

const AdminTests = ({tests=[],fetching, getTests}) => {

    useEffect(()=>{
        getTests()
    },[])

    const removeTest=(testId)=>{        
        //deleteTest(testId)
    }

    if(fetching)return <p>Loading</p>
    return (
        <div>
            <article className="admin-main-header" >
                <h1>Tests</h1>
                <Link to="/admin/tests/new">
                    <button className="admin-main-button">Agregar test</button>                    
                </Link>                
            </article>
            <div>
                <div className="admin-event-card-container">
                    <AdminTestsList tests={tests} removeTest={removeTest}/>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({tests}){    
    return{
        tests:tests.tests,
        fetching:tests.fetching
    }
}

export default connect(mapStateToProps,{getTests, deleteTest})(AdminTests)
