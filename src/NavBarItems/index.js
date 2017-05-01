import React from 'react';

const NavBarItem = ({ name, online, onClick }) => (
  <li onClick={onClick} className={online ? '' : 'offline'}>
    <a className="ajax-link">
      <i className="glyphicon glyphicon-user" />
      <span className="hidden-xs membername">{name}</span>
    </a>
  </li>
);

const NavBarItems = ({ onlinemembers, onSelect, user }) => (
  <ul className="nav main-menu">
    {
    onlinemembers.map(({ id, name, online }) => {
      const onChatSelect = () => onSelect(id);
      return (<NavBarItem
        key={id}
        name={name === user ? 'You' : name}
        online={online}
        onClick={onChatSelect}
      />);
    })
  }
  </ul>
);

NavBarItems.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  user: React.PropTypes.string.isRequired,
  onlinemembers: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      online: React.PropTypes.bool.isRequired,
    }),
  ),
};

NavBarItems.defaultProps = {
  onSelect: () => {},
  user: '',
  onlinemembers: [],
};

NavBarItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  online: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default NavBarItems;
