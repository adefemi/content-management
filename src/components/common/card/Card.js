import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

const Card = props => {
  return (
    <div className={`card-main ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string
};

Card.defaultProps = {
  style: {}
};

export default Card;
