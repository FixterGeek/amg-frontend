import React, {useEffect} from 'react'
import AdminTestsList from './AdminTestsList';
import { connect } from 'react-redux';
import {getTests} from '../../store/ducks/testsDuck'

const AdminTests = ({tests=[],fetching, getTests}) => {

    useEffect(()=>{
        getTests()
    },[])

    if(fetching)return <p>Loading</p>
    return (
        <div>
            <div className="admin-form-header">
                <h1>Mis Tests</h1>
                <button>Nuevo Test</button>
            </div>
            <div>
                <div className="admin-event-card-container">
                    <AdminTestsList tests={tests}/>
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

export default connect(mapStateToProps,{getTests})(AdminTests)
