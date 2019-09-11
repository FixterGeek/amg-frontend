import { paymentEvent } from '../../services/paymentServices';

const paymetState = {
  array: [],
  fetching: false,
  status: null,
};


/* Constants */
const RESET_PAYMENT_STATUS = 'RESET_PAYMENTsTATUS';

const MAKE_PAYMENT = 'MAKE_PAYMENT';
const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
const MAKE_PAYMENT_ERROR = 'MAKE_PAYMENT_ERROR';


/* Action creators */
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


/* Thunks */
// Make payment
export const makePaymentAction = (paymentData, paymentType = 'event') => (dispatch) => {
  dispatch(makePayment());
  if (paymentType === 'event') {
    return paymentEvent(paymentData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        dispatch(makePaymentError(error));
        return error;
      });
  }
};


/* reducer */
export default function reducer(state = paymetState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
