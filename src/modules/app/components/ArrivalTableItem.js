import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ArrivalTableItem = (props) => {
  const {
    aimedArrivalTime,
    expectedArrivalTime,
    date,
    destinationDisplay,
    testRemark,
  } = props;

  const TIME_FORMAT = 'HH:mm';
  const DATE_FORMAT = 'DD.MM.YYYY';
  const arrivalTime = moment(aimedArrivalTime);
  const expectedTime = moment(expectedArrivalTime);
  const arrivalDate = moment(date);
  // const arrivalDate = moment('2018-10-03'); // TODO: remove after testing

  return(
    <tr>
      <td className="time">
        {arrivalTime.format(TIME_FORMAT)}
      </td>
      <td className="destination">
        {destinationDisplay.frontText}
      </td>
      <td className="time">
        {arrivalTime.isSame(expectedTime, 'minute') ? '' : expectedTime.format(TIME_FORMAT)}
      </td>
      <td>
        {(arrivalDate.isAfter(moment()) || testRemark) && `NB! Forventet avgangsdato ${arrivalDate.format(DATE_FORMAT)}`}
      </td>
    </tr>
  );
};

ArrivalTableItem.defaultProps = {
  testRemark: false,
};

ArrivalTableItem.propTypes = {
  aimedArrivalTime: PropTypes.string.isRequired,
  expectedArrivalTime: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  destinationDisplay: PropTypes.objectOf(PropTypes.string).isRequired,
  testRemark: PropTypes.bool,
};

export default ArrivalTableItem;
