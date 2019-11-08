import { combineReducers } from 'redux';
import {
  payment,
  getPaymentsByUser,
  getPayments,
  postPaymentFromSubsidiary,
  getSubsidiaryPayments,
  patchPaymentForSubsidiary,
} from '../../services/paymentServices';
import { makeInvoice } from '../../services/invoicesServices';
import useSweet from '../../hooks/useSweetAlert';
import { successAction, errorAction } from './tools';

const working = {
  user: null,
  users: [],
  chat: {
    messages: [],
  },
  concept: null,
  amount: 0,
  paid: false,
  paymentType: 'Subscription',
  recipetURL: '',
  receiptFile: null,
  filial: null,
};

const paymetState = {
  array: [],
  subsidiaryPayments: [],
  noData: false,
  fetching: false,
  status: null,
  errorMessage: null,
  workingOn: working,
};


/* Constants */
const PREFIX = 'PAYMENT';
const RESET_PAYMENT_STATUS = `${PREFIX}/RESET_PAYMENT_STATUS`;
const FETCHING = `${PREFIX}/FETCHING`;
const FETCHING_ERROR = `${PREFIX}/FETCHING_ERROR`;
const WORKING_ON = `${PREFIX}/WORKING`;

const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
const POPULATE_PAYMENTS_SUCCESS = 'POPPULATE_PAYMENTS_SUCCESS';
const PAYMENT_FOR_FILIAL_SUCCESS = `${PREFIX}/PAYMENT_FOR_FILIAL_SUCCESS`;
const UPDATE_PAYMENT_FOR_FILIAL_SUCCESS = `${PREFIX}/UPDATE_PAYMENT_FOR_FILIAL_SUCCESS`;
const POPULATE_SUBSIDIARY_PAYMENTS = `${PREFIX}/POPULATE_SUBSIDIARY_PAYMENTS`;

const MAKE_PAYMENT_INVOICE = 'MAKE_PAYMENT_INVOICE';
const MAKE_PAYMENT_INVOICE_SUCCESS = 'MAKE_PAYMENT_INVOICE_SUCCESS';
const MAKE_PAYMENT_INVOICE_ERROR = 'MAKE_PAYMENT_INVOICE_ERROR';


/* Action creators */
// Reset payment status
export const resetPaymentStatus = () => ({ type: RESET_PAYMENT_STATUS });

export const fetching = () => ({ type: FETCHING });

export const fetchingError = (error) => ({ type: FETCHING_ERROR, payload: error });

export const workingOn = (working, name, value) => {
  if (name === 'chat') return {
    type: WORKING_ON,
    payload: { ...working, chat: { messages: [...working.chat.messages, value] } }
  };
  return { type: WORKING_ON, payload: { ...working, [name]: value }}
};

export const setWorkingOn = (payment) => {
  console.log('here!!!', payment);
  return { type: WORKING_ON, payload: payment };
};

// Make payment
const makePaymentSuccess = (paymentData) => ({ type: MAKE_PAYMENT_SUCCESS, payload: paymentData });

// CREATE OR UPDATE PAYMENT FOR FILIAL
const paymentForFilialSuccess = (paymentData) => ({ type: PAYMENT_FOR_FILIAL_SUCCESS, payload: paymentData });
const updatePaymentForFilialSuccess = (updatedPayment) => ({ type: UPDATE_PAYMENT_FOR_FILIAL_SUCCESS, payload: updatedPayment });

// Populate payments
const populatePaymentsSuccess =(paymentsArray) => ({ type: POPULATE_PAYMENTS_SUCCESS, payload: paymentsArray });
// Populate subsidiary payments
const populateSunsidiaryPaymentsSuccess = (array) => ({ type: POPULATE_SUBSIDIARY_PAYMENTS , payload: array })

// Make invoice
const makePaymentInvoiceSuccess = (invoiceData) => ({ type: MAKE_PAYMENT_INVOICE_SUCCESS, payload: invoiceData });


/* Thunks */
// Make payment
export const makePaymentAction = (paymentData, paymentType = 'event') => (dispatch) => {
  dispatch(fetching());
  return payment(paymentData, paymentType)
    .then(({ conektaOrder, payment }) => {
      console.log(conektaOrder);
      useSweet().successAlert({ text: conektaOrder.payment_status === 'paid' ? 'Pago realizado' : 'Pago pendiente' });
      dispatch(makePaymentSuccess({payment, conektaPaid: conektaOrder.payment_status}));
      return {payment, conektaOrder};
    })
    .catch((error) => {
      useSweet().errorAlert({ text: 'Error al realizar el cobro' });
      dispatch(fetchingError(error));
      return error;
    });
};


// For filiales
export const populateSubsidiaryPayments = subsidiaryId => (dispatch) => {
  dispatch(fetching());
  return getSubsidiaryPayments(subsidiaryId)
    .then(data => successAction(
      dispatch, populateSunsidiaryPaymentsSuccess, data, RESET_PAYMENT_STATUS, false,
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_PAYMENT_STATUS, 'Los pagos no estan disponibles por el momento',
    ));
};

export const createOrUpdateFilialPayment = (paymentData) => (dispatch) => {
  dispatch(fetching());
  if (!paymentData._id) return postPaymentFromSubsidiary(paymentData)
    .then((data) => successAction(
      dispatch, paymentForFilialSuccess, data, RESET_PAYMENT_STATUS, 'El comprobante fue enviado a AMG',
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_PAYMENT_STATUS, 'No fue posible enviar el comprobante',
    ));

  return patchPaymentForSubsidiary(paymentData._id, paymentData)
    .then(data => successAction(
      dispatch, updatePaymentForFilialSuccess, data, RESET_PAYMENT_STATUS, 'El pago fue actualizado',
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_PAYMENT_STATUS, 'No fue posible actualizar el pago',
    ));
};

// Populate payments action
export const populatePaymentsAction = userId => (dispatch) => {
  dispatch(fetching());
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
        dispatch(fetchingError(error));
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
  dispatch(fetching());
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
      dispatch(fetchingError(data ? data : error));
      return data || error;
    });
}


/* reducer */
export function reducer(state = paymetState, action) {
  switch (action.type) {
    case RESET_PAYMENT_STATUS:
      return { ...state, status: null, fetching: false };
    case FETCHING:
      return { ...state, fetching: true };
    case FETCHING_ERROR:
      return { ...state, status: 'error', error: action.payload };
    case WORKING_ON:
      console.log(action.payload);
      return { ...state, workingOn: action.payload };

    /* Make payment */
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state, fetching: false, array: [...state.array, action.payload],
        status: action.payload.conektaPaid,
      };
    /* Pupulate payments */
    case POPULATE_PAYMENTS_SUCCESS:
      return {
        ...state, fetching: false, status: 'success', array: action.payload,
        noData: action.payload.length === 0,
      };

    /* PYMENTS FOR FILIAL */
    case POPULATE_SUBSIDIARY_PAYMENTS:
      return { ...state, status: 'success', subsidiaryPayments: action.payload.length === 0 ? ['empty'] : action.payload };
    case PAYMENT_FOR_FILIAL_SUCCESS:
        return { ...state, status: 'success', array: [action.payload, ...state.array] };
    case UPDATE_PAYMENT_FOR_FILIAL_SUCCESS:
      return { ...state, status: 'success', array: state.array.map(p => p._id === action.payload._is ? action.payload : p) };

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
