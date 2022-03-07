import React from 'react';
import PropTypes from 'prop-types';

class AttributeForm extends React.Component {
  render() {
    const { testId, text, type, name, value, onChange } = this.props;
    return (
      <div>
        <label htmlFor={ name } className="input-number-label">{text}</label>
        <input
          data-testid={ testId }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          min="0"
          max="90"
        />
      </div>
    );
  }
}

AttributeForm.propTypes = {
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AttributeForm;
