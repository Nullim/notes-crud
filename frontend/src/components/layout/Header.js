import React from 'react';
import '../../styles/components/layout/Header.css';

const Header = (props) => {
  return (
    <header>
      <div className='header-holder'>
        <h1 className='title'>Notes Manager</h1>
        <h2 className='subtitle'>Create, read, update and delete notes at will.</h2>
      </div>
    </header>
  )
}

export default Header;
