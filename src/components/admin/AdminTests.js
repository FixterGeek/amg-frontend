import React, {useEffect} from 'react'
import AdminTestsList from './AdminTestsList';
import { connect } from 'react-redux';
import {getTests, deleteTest} from '../../store/ducks/testsDuck'
import {Link} from 'react-router-dom'

import Button from '../reusables/Button';

const AdminTests = ({
    tests=[],fetching, getTests, userIsAdmin,
    history
}) => {

    useEffect(()=>{
        getTests()
        if (!userIsAdmin) history.push('/admin/dashboard')
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
                    <Button line width="200px">Agregar test</Button>                    
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

function mapStateToProps({ tests, user }){    
    return{
        tests:tests.tests,
        fetching:tests.fetching,
        userIsAdmin: user.userType === 'Admin'
    }
}

export default connect(mapStateToProps,{getTests, deleteTest})(AdminTests)
