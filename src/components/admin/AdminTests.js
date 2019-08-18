import React, {useEffect} from 'react'
import AdminTestsList from './AdminTestsList';
import { connect } from 'react-redux';
import {getTests} from '../../store/ducks/testsDuck'
import {Link} from 'react-router-dom'

const AdminTests = ({tests=[],fetching, getTests}) => {

    useEffect(()=>{
        getTests()
    },[])

    if(fetching)return <p>Loading</p>
    return (
        <div>
            <div className="admin-form-header">
                <h1>Mis Tests</h1>
                <Link to="/admin/tests/new" className="admin-main-button">Nuevo Test</Link>
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
