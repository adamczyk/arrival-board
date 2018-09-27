import React from 'react';
import PropTypes from 'prop-types';
import ArrivalTableItem from './ArrivalTableItem';
import Label from "./Label";

const ArrivalTable = ({ items }) => (
  <table className="arrival-table">
    <thead>
      <tr>
        <th><Label first="Avgang" second="Departure"/></th>
        <th><Label first="Til" second="Destination"/></th>
        <th><Label first="Forventet" second="Expected"/></th>
        <th><Label first="Merknader" second="Remarks"/></th>
      </tr>
    </thead>
    <tbody>
      {
        items.map((item, index) => (
          <ArrivalTableItem key={index} {...item} testRemark={index === 3 || index === 5}/>
        ))
      }
    </tbody>
  </table>
);

ArrivalTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ArrivalTable;
