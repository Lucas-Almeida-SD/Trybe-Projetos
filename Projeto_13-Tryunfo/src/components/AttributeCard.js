import React from 'react';
import PropTypes from 'prop-types';

class AttributeCard extends React.Component {
  render() {
    const { attr, value, testId } = this.props;
    return (
      <div>
        <span className="title">{attr}</span>
        <meter value={ value } min="0" max="90" />
        <span data-testid={ testId } className="value">{value}</span>
      </div>
    );
  }
}

AttributeCard.propTypes = {
  attr: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default AttributeCard;
