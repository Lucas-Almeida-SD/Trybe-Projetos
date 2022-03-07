import React from 'react';
import PropTypes from 'prop-types';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Input from './Input';
import Select from './Select';
import AttributeForm from './AttributeForm';

class Form extends React.Component {
  checkHasTrunfo(hasTrunfo, cardTrunfo, onInputChange) {
    if (hasTrunfo === false) {
      return (
        <Checkbox
          testId="trunfo-input"
          className="cardTrunfo-div"
          id="cardTrunfo-checkbox"
          text="Super Trybe Trunfo"
          name="cardTrunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
      );
    }
    return (
      <p>Você já tem um Super Trunfo em seu baralho</p>
    );
  }

  ptsRestantesFunc() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.props;
    const n10 = 10;
    const n210 = 210;
    const attr1 = (cardAttr1 !== '') ? parseInt(cardAttr1, n10) : 0;
    const attr2 = (cardAttr2 !== '') ? parseInt(cardAttr2, n10) : 0;
    const attr3 = (cardAttr3 !== '') ? parseInt(cardAttr3, n10) : 0;
    const ptsRestantes = (n210 - attr1 - attr2 - attr3);
    return ptsRestantes;
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>
        <h2>Adicionar nova carta</h2>
        <Input
          testId="name-input"
          text="Nome"
          type="text"
          className="cardName"
          name="cardName"
          value={ cardName }
          maxLength="20"
          onChange={ onInputChange }
          disabled={ false }
        />
        <Textarea
          testId="description-input"
          text="Descrição"
          className="cardDescription"
          name="cardDescription"
          rows="3"
          cols="30"
          value={ cardDescription }
          onChange={ onInputChange }
        />
        <AttributeForm
          testId="attr1-input"
          text="Attr01"
          type="number"
          className="attr attr1"
          name="cardAttr1"
          value={ cardAttr1 }
          onChange={ onInputChange }
        />
        <AttributeForm
          testId="attr2-input"
          text="Attr02"
          type="number"
          className="attr attr2"
          name="cardAttr2"
          value={ cardAttr2 }
          onChange={ onInputChange }
        />
        <AttributeForm
          testId="attr3-input"
          text="Attr03"
          type="number"
          className="attr attr3"
          name="cardAttr3"
          value={ cardAttr3 }
          onChange={ onInputChange }
        />
        <div className="pts-div">
          <span>
            {`Pontos restantes: ${this.ptsRestantesFunc()}`}
          </span>
        </div>
        <Input
          testId="image-input"
          text="Imagem"
          type="text"
          className="cardImage"
          name="cardImage"
          value={ cardImage }
          maxLength="10000"
          onChange={ onInputChange }
          disabled={ false }
        />
        <Select
          testId="rare-input"
          name="cardRare"
          value={ cardRare }
          options={ ['normal', 'raro', 'muito raro'] }
          onChange={ onInputChange }
          disabled={ false }
        />
        {this.checkHasTrunfo(hasTrunfo, cardTrunfo, onInputChange)}
        <button
          data-testid="save-button"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
