import React from 'react';
import PropTypes from 'prop-types';
import BackCard from './BackCard';
import Card from './Card';

class Player extends React.Component {
  cardFunc(deck, playerCardNumber, classNamePlayer) {
    return (
      <div className={ classNamePlayer }>
        <Card
          cardName={ deck[playerCardNumber].cardName }
          cardDescription={ deck[playerCardNumber].cardDescription }
          cardAttr1={ deck[playerCardNumber].cardAttr1 }
          cardAttr2={ deck[playerCardNumber].cardAttr2 }
          cardAttr3={ deck[playerCardNumber].cardAttr3 }
          cardImage={ deck[playerCardNumber].cardImage }
          cardRare={ deck[playerCardNumber].cardRare }
          cardTrunfo={ deck[playerCardNumber].cardTrunfo }
        />
      </div>
    );
  }

  cardsNumberFunc(deck) {
    if (deck.length === 0) {
      return ' ????';
    }
    return ` ${deck.length}`;
  }

  classNameWinnerLoser(playerName) {
    return (playerName.split(' ').join('-').toLowerCase());
  }

  renderSelectAttr() {
    const {
      btnClickCompare,
      turn,
      player,
      getAttr,
      attr,
      btnClickCompareFunc,
      btnNextTurnEnable,
    } = this.props;
    const condition1 = (btnClickCompare === true);
    const condition2 = (turn === player);
    const condition3 = (btnNextTurnEnable === false);
    if (condition1 && condition2 && condition3) {
      const text = 'Selecione o Atributo: ';
      return (
        <div className="attr-div">
          <div className="select-option">
            <label htmlFor="select">{text}</label>
            <select value={ attr } onChange={ getAttr }>
              <option value="cardAttr1">Attr01</option>
              <option value="cardAttr2">Attr02</option>
              <option value="cardAttr3">Attr03</option>
            </select>
          </div>
          <button type="button" onClick={ btnClickCompareFunc }>Comparar</button>
        </div>
      );
    }
  }

  renderCard(cardFunc, classNamePlayer) {
    const {
      deck,
      turn,
      player,
      playerCardNumber,
      btnClickCompare,
      btnClickNextCard,
      btnNextTurnEnable,
    } = this.props;
    const condition1 = (btnClickCompare === true && btnNextTurnEnable === true);
    const condition2 = (turn === player
      && btnNextTurnEnable === false
      && btnClickNextCard === false);
    const condition3 = (btnNextTurnEnable === true || turn !== player);
    const condition4 = (turn === player
      && btnNextTurnEnable === false
      && btnClickNextCard === true);
    if (condition1 || condition2) {
      return (cardFunc(deck, playerCardNumber, classNamePlayer));
    }
    if (condition3 || condition4) {
      return (<BackCard />);
    }
  }

  renderBtnNextCard() {
    const {
      player,
      turn,
      playerCardName,
      btnClickNextCardFunc,
      btnClickNextCard,
      btnNextTurnEnable,
      deck,
    } = this.props;
    if (turn === player && btnNextTurnEnable === false && btnClickNextCard === true) {
      return (
        <button
          type="button"
          onClick={ () => btnClickNextCardFunc(playerCardName, deck.length) }
          className="next-card-button"
        >
          Próxima carta
        </button>
      );
    }
  }

  render() {
    const {
      className,
      deck,
      playerName,
      classNamePlayer,
    } = this.props;
    const { cardFunc, classNameWinnerLoser } = this;
    return (
      <section className={ className }>
        <div className="player-card">
          <h3 className={ classNameWinnerLoser(playerName) }>{playerName}</h3>
          {this.renderCard(cardFunc, classNamePlayer)}
          <p className="cards-number-text">
            Cartas restantes:
            <span>{this.cardsNumberFunc(deck)}</span>
          </p>
          {this.renderBtnNextCard()}
          {this.renderSelectAttr()}
        </div>
      </section>
    );
  }
}

Player.propTypes = {
  className: PropTypes.string.isRequired,
  classNamePlayer: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  deck: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  playerCardName: PropTypes.string.isRequired,
  playerCardNumber: PropTypes.number.isRequired,
  attr: PropTypes.string.isRequired,
  btnNextTurnEnable: PropTypes.bool.isRequired,
  btnClickNextCard: PropTypes.bool.isRequired,
  btnClickCompare: PropTypes.bool.isRequired,
  btnClickCompareFunc: PropTypes.func.isRequired,
  getAttr: PropTypes.func.isRequired,
  btnClickNextCardFunc: PropTypes.func.isRequired,
};

export default Player;
