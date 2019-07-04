export const WRITE_USER = 'WRITE_USER';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';

export function writeUser(value) {
  return {
    type: WRITE_USER,
    value,
  };
}

export function updateEvents(value) {
  return {
    type: UPDATE_EVENTS,
    value,
  };
}
