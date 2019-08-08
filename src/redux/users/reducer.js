import { GET_USERS_SUCCESS } from './actionTypes'


const usersReducer = (state=[], action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:                
        return [...action.users]
    default:
      return state;
  }
}

export default usersReducer

