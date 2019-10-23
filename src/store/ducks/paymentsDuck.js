import { combineReducers } from 'redux';
import {
  payment,
  getPaymentsByUser,
  getPayments,
} from '../../services/paymentServices';
import { makeInvoice } from '../../services/invoicesServices';
import useSweet from '../../hooks/useSweetAlert';

const paymetState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
  errorMessage: null,
};


/* Constants */
const RESET_PAYMENT_STATUS = 'RESET_PAYMENT_STATUS';

const MAKE_PAYMENT = 'MAKE_PAYMENT';
const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
const MAKE_PAYMENT_ERROR = 'MAKE_PAYMENT_ERROR';

const POPULATE_PAYMENTS = 'POPULATE_PAYMENTS';
const POPULATE_PAYMENTS_SUCCESS = 'POPPULATE_PAYMENTS_SUCCESS';
const POPULATE_PAYMENTS_ERROR = 'POPULATE_PAYMENTS_ERROR';

const MAKE_PAYMENT_INVOICE = 'MAKE_PAYMENT_INVOICE';
const MAKE_PAYMENT_INVOICE_SUCCESS = 'MAKE_PAYMENT_INVOICE_SUCCESS';
const MAKE_PAYMENT_INVOICE_ERROR = 'MAKE_PAYMENT_INVOICE_ERROR';


/* Action creators */
// Reset payment status
export function resetPaymentStatus() {
  return { type: RESET_PAYMENT_STATUS };
}

// Make payment
export function makePayment() {
  return { type: MAKE_PAYMENT };
}

export function makePaymentSuccess(paymentData) {
  return { type: MAKE_PAYMENT_SUCCESS, payload: paymentData };
}

export function makePaymentError(error) {
  return { type: MAKE_PAYMENT_ERROR, payload: error };
}

// Populate payments
export function populatePayments() {
  return { type: POPULATE_PAYMENTS };
}

export function populatePaymentsSuccess(paymentsArray) {
  return { type: POPULATE_PAYMENTS_SUCCESS, payload: paymentsArray };
}

export function populatePaymentsError(error) {
  return { type: POPULATE_PAYMENTS_ERROR, payload: error };
}

// Make invoice
export function makePaymentInvoice() {
  return { type: MAKE_PAYMENT_INVOICE };
}

export function makePaymentInvoiceSuccess(invoiceData) {
  return { type: MAKE_PAYMENT_INVOICE_SUCCESS, payload: invoiceData };
}

export function makePaymentInvoiceError(error) {
  return { type: MAKE_PAYMENT_INVOICE_ERROR, payload: error };
}


/* Thunks */
// Make payment
export const makePaymentAction = (paymentData, paymentType = 'event') => (dispatch) => {
  dispatch(makePayment());
  return payment(paymentData, paymentType)
    .then((data) => {
      useSweet().successAlert({ text: data.paid ? 'Pago realizado' : 'Pago pendiente' });
      dispatch(makePaymentSuccess(data));
      return data;
    })
    .catch((error) => {
      useSweet().errorAlert({ text: 'Error al realizar el cobro' });
      dispatch(makePaymentError(error));
      return error;
    });
};

// Populate payments action
export const populatePaymentsAction = userId => (dispatch) => {
  dispatch(populatePayments());
  if (!localStorage.payments) {
    return getPaymentsByUser(userId)
      .then((data) => {
        let localPayments = localStorage.payments ? JSON.parse(localStorage.payments) : [];
        localPayments = [...data , ...localPayments]
        localStorage.payments = JSON.stringify(localPayments);

        dispatch(populatePaymentsSuccess(localPayments));
        return data;
      })
      .catch((error) => {
        useSweet().errorAlert({});
        dispatch(populatePaymentsError(error));
        return error;
      });
  } else {
    const localPayments = JSON.parse(localStorage.payments);
    dispatch(populatePaymentsSuccess(localPayments));
    return localPayments;
  }
}


// make invoice
export const makePaymentInvoiceAction = (paymentId) => (dispatch) => {
  dispatch(makePaymentInvoice());
  return makeInvoice(paymentId)
    .then((data) => {
      dispatch(makePaymentInvoiceSuccess(data));
      return data;
    })
    .catch((error) => {
      const { response = {} } = error;
      const { data = {} } = response;
      const { errors } = data;

      if (errors) useSweet().errorAlert({ text: JSON.stringify(errors) });
      else useSweet().errorAlert({ text: 'No fue posible generar la factura' });
      dispatch(makePaymentInvoiceError(data ? data : error));
      return data || error;
    });
}


/* reducer */
export function reducer(state = paymetState, action) {
  switch (action.type) {
    case RESET_PAYMENT_STATUS:
      return { ...state, status: null, fetching: false };
    /* Make payment */
    case MAKE_PAYMENT:
      return { ...state, fetching: true };
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        fetching: false,
        array: [...state.array, action.payload],
        status: 'success',
      };
    case MAKE_PAYMENT_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        status: 'error',
      };
    /* Pupulate payments */
    case POPULATE_PAYMENTS:
      return { ...state, fetching: true };
    case POPULATE_PAYMENTS_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: action.payload,
        noData: action.payload.length === 0,
      };
    /* Make payment invoice */
    case MAKE_PAYMENT_INVOICE:
      return { ...state, fetching: true };
    case MAKE_PAYMENT_INVOICE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case MAKE_PAYMENT_INVOICE_ERROR:
      return { ...state, fetching: false, status: 'error' };
    default:
      return state;
  }
}


/** Admin Payments **/
/* Constant */
const POPULATE_ADMIN_PAYMENTS = 'POPULATE_ADMIN_PAYMENTS';
const POPULATE_ADMIN_PAYMENTS_SUCCESS = 'POPULATE_ADMIN_PAYMENTS_SUCCESS';
const POPULATE_ADMIN_PAYMENTS_ERROR = 'POPULATE_ADMIN_PAYMENTS_ERROR';


/* Actions creators */
export function populateAdminPayments() {
  return { type: POPULATE_ADMIN_PAYMENTS };
}

export function populateAdminPaymentsSuccess(paymentsArray) {
  return { type: POPULATE_ADMIN_PAYMENTS_SUCCESS, payload: paymentsArray };
}

export function populateAdminPaymentsError(error) {
  return { type: POPULATE_ADMIN_PAYMENTS_ERROR, payload: error };
}


/* Thunks */
// populate admin payments
export const populateAdminPaymentsAction = () => (dispatch) => {
  dispatch(populateAdminPayments());
  return getPayments()
    .then((paymentsArray) => {
      dispatch(populateAdminPaymentsSuccess(paymentsArray));
      return paymentsArray;
    })
    .catch((error) => {
      useSweet().errorAlert({});
      dispatch(populateAdminPaymentsError(error));
      return error;
    });
}


/* Admin reducer */
const adminState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
}

export function adminReducer(state = adminState, action) {
  switch (action.type) {
    case POPULATE_ADMIN_PAYMENTS:
      return { ...state, fetching: true };
    case POPULATE_ADMIN_PAYMENTS_SUCCESS:
      return {
        ...state, fetching: false, status: 'success',
        array: [...state.array, ...action.payload],
        noData: action.payload.length === 0,
      };
    case POPULATE_ADMIN_PAYMENTS_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload };
    default:
      return state;
  }
}

export default combineReducers({ payment: reducer, adminPayment: adminReducer });
