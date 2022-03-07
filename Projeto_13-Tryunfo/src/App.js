import React from 'react';
import { SiNintendogamecube } from 'react-icons/si';
import ScreenI from './components/ScreenI';
import SideBar from './components/SideBar';
import dataHeroes from './helpers/dataHeroes';
import './App.css';
import ScreenII from './components/ScreenII';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: dataHeroes,
      home: 'selected',
      play: 'not-selected',
    };
    this.selectMenu = this.selectMenu.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(newData) {
    this.setState({ data: newData });
  }

  selectMenu(event) {
    const { id } = event.currentTarget;
    const menu = ['home', 'play'];
    if (id === 'home') {
      this.setState({ data: dataHeroes });
    }
    menu.forEach((element) => {
      if (element === id) {
        this.setState({ [element]: 'selected' });
      } else {
        this.setState({ [element]: 'not-selected' });
      }
    });
  }

  renderScreen(screenI, screenII) {
    const { home } = this.state;
    if (home === 'selected') {
      return screenI;
    }
    return screenII;
  }

  render() {
    const { data, home, play } = this.state;
    const { selectMenu, renderScreen } = this;
    const screenI = (<ScreenI
      data={ data }
      updateData={ this.updateData }
    />);
    const screenII = (<ScreenII data={ data } />);
    return (
      <main>
        <SideBar selectMenu={ selectMenu } home={ home } play={ play } />
        <section className="logo">
          <SiNintendogamecube className="icon" />
          <h1>Tryunfo</h1>
        </section>
        {renderScreen(screenI, screenII)}
      </main>
    );
  }
}

export default App;
