import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import './ScreenII.css';

class ScreenII extends React.Component {
  constructor() {
    super();
    this.state = {
      playerICard: 0,
      playerIICard: 0,
      turn: 'Iniciar',
      playerNameI: 'Player I',
      playerNameII: 'Player II',
      btnNextTurnEnable: true,
      btnClickNextCard: false,
      deckI: [],
      deckII: [],
      attr: 'cardAttr1',
      btnClickCompare: false,
      valueAttrI: '',
      valueAttrII: '',
      restartBtnEnable: false,
      classNamePlayerI: '',
      classNamePlayerII: '',
    };
    this.btnClickNextCardFunc = this.btnClickNextCardFunc.bind(this);
    this.getAttr = this.getAttr.bind(this);
    this.btnClickCompareFunc = this.btnClickCompareFunc.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.updatePlayerTurn = this.updatePlayerTurn.bind(this);
    this.updateDeckWinDefeat = this.updateDeckWinDefeat.bind(this);
    this.winnerAndLoser = this.winnerAndLoser.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  getAttr({ target }) {
    const { value } = target;
    this.setState({ attr: value });
  }

  updatePlayerTurn() {
    const { turn } = this.state;
    const { data } = this.props;
    if (turn === 'Iniciar') {
      this.shuffleCards(data);
    }
    if (turn === 'Player I') {
      this.setState({ turn: 'Player II' });
    } else {
      this.setState({ turn: 'Player I' });
    }
  }

  updateDeckWinDefeat() {
    const { valueAttrI, valueAttrII, deckI, deckII } = this.state;
    const { playerICard, playerIICard } = this.state;
    if (valueAttrI > valueAttrII) {
      this.setState((before) => ({
        deckI: [...before.deckI, deckII[playerIICard]],
        deckII: before.deckII.filter((_element, index) => index !== playerIICard),
      }));
    } else if (valueAttrII > valueAttrI) {
      this.setState((before) => ({
        deckII: [...before.deckII, deckI[playerICard]],
        deckI: before.deckI.filter((_element, index) => index !== playerICard),
      }));
    }
  }

  nextTurn() {
    this.updateDeckWinDefeat();
    this.setState({
      btnClickCompare: false,
      btnNextTurnEnable: false,
      btnClickNextCard: true,
      attr: 'cardAttr1',
      classNamePlayerI: '',
      classNamePlayerII: '',
    });
    this.updatePlayerTurn();
  }

  btnClickNextCardFunc() {
    const { deckI, deckII, playerICard, playerIICard } = this.state;
    const deckLeghtI = deckI.length;
    const deckLeghtII = deckII.length;
    let numberI = Math.floor(Math.random() * deckLeghtI);
    let numberII = Math.floor(Math.random() * deckLeghtII);
    if (deckLeghtI > 1 && deckLeghtII > 1) {
      for (;playerICard === numberI || playerIICard === numberII;) {
        numberI = Math.floor(Math.random() * deckLeghtI);
        numberII = Math.floor(Math.random() * deckLeghtII);
      }
    }
    this.setState({
      playerICard: numberI,
      playerIICard: numberII,
      btnClickNextCard: false,
      btnClickCompare: true,
    });
  }

  winnerAndLoser(condition1, condition2) {
    if (condition1) {
      this.setState({ playerNameI: 'Try again', playerNameII: 'Winner' });
    }
    if (condition2) {
      this.setState({ playerNameI: 'Winner', playerNameII: 'Try again' });
    }
  }

  btnClickCompareFunc() {
    const { attr, playerICard, playerIICard } = this.state;
    const { deckI, deckII } = this.state;
    const valueAttrI = parseInt(deckI[playerICard][attr], 10);
    const valueAttrII = parseInt(deckII[playerIICard][attr], 10);
    if (valueAttrI < valueAttrII) {
      this.setState({ classNamePlayerI: 'defeat' });
    }
    if (valueAttrII < valueAttrI) {
      this.setState({ classNamePlayerII: 'defeat' });
    }
    const condition1 = deckI.length === 1 && valueAttrI < valueAttrII;
    const condition2 = deckII.length === 1 && valueAttrII < valueAttrI;
    this.winnerAndLoser(condition1, condition2);
    if (condition1 || condition2) {
      this.setState({ restartBtnEnable: true });
    }
    this.setState({
      btnNextTurnEnable: true,
      valueAttrI,
      valueAttrII,
    });
  }

  shuffleCards(data) {
    let newData = data.map((element) => element);
    const deckI = [];
    const deckII = [];
    for (; newData.length > 1;) {
      const number1 = Math.floor(Math.random() * newData.length);
      deckI.push(newData[number1]);
      newData = newData.filter((_element, index) => index !== number1);
      const number2 = Math.floor(Math.random() * (newData.length - 1));
      deckII.push(newData[number2]);
      newData = newData.filter((_element, index) => index !== number2);
    }
    this.setState({ deckI, deckII });
  }

  restartGame() {
    this.setState({ playerICard: 0, playerIICard: 0, turn: 'Iniciar' });
    this.setState({ playerNameI: 'Player I', playerNameII: 'Player II' });
    this.setState({ btnNextTurnEnable: true, btnClickNextCard: false });
    this.setState({ deckI: [], deckII: [], attr: 'cardAttr1' });
    this.setState({ valueAttrI: '', valueAttrII: '' });
    this.setState({ btnClickCompare: false, restartBtnEnable: false });
  }

  renderBtnNextTurn(turn) {
    const { btnNextTurnEnable, restartBtnEnable } = this.state;
    if (btnNextTurnEnable && restartBtnEnable === false) {
      const currentPlayer = (turn === 'Player I') ? 'Player II' : 'Player I';
      return (
        <button
          type="button"
          onClick={ () => this.nextTurn() }
          className="next-turn-button"
        >
          {currentPlayer}
        </button>
      );
    }
  }

  renderRestartBtn() {
    const { restartBtnEnable } = this.state;
    if (restartBtnEnable) {
      return (
        <button
          type="button"
          className="restart"
          onClick={ this.restartGame }
        >
          Reiniciar
        </button>
      );
    }
  }

  render() {
    const { btnClickNextCardFunc, getAttr, btnClickCompareFunc } = this;
    const { turn, deckI, deckII, playerICard, playerIICard } = this.state;
    const { playerNameI, playerNameII } = this.state;
    const { classNamePlayerI, classNamePlayerII, btnClickNextCard } = this.state;
    const { attr, btnClickCompare, btnNextTurnEnable } = this.state;
    return (
      <section className="game">
        <Player
          className="playerI-section"
          classNamePlayer={ classNamePlayerI }
          deck={ deckI }
          player="Player I"
          playerName={ playerNameI }
          playerCardName="playerICard"
          playerCardNumber={ playerICard }
          turn={ turn }
          btnClickNextCardFunc={ btnClickNextCardFunc }
          getAttr={ getAttr }
          attr={ attr }
          btnClickCompareFunc={ btnClickCompareFunc }
          btnClickCompare={ btnClickCompare }
          btnNextTurnEnable={ btnNextTurnEnable }
          btnClickNextCard={ btnClickNextCard }
        />
        <Player
          className="playerII-section"
          classNamePlayer={ classNamePlayerII }
          deck={ deckII }
          player="Player II"
          playerName={ playerNameII }
          playerCardName="playerIICard"
          playerCardNumber={ playerIICard }
          turn={ turn }
          btnClickNextCardFunc={ btnClickNextCardFunc }
          btnClickNextCard={ btnClickNextCard }
          getAttr={ getAttr }
          attr={ attr }
          btnClickCompareFunc={ btnClickCompareFunc }
          btnClickCompare={ btnClickCompare }
          btnNextTurnEnable={ btnNextTurnEnable }
        />
        {this.renderBtnNextTurn(turn)}
        {this.renderRestartBtn()}
      </section>
    );
  }
}

ScreenII.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ScreenII;
