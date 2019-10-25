import React, { createRef } from 'react';
import jsPDF from 'jspdf';
import htmlToImage from 'html-to-image';

import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';

import './opps.css'
import oxxobrand from '../../../assets/oxxopay_brand.png'

function OxxoOrder({ oxxoOrder }) {
  const { charges = {} } = oxxoOrder;
  const { data = [{}] } = charges;
  const amount = `${data[0].amount}`;

  const ref = createRef();

  const handleSave = () => {
    htmlToImage.toPng(ref.current)
      .then((dataUrl) => {
        const doc = new jsPDF();
        const img = new Image();
        img.src = dataUrl;
        doc.addImage(img, 'PNG', -30, 1,);
        doc.save(`${oxxoOrder.id}.pdf`)
      });
  };

  console.log(oxxoOrder);

  return (
    <div className="dashboard-container">
      <ContainerItem className="dash-item-center">
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center' }}>
          <div class="opps">
            <div class="opps-header">
              <div class="opps-reminder">Ficha digital. No es necesario imprimir.</div>
                <div class="opps-info">
                  <div class="opps-brand"><img src={oxxobrand} alt="OXXOPay" /></div>
                  <div class="opps-ammount">
                    <h3>Monto a pagar</h3>
                    <h2>
                      { Intl.NumberFormat(
                          'es-MX', { style: 'currency', currency: 'MXN' }
                        ).format(amount.substring(0, amount.length - 2) + '.' + amount.substring(amount.length - 2)) }
                      <sup>MXN</sup>
                    </h2>
                    <p>OXXO cobrará una comisión adicional al momento de realizar el pago.</p>
                  </div>
                </div>
                <div class="opps-reference" style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                  <h3>Referencia</h3>
                  <h1>{ data[0].payment_method.reference  }</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src={ data[0].payment_method.barcode_url } />
                </div>
              </div>
              <div class="opps-instructions">
                <h3>Instrucciones</h3>
                <ol>
                  <li>Acude a la tienda OXXO más cercana. <a href="https://www.google.com.mx/maps/search/oxxo/" target="_blank">Encuéntrala aquí</a>.</li>
                  <li>Indica en caja que quieres realizar un pago de <strong>OXXOPay</strong>.</li>
                  <li>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</li>
                  <li>Realiza el pago correspondiente con dinero en efectivo.</li>
                  <li>Al confirmar tu pago, el cajero te entregará un comprobante impreso. <strong>En el podrás verificar que se haya realizado correctamente.</strong> Conserva este comprobante de pago.</li>
                </ol>
                <div class="opps-footnote">Al completar estos pasos recibirás un correo de <strong>Nombre del negocio</strong> confirmando tu pago.</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button marginTop="0px" width="100%" htmlType="button" onClick={handleSave}>
              Descargar
            </Button>
          </div>
      </ContainerItem>
    </div>
  );
}

export default OxxoOrder;
