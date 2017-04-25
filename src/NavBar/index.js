import React, { Component } from 'react';

class NavBar extends Component {
  constructor() {
    super();
    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  toggleNavBar() {
    this.props.toggleNavBar();
  }

  render() {
    return (
      <div className="navbar-header">
        <button type="button" onClick={this.toggleNavBar} className="usermenu-toggle btn-primary">
          <span className="glyphicon glyphicon-user" aria-hidden="true" />
        </button>
        <a href="#" className="navbar-brand">Leadin Chat</a>
      </div>
    );
  }
}

NavBar.propTypes = {
  toggleNavBar: React.PropTypes.func.isRequired,

};

NavBar.defaultProps = {
  toggleNavBar: () => {},
};

export default NavBar;
