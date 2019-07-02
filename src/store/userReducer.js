import { WRITE_USER, CREATE_USER } from "./actions";

const userState = {
  email: "",
  password: "",
  userToken: ""
};

function userReducer(state = userState, action) {
  switch (action.type) {
    case WRITE_USER:
      return { ...state, ...action.value };
    case CREATE_USER:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  userReducer
};
