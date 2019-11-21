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
      customClass: {
        confirmButton: 'confirm-alert'
      }
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
      customClass: {
        confirmButton: 'confirm-alert'
      }
    });
  };

  const successAlert = ({
    title = 'Listo!',
    text = 'Operación exitosa',
  }) => {
    sweet.fire({
      type: 'success',
      title,
      text,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'confirm-alert'
      }
    });
  }

  return {
    infoAlert,
    errorAlert,
    successAlert,
  };
}

export default useSweetAlert;
