import React from 'react';

const NavBarItem = ({ id, name, online, isSelected, onClick }) => (
  <li onClick={onClick} className={online ? '' : 'offline'}>
    <a href="#" className="ajax-link">
      <i className="glyphicon glyphicon-user" />
      <span className="hidden-xs membername">{name}</span>
    </a>
  </li>
);

const NavBarItems = ({ onlinemembers, selectedChatId, onSelect, user }) => (
  <ul className="nav main-menu">
    {
    onlinemembers.map(({ id, name, online }) => {
      const is_selected = selectedChatId === id;
      const onChatSelect = () => onSelect(id);
      return (<NavBarItem
        key={id}
        name={name === user ? 'You' : name}
        online={online}
        isSelected={is_selected}
        onClick={onChatSelect}
      />);
    })
  }
  </ul>
);

export default NavBarItems;
