export const WRITE_USER = "WRITE_USER";
export const UPDATE_EVENTS = "UPDATE_EVENTS";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SHOW_USERS = "SHOW-USERS";
export const UPDATE_PUBLICATIONS = "UPDATE_PUBLICATIONS";

export function writeUser(value) {
  return {
    type: WRITE_USER,
    value
  };
}

export function createUser(value) {
  return {
    type: CREATE_USER,
    value
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value
  };
}

export function showUsers(value) {
  return {
    type: SHOW_USERS,
    value
  };
}

export function updateEvents(value) {
  return {
    type: UPDATE_EVENTS,
    value
  };
}

export function updatePublications(value) {
  return {
    type: UPDATE_PUBLICATIONS,
    value
  };
}
