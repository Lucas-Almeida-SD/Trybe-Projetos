import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { testId, value, name, options, onChange, disabled } = this.props;
    const text = 'Raridade';
    return (
      <div className="rarity-div">
        <label htmlFor={ text }>{text}</label>
        <br />
        <select
          data-testid={ testId }
          name={ name }
          value={ value }
          onChange={ onChange }
          disabled={ disabled }
        >
          {options.map((element) => (<option key={ element }>{element}</option>))}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  testId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Select;
