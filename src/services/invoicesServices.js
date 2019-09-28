import axios from 'axios';

const BASE_API = `${process.env.REACT_APP_BASE_API_URL}`;
const APIURL = `${BASE_API}/invoices`;

export const makeInvoice = (paymentId, userData) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/new/${paymentId}`, { user: { ...userData } }, {
    headers: {
      Authorization: token,
    }
  }).then(({ data }) => data);
}

export const dataFacturacion = (fiscalData) => {
  const token = localStorage.authToken;
  return axios.post(`${BASE_API}/dataFacturacion`, fiscalData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}

export const getDataFacturacion = (fiscalData) => {
  const token = localStorage.authToken;
  return axios.get(`${BASE_API}/dataFacturacion`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}
