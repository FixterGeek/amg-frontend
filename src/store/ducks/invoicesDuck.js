import { getDataFacturacion } from '../../services/invoicesServices';

const invoicesState = {
  array: [],
  fetching: false,
  status: null,
}

/* Constants */
const RESET_INVOICES_STATUS = 'RESET_INVOICES_STATUS';

const POPULATE_INVOICES = 'POPULATE_INVOICES';
const POPULATE_INVOICES_SUCCESS = 'POPULATE_INVOICES_SUCCESS';
const POPULATE_INVOICES_ERROR = 'POPULATE_INVOICES_ERROR';


/* Actions creators */
//  Reset invoices status
export function resetInvoicesStatus() {
  return { type: RESET_INVOICES_STATUS }
}

// Populate invoices
export function populateInvoices() {
  return { type: POPULATE_INVOICES };
}

export function populateInvoicesSuccess(invoicesArray) {
  return { type: POPULATE_INVOICES_SUCCESS, payload: invoicesArray };
}

export function populateInvoicesError(error) {
  return { type: POPULATE_INVOICES_ERROR, payload: error };
}


/* Thunks */
// Populate invoices
export const populateInvoicesAction = () => (dispatch) => {
  dispatch(populateInvoices());
  return getDataFacturacion()
    .then((invoicesArray) => {
      dispatch(populateInvoicesSuccess(invoicesArray));
      return invoicesArray;
    })
    .catch((error) => {
      dispatch(populateInvoicesError(error));
      return error;
    })
}

populateInvoicesAction.prototype.resetStatus = resetInvoicesStatus();


/* Reduceer */
export default function reducer(state = invoicesState, action) {
  switch (action.tpe) {
    /* Reset status */
    case RESET_INVOICES_STATUS:
      return { ...state, status: null };
    /* Populate invoices */
    case POPULATE_INVOICES:
      return { ...state, fetching: true };
    case POPULATE_INVOICES_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [...state.array, ...action.payload],
      };
    case POPULATE_INVOICES_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload }
    default:
      return state;
  }
}
