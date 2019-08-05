export const WRITE_USER = 'WRITE_USER';

export function writeUser(value) {
  return {
    type: WRITE_USER,
    value,
  };
}
