import { usersService } from "../../services/users";
import { GET_USERS_SUCCESS } from "./actionTypes";

export const getAllUsersSuccess=(users)=>{
  return{
    type:GET_USERS_SUCCESS,
    users
  }
}

// thunks

export const getAllUsers =(query)=>(dispatch, getState)=>{
  return usersService.getAllUsers(query)
    .then(response=>dispatch(getAllUsersSuccess(response)))
    .catch(error=> error)
}

