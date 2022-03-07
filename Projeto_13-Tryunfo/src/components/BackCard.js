import React from 'react';
import './BackCard.css';

class BackCard extends React.Component {
  render() {
    return (
      <div className="card-border">
        <div className="card-background-image">
          <div className="card-gradient">
            <div className="trunfo-logo-border">
              <span>Tryunfo</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BackCard;
