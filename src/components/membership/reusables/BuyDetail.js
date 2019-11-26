import React, { useEffect, useState } from 'react';

import { Typography, List } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';

function BuyDetail({ details, onAmount }) {
  const { Title } = Typography;
  const { Item: ListItem } = List;

  const [amount, setAcount] = useState({
    subamount: 0,
    tax: 0,
    acount: 0,
  });

  useEffect(() => {
    let subamount = 0;
    details.map(detail => {
      if (detail.cost) subamount += detail.cost;
    });
    setAcount(state => {
      const numbers = {
        subamount: subamount, tax: (subamount * 16) / 100, amount: subamount + ((subamount * 16) / 100)
      }
      if (onAmount) onAmount(numbers);
      return numbers;
    });

    if (onAmount) onAmount()
  }, [])

  const coinFormat = coins => {
    const c = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
    return c.format(coins);
  }


  return (
    <ContainerItem className="membership-reusables-buy-detail">
      <Title>Detallles de compra</Title>
      <div className="membership-reusables-buy-detail-list">
        <List>
          { details.map(detail => detail.cost ? (
            <ListItem className="detail">
              <div>{ detail.concept }</div>
              <div>{ coinFormat(detail.cost) }</div>
            </ListItem>
          ) : null ) }
          <ListItem className="lasts">
            <div>Subtotal</div>
            <div>{ coinFormat(amount.subamount) }</div>
          </ListItem>
          <ListItem className="lasts">
            <div>IVA (16%)</div>
            <div>{ coinFormat(amount.tax) }</div>
          </ListItem>
          <ListItem className="lasts">
            <div>
              <strong>Total</strong>
            </div>
            <div>
              <strong>{ coinFormat(amount.amount) }</strong>
            </div>
          </ListItem>
        </List>
      </div>
    </ContainerItem>
  );
}

export default BuyDetail;
