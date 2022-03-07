// 28 - maxLength
import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const {
      testId,
      text,
      type,
      className,
      name,
      value,
      maxLength,
      onChange,
      disabled,
    } = this.props;
    return (
      <div className={ className }>
        <label htmlFor={ name } className="input-text-label">{text}</label>
        <br />
        <input
          data-testid={ testId }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          // maxLength={ maxLength }
          disabled={ disabled }
        />
      </div>
    );
  }
}

Input.propTypes = {
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Input;
