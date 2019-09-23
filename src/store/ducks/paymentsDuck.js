import { payment, getPaymentsByUser } from '../../services/paymentServices';

const paymetState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
  errorMessage: null,
};


/* Constants */
const RESET_PAYMENT_STATUS = 'RESET_PAYMENTsTATUS';

const MAKE_PAYMENT = 'MAKE_PAYMENT';
const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
const MAKE_PAYMENT_ERROR = 'MAKE_PAYMENT_ERROR';

const POPULATE_PAYMENTS = 'POPULATE_PAYMENTS';
const POPULATE_PAYMENTS_SUCCESS = 'POPPULATE_PAYMENTS_SUCCESS';
const POPULATE_PAYMENTS_ERROR = 'POPULATE_PAYMENTS_ERROR';


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


/* Thunks */
// Make payment
export const makePaymentAction = (paymentData, paymentType = 'event') => (dispatch) => {
  dispatch(makePayment());
  return payment(paymentData, paymentType)
    .then((data) => {
      dispatch(makePaymentSuccess(data));
      return data;
    })
    .catch((error) => {
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
        console.log(error);
        dispatch(populatePaymentsError(error));
      });
  } else {
    const localPayments = JSON.parse(localStorage.payments);
    dispatch(populatePaymentsSuccess(localPayments));
    return localPayments;
  }
}


/* reducer */
export default function reducer(state = paymetState, action) {
  switch (action.type) {
    case RESET_PAYMENT_STATUS:
      return { ...state, status: null };
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
    default:
      return state;
  }
}
