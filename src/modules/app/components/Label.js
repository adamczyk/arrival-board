import React from 'react';
import PropTypes from 'prop-types';

const Label = ({first, second}) => {
  return(
    <span className="label-wrapper">
      <div className="label-first">{first}</div>
      <div className="label-second">{second}</div>
    </span>
  )
};

Label.defaultProps = {
  second: '',
};

Label.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string,
};

export default Label;
