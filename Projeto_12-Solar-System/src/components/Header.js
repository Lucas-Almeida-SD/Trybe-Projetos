import React, { Component } from 'react';
import './Header.css';
import SolImg from '../images/sol.png';
import LuaImg from '../images/lua.png';

class Header extends Component {
  render() {
    return (
      <header>
        <img className="sol" src={ SolImg } alt="Sol" />
        <h1>Sistema Solar</h1>
        <img className="lua" src={ LuaImg } alt="Lua" />
      </header>
    );
  }
}

export default Header;
