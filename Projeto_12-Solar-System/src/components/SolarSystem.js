import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';
import './SolarSystem.css';

class SolarSystem extends Component {
  render() {
    return (
      <div className="solar-system" data-testid="solar-system">
        <Title headline="Planetas" />
        {planets.map((element) => (
          <PlanetCard
            key={ element.name }
            planetName={ element.name }
            planetImage={ element.image }
          />
        ))}
      </div>
    );
  }
}

export default SolarSystem;
