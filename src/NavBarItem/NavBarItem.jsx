import React from 'react';

const NavBarItem = ({ name, online, onClick }) => (
  <li onClick={onClick} className={online ? '' : 'offline'}>
    <a className="ajax-link">
      <i className="glyphicon glyphicon-user" />
      <span className="hidden-xs membername">{name}</span>
    </a>
  </li>
);

NavBarItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  online: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default NavBarItem;
