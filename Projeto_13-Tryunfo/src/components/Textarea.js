import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.Component {
  render() {
    const { testId, text, name, rows, cols, value, onChange } = this.props;
    return (
      <div>
        <label htmlFor={ name }>{text}</label>
        <br />
        <textarea
          data-testid={ testId }
          name={ name }
          rows={ rows }
          cols={ cols }
          value={ value }
          maxLength="80"
          onChange={ onChange }
        />
      </div>
    );
  }
}

Textarea.propTypes = {
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  cols: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
