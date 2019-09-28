import {
  getDataFacturacion,
  makeInvoice,
} from '../../services/invoicesServices';
import useSweet from '../../hooks/useSweetAlert';

const invoicesState = {
  array: [],
  noData: false,
  fiscalData: {},
  fetching: false,
  status: null,
}

/* Constants */
const RESET_INVOICES_STATUS = 'RESET_INVOICES_STATUS';

const POPULATE_FISCAL_DATA = 'POPULATE_FISCAL_DATA';
const POPULATE_FISCAL_DATA_SUCCESS = 'POPULATE_FISCAL_DATA_SUCCESS';
const POPULATE_FISCAL_DATA_ERROR = 'POPULATE_FISCAL_DATA_ERROR';

const POPULATE_INVOICES = 'POPULATE_INVOICES';
const POPULATE_INVOICES_SUCCESS = 'POPULATE_INVOICES_SUCCESS';
const POPULATE_INVOICES_ERROR = 'POPULATE_INVOICES_ERROR';

const CREATE_INVOICE = 'CREATE_INVOICE';
const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';
const CREATE_INVOICE_ERROR = 'CREATE_INVOICE_ERROR';


/* Actions creators */
//  Reset invoices status
export function resetInvoicesStatus() {
  return { type: RESET_INVOICES_STATUS }
}

// Populate fiscal data
export function populateFiscalData() {
  return { type: POPULATE_FISCAL_DATA };
}

export function populateFiscalDataSuccess(fiscalData) {
  return { type: POPULATE_FISCAL_DATA_SUCCESS, payload: fiscalData };
}

export function populateFiscalDataError(error) {
  return { type: POPULATE_FISCAL_DATA_SUCCESS, payload: error };
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

// Create invoice
export function createInvoice() {
  return { type: CREATE_INVOICE };
}

export function createInvoiceSuccess(invoiceData) {
  return { type: CREATE_INVOICE_SUCCESS, payload: invoiceData };
}

export function createInvoiceError(error) {
  return { type: CREATE_INVOICE_ERROR, payload: error };
}


/* Thunks */
// Populate Fiscal data
export const populateFiscalDataAction = () => (dispatch) => {
  dispatch(populateFiscalData());
  return getDataFacturacion()
    .then((data) => {
      dispatch(populateFiscalDataSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populateFiscalDataError(error));
      return error;
    })
}

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

// Create invoice
export const createInvoiceAction = paymentId => (dispatch) => {
  dispatch(createInvoice());
  return makeInvoice(paymentId)
    .then((invoiceData) => {
      dispatch(createInvoiceSuccess(invoiceData));
      return invoiceData;
    })
    .catch((error) => {
      const { response } = error;
      const { data } = response;

      useSweet().errorAlert({ text: data.message ? data.message : 'No fue posible realizar la facturación' });
      dispatch(createInvoiceError(error));
      return error;
    })
}


/* Reduceer */
export default function reducer(state = invoicesState, action) {
  switch (action.type) {
    /* Reset status */
    case RESET_INVOICES_STATUS:
      return { ...state, status: null };
    case POPULATE_FISCAL_DATA:
      return { ...state, fetching: true };
    case POPULATE_FISCAL_DATA_SUCCESS:
      return { ...state, fetching: false, status: 'success', fiscalData: { ...action.payload } };
    case POPULATE_FISCAL_DATA_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload }
    /* Populate invoices */
    case POPULATE_INVOICES:
      return { ...state, fetching: true };
    case POPULATE_INVOICES_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [...state.array],
        noData: action.payload.length === 0,
      };
    case POPULATE_INVOICES_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload }
    /* Create invoive */
    case CREATE_INVOICE:
      return { ...state, fetching: true };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [action.payload, ...state.array],
      }
    case CREATE_INVOICE_ERROR:
      return { ...state, fetching: false, status: 'error' };
    default:
      return state;
  }
}
