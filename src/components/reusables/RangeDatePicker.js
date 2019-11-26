import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'moment';

import { DatePicker, Button, Input, Icon, Form } from 'antd';
import DatePickerField from '../reusables/DatePickerField';

function RangeDatePicker({
  label, onChange, values, placeholder,
  format, onlyMonth, datesArray,
}) {
  const { Item } = Form;
  const { MonthPicker } = DatePicker;
  const startProps = {
    format,
    placeholder: placeholder[0],
  };
  const endProps = {
    format: format,
    showToday: false,
    placeholder: placeholder[1],
  };

  const [current, setCurrent] = useState();
  const [errorDate, setErrorDate] = useState(null);
  const [dates, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      if (onChange) onChange([dates.startDate, dates.endDate])
    }
    if (dates.startDate && current) {
      if(onChange) onChange([dates.startDate, current])
    }

  }, [dates, current]);

  useEffect(() => {
    if (values && !dates.startDate) {
      setDate({ startDate: values[0], endDate: values[1] });
    }
  }, [values]);


  const handleCurrent = (current) => {
    setCurrent(current);
  };

  const handleDate = (moment, name) => {
    if (name === 'endDate' && dates.startDate) {
      const valid = M(moment).diff(M(dates.startDate)) > 0;
      if (valid) {
        setDate(d => ({ ...d, [name]: moment.toString() }));
        setErrorDate(null);
      }
      else {
        setErrorDate('La fecha de termino es menor a la de inicio.');
        setDate(d => ({ ...d, endDate: null }));
      }
    }
    if (name === 'startDate') setDate({ ...dates, [name]: moment.toString() });
    // setDate({ ...dates, [name]: moment.toString() });
  };

  return (
    <div className="reusable-component-range-picker">
      <Item label={label}>
        <div className="reusable-component-range-picker-container">
          <div className="reusable-component-range-picker-start-date">
            {
              onlyMonth ? (
                <MonthPicker
                  onChange={moment => handleDate(moment, 'startDate')}
                  value={dates.startDate}
                  { ...startProps }
                />
              ) : (
                <DatePickerField
                  onChange={moment => handleDate(moment, 'startDate')}
                  value={dates.startDate}
                  { ...startProps }
                />
              )
            }
          </div>
          -
          <div className="reusable-component-range-picker-end-date">
            {
              current ? (
                <Input
                  onClick={() => handleCurrent(null)}
                  className="input-current"
                  value={current}
                  contentEditable={false}
                  suffix={<Icon type="calendar" />}
                />
              ) :
              onlyMonth ? (
                <MonthPicker
                  onChange={moment => handleDate(moment, 'endDate')}
                  value={dates.endDate}
                  renderExtraFooter={ () => (
                    <div className="reusable-component-range-picker-current-button">
                      <Button htmlType="button" onClick={() => handleCurrent('Actualidad')} type="primary">
                        Actualidad
                      </Button>
                    </div>
                  )}
                  { ...endProps }
                />
              ) : (
                <DatePickerField
                  className={errorDate ? 'error' : null}
                  onChange={moment => handleDate(moment, 'endDate')}
                  value={dates.endDate}
                  renderExtraFooter={ () => (
                    <div className="reusable-component-range-picker-current-button">
                      <Button htmlType="button" onClick={handleCurrent} type="primary">
                        Actualidad
                      </Button>
                    </div>
                  )}
                  {...endProps}
                />
              )
            }
          </div>
        </div>
      </Item>
      {
        errorDate && (
          <div>{errorDate}</div>
        )
      }
    </div>
  );
}

export default RangeDatePicker;

RangeDatePicker.propTypes = {
  placeholder: PropTypes.arrayOf(PropTypes.string),
}

RangeDatePicker.defaultProps = {
  placeholder: ['Inicio', 'Termino'],
}
