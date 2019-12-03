import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Icon, Popconfirm, Popover } from 'antd';

import { cancelInvoiceThunk } from '../../../../store/ducks/invoicesDuck';

function InvoicesAction({
  invoice, cancelInvoiceThunk,
}) {
  const baseClass = 'admin-invoices-reusables-invoices-action';

  const MoreMenu = ({ inv }) => {
    return (
      <div>
        <div>
          Enviar por correo
        </div>
        <Popconfirm
          okText="SI"
          cancelText="NO"
          title={`¿Cancelar ${inv}?`}
          onConfirm={() => cancelInvoiceThunk(inv)}
        >
          <div>
            Cancelar factura
          </div>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className={`${baseClass}`}>
      <Icon type="download" />
      <div className="more-menu-container">
        <Popover content={<MoreMenu inv={invoice.uuid} />} placement="left">
          <Icon type="more" />
        </Popover>
      </div>
    </div>
  );
}

export default connect(
  null, {
    cancelInvoiceThunk,
  }
)(InvoicesAction);
