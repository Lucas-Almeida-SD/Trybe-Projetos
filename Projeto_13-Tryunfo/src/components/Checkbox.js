import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  render() {
    const { text, testId, className, id, checked, name, onChange } = this.props;
    return (
      <div className={ className }>
        <input
          data-testid={ testId }
          type="checkbox"
          id={ id }
          name={ name }
          checked={ checked }
          onChange={ onChange }
        />
        <label htmlFor={ id }>{text}</label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
