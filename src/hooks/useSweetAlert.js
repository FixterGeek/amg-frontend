import React from 'react';
import sweet from 'sweetalert2';

function useSweetAlert() {
  const infoAlert = ({ title, text, footer }) => {
    sweet.fire({
      type: 'info',
      title,
      text,
      footer,
      confirmButtonText: 'Aceptar',
    });
  };

  const errorAlert = ({
    title = 'Lamentamos las molestias!',
    text = 'Ocurrio un error mientras procesabamos los datos.',
    footer = 'Por favor intenta más tarde',
  }) => {
    sweet.fire({
      type: 'error',
      title,
      text,
      footer,
      confirmButtonText: 'Aceptar',
    });
  };

  const successAlert = ({
    title = 'Listo!',
    text = 'Operación exítosa',
  }) => {
    sweet.fire({
      type: 'success',
      title,
      text,
      confirmButtonText: 'Aceptar',
    });
  }

  return {
    infoAlert,
    errorAlert,
    successAlert,
  };
}

export default useSweetAlert;
