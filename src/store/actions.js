export const WRITE_USER = 'WRITE_USER';
export const WRITE_USER_BASIC_DATA = 'WRITE_USER_BASIC_DATA';
export const WRITE_USER_ADDRESS = 'WRITE_USER_ADDRESS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_PUBLICATIONS = 'UPDATE_PUBLICATIONS';

export function writeUser(value) {
  return {
    type: WRITE_USER,
    value,
  };
}

export function writeUserBasicData(value) {
  return {
    type: WRITE_USER_BASIC_DATA,
    value,
  };
}

export function writeUserAddress(value) {
  return {
    type: WRITE_USER_ADDRESS,
    value,
  };
}

export function createUser(value) {
  return {
    type: CREATE_USER,
    value,
  };
}

export function updateEvents(value) {
  return {
    type: UPDATE_EVENTS,
    value,
  };
}

export function updatePublications(value) {
  return {
    type: UPDATE_PUBLICATIONS,
    value,
  };
}
