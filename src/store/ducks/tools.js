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
  const message = window.errorDestructure(error, errorMessage);
  sweet.fire({
    type: 'error',
    title: 'Lamentamos las molestias!',
    text: errorMessage,
    footer: 'Por favor intenta más tarde',
    confirmButtonText: 'Aceptar',
  });
  dispatch(action(message));
  dispatch({ type: resetConstant })
  return error;
}
