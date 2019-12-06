import {
  getDataFacturacion,
  makeInvoice,
  getInvoices,
  cancelInvoice,
  manualInvoice,
} from '../../services/invoicesServices';
import useSweet from '../../hooks/useSweetAlert';
import { errorAction, successAction } from './tools';

const invoicesState = {
  array: [],
  noData: false,
  fiscalData: {},
  fetching: false,
  status: null,
}

/* Constants */
const PREFIX = 'INVOICES';
const RESET_INVOICES_STATUS = 'RESET_INVOICES_STATUS';
const FETCHING = `${PREFIX}/FETCHING`;
const FETCHING_ERROR = `${PREFIX}/FETCHING_ERROR`;

const POPULATE_FISCAL_DATA = 'POPULATE_FISCAL_DATA';
const POPULATE_FISCAL_DATA_SUCCESS = 'POPULATE_FISCAL_DATA_SUCCESS';
const POPULATE_FISCAL_DATA_ERROR = 'POPULATE_FISCAL_DATA_ERROR';

const POPULATE_INVOICES = 'POPULATE_INVOICES';
const POPULATE_INVOICES_SUCCESS = 'POPULATE_INVOICES_SUCCESS';
const POPULATE_INVOICES_ERROR = 'POPULATE_INVOICES_ERROR';

const POPULATE_EXTERNAL_INVOICES = `${PREFIX}/POPULATE_EXTERNAL_INVOICES`;

const CREATE_INVOICE = 'CREATE_INVOICE';
const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';
const CREATE_INVOICE_ERROR = 'CREATE_INVOICE_ERROR';

const CANCEL_INVOICE = `${PREFIX}/CANCEL_INVOICE`;

const MANUAL_INVOICE = `${PREFIX}/MANUAL_INVOICE`;


/* Actions creators */
//  Reset invoices status
export const resetInvoicesStatus = () => ({ type: RESET_INVOICES_STATUS });
export const fetching = () => ({ type: FETCHING });
export const fetchingError = error => ({ type: FETCHING_ERROR, payload: error });


// Populate fiscal data
export const populateFiscalData = () => ({ type: POPULATE_FISCAL_DATA });

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

const populateExternalInvoicesAction = (invoicesData) => ({
  type: POPULATE_EXTERNAL_INVOICES, payload: invoicesData,
})

const cancelInvoiceAction = canceledInvoice => ({
  type: CANCEL_INVOICE, payload: canceledInvoice,
});

const manualInvoiceAction = createdInvoice => ({
  type: MANUAL_INVOICE, payload: createdInvoice,
});


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


// Populate externals
export const populateExternalInvoices = () => (dispatch) => {
  dispatch(fetching());
  return getInvoices()
    .then(data => successAction(
      dispatch, populateExternalInvoicesAction, data, RESET_INVOICES_STATUS, false,
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_INVOICES_STATUS, 'Facturas no disponibles'
    ));
};


export const cancelInvoiceThunk = invoiceId => (dispatch) => {
  dispatch(fetching());
  return cancelInvoice(invoiceId)
    .then((data) => successAction(
      dispatch, cancelInvoiceAction, data, RESET_INVOICES_STATUS, 'Factura cancelada',
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_INVOICES_STATUS, 'Error al cancelar',
    ));
}


export const makeManualInvoice = invoiceData => (dispatch) => {
  dispatch(fetching());
  return manualInvoice(invoiceData)
    .then(data => successAction(
      dispatch, manualInvoiceAction, data, RESET_INVOICES_STATUS, 'Factura realizada',
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_INVOICES_STATUS, 'Error al facturar',
    ));
};


/* Reduceer */
export default function reducer(state = invoicesState, action) {
  switch (action.type) {
    /* Reset status */
    case RESET_INVOICES_STATUS:
      return { ...state, status: null, fetching: false };
    case FETCHING:
      return { ...state, fetching: true };
    case FETCHING_ERROR:
      return { ...state, status: 'error', fetching: false, error: action.payload };

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
    
    case POPULATE_EXTERNAL_INVOICES:
      return { ...state, status: 'success', array: action.payload };
    case CANCEL_INVOICE:
      return { ...state, status: 'success', array: state.array.filter(i => i.uuid !== action.payload.uuid) };
    case MANUAL_INVOICE:
      return {
        ...state, status: 'success', array: [action.payload, ...state.array],
      };
    default:
      return state;
  }
}
