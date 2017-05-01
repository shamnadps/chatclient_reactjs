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
        <a className="navbar-brand">{this.props.chatHeader}</a>
      </div>
    );
  }
}

NavBar.propTypes = {
  toggleNavBar: React.PropTypes.func.isRequired,
  chatHeader: React.PropTypes.string.isRequired,

};

NavBar.defaultProps = {
  toggleNavBar: () => {},
  chatHeader: 'Leadin Chat',
};

export default NavBar;
