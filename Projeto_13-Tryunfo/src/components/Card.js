import React from 'react';
import PropTypes from 'prop-types';
import AttributeCard from './AttributeCard';

class Card extends React.Component {
  superTrunfoClass(cardTrunfo) {
    if (cardTrunfo) {
      return 'super-trunfo-card';
    }
    return 'normal-card';
  }

  renderSuperTrunfo(cardTrunfo) {
    if (cardTrunfo === true) {
      return (
        <div className="super-trunfo-div">
          <div className="super-trunfo-background">
            <span
              data-testid="trunfo-card"
              className="super-trunfo"
            >
              Super Trunfo
            </span>
          </div>
        </div>
      );
    }
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
    } = this.props;

    return (
      <div className="card-border">
        <div className="card-background-image">
          <div className={ `card ${this.superTrunfoClass(cardTrunfo)}` }>
            <h3 data-testid="name-card" className="name-card">{cardName}</h3>
            <h4 data-testid="rare-card" className="rare-type">{cardRare}</h4>
            <div className="image-div">
              <img data-testid="image-card" src={ cardImage } alt={ cardName } />
              {this.renderSuperTrunfo(cardTrunfo)}
            </div>
            <div className="description-card-div">
              <p data-testid="description-card">{cardDescription}</p>
            </div>
            <div className="attributes-div">
              <AttributeCard attr="Attr01" value={ cardAttr1 } testId="attr1-card" />
              <AttributeCard attr="Attr02" value={ cardAttr2 } testId="attr2-card" />
              <AttributeCard attr="Attr03" value={ cardAttr3 } testId="attr3-card" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
