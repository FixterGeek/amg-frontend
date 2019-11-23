import sweet from 'sweetalert2';

export function successAction(dispatch, action, actionPayload, resetConstant, successMessage) {
  if (successMessage) sweet.fire({
    type: 'success',
    title: 'Listo!',
    text: successMessage,
    confirmButtonText: 'Aceptar',
  });
  dispatch(action(actionPayload));
  dispatch({ type: resetConstant });
  return actionPayload;
}

export function errorAction(dispatch, action, error, resetConstant, errorMessage) {
  // const message = window.errorDestructure(error, errorMessage);
  const { response = {} } = error;

  if (process.env.REACT_APP_DEVELOP) console.warn('AMGERROR', error.response || error);

  const { data = {} } = response;
  const { message = errorMessage } = data;

  sweet.fire({
    type: 'error',
    title: 'Lamentamos las molestias!',
    text: message,
    footer: 'Por favor intenta más tarde',
    confirmButtonText: 'Aceptar',
    customClass: {
      confirmButton: 'confirm-alert'
    }
  });
  dispatch(action(message));
  dispatch({ type: resetConstant })
  return error;
}
