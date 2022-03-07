// Linha 23 - inserir o dataHeroes
// Linha 100 - Descomentar validação
import React from 'react';
import PropTypes from 'prop-types';
import CreateDeck from './CreateDeck';
import CreateCard from './CreateCard';
import dataHeroes from '../helpers/dataHeroes';

class ScreenI extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      data: [],
      filterName: '',
      filterRare: 'todas',
      filterTrunfo: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.callFunctions = this.callFunctions.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.validateSaveBtn = this.validateSaveBtn.bind(this);
    this.checkHasTrunfoInCards = this.checkHasTrunfoInCards.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  componentDidMount() {
    const { data } = this.state;
    this.checkHasTrunfoInCards(data);
  }

  onInputChange(event) {
    const { target } = event;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => this.callFunctions(target));
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    this.setState((before) => ({
      data: [...before.data, {
        id: (before.data.length + 1),
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      }],
    }), () => {
      const { updateData } = this.props;
      const { data } = this.state;
      updateData(data);
      const checkHasTrunfo = data.some((element) => element.cardTrunfo);
      this.setState({ hasTrunfo: checkHasTrunfo }, this.resetState());
    });
  }

  resetState() {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  callFunctions(target) {
    this.validateSaveBtn();
    // this.validateAttr(target);
  }

  validateSaveBtn() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const highestNumber = 90;
    const lowestNumber = 0;
    const valuesAttr = (parseInt(cardAttr1, 10) < lowestNumber
      || parseInt(cardAttr1, 10) > highestNumber)
      || (parseInt(cardAttr2, 10) < lowestNumber
      || parseInt(cardAttr2, 10) > highestNumber)
      || (parseInt(cardAttr3, 10) < lowestNumber
      || parseInt(cardAttr3, 10) > highestNumber);
    const number = 210;
    const fullValues = (cardName !== '' && cardDescription !== '' && cardImage !== '');
    const sumAttr = parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10)
    + parseInt(cardAttr3, 10);
    if (fullValues && sumAttr <= number && !valuesAttr) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  validateAttr(target) {
    const { name } = target;
    const highestNumber = 90;
    const lowestNumber = 0;
    if (name.includes('cardAttr')) {
      const { [name]: nameState } = this.state;
      if (parseInt(nameState, 10) > highestNumber) {
        this.setState({ isSaveButtonDisabled: true, [name]: '90' });
        return null;
      }
      if (parseInt([nameState], 10) < lowestNumber) {
        this.setState({ isSaveButtonDisabled: true, [name]: '0' });
        return null;
      }
      if (nameState.length > 2) {
        this.setState({ [name]: '90' });
      }
    }
  }

  checkHasTrunfoInCards(data) {
    const superTrunfo = data.some((element) => element.cardTrunfo);
    this.setState({ hasTrunfo: superTrunfo });
  }

  removeCard({ currentTarget }) {
    const { updateData } = this.props;
    const { data } = this.state;
    const nameCard = currentTarget.parentElement
      .querySelector('.name-card').innerText;
    this.setState({
      data: data.filter((element) => element.cardName !== nameCard),
    }, () => {
      const { data: newData } = this.state;
      const checkHasTrunfo = newData.some((element) => element.cardTrunfo);
      this.setState({ hasTrunfo: checkHasTrunfo });
      updateData(newData);
    });
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
      data,
      filterName,
      filterRare,
      filterTrunfo,
      checkHasTrunfoInCards,
    } = this.state;

    const { onInputChange, onSaveButtonClick, removeCard } = this;

    return (
      <section className="first-screen">
        <CreateCard
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
          checkHasTrunfoInCards={ checkHasTrunfoInCards }
        />
        <CreateDeck
          data={ data }
          filterName={ filterName }
          filterRare={ filterRare }
          filterTrunfo={ filterTrunfo }
          onInputChange={ onInputChange }
          removeCard={ removeCard }
        />
      </section>
    );
  }
}

ScreenI.propTypes = {
  updateData: PropTypes.func.isRequired,
};

export default ScreenI;
