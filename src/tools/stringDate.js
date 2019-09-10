import moment from 'moment';

export function eventStringDate(startDate, endDate) {
  const sDate = moment(startDate).locale('es');
  const eDate = moment(endDate).locale('es');

  if (!sDate.isValid() || !eDate.isValid()) return null;

  let date = `del ${sDate.date()} de ${sDate.format('MMMM')} al ${eDate.date()} de ${eDate.format('MMMM')}`;

  if (sDate.month() === eDate.month()) date = `${sDate.date()}-${eDate.date()} de ${sDate.format('MMMM')}`;
  if (startDate === endDate) date = `${sDate.date()} de ${sDate.format('MMMM')}`;

  return date;
}

export function postStringDate() {

}
