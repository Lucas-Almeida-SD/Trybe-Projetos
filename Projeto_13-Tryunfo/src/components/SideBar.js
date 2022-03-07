import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHome } from 'react-icons/ai';
import { IoLogoGameControllerB } from 'react-icons/io';

class SideBar extends React.Component {
  render() {
    const { selectMenu, home, play } = this.props;
    return (
      <section className="sidebar">
        <button
          type="button"
          id="home"
          className={ home }
          onClick={ selectMenu }
        >
          <AiFillHome className="icon" />
          Home
        </button>
        <button
          type="button"
          id="play"
          className={ play }
          onClick={ selectMenu }
        >
          <IoLogoGameControllerB className="icon" />
          Jogar
        </button>
      </section>
    );
  }
}

SideBar.propTypes = {
  selectMenu: PropTypes.func.isRequired,
  home: PropTypes.string.isRequired,
  play: PropTypes.string.isRequired,
};

export default SideBar;
