import React from 'react';
import NavBarItem from '../NavBarItem/NavBarItem';

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

export default NavBarItems;
