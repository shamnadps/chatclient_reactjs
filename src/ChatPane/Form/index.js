import React, { Component} from 'react';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      message: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  onSubmit() {
    const {name, message} = this.state;
    this.props.onSend(name, message);
    this.setState({name:'', message:''});
  }

  updateName(event) {
    this.setState({name:event.target.value.trim()});
  }

  updateMessage(event) {
    this.setState({message:event.target.value.trim()});
  }

  render () {
    return (
      <div className="MessagePane-Form">
        <div className="MessagePane-Form-container">
          <p>
            <input
              className="name"
              type="text"
              placeholder="username"
              value={this.state.name}
              onChange={this.updateName}
              />
          </p>
          <p>
            <textarea
              ref={(node) => {this.chat_message = node}}
              className="message"
              placeholder="Message"
              value={this.state.message}
              onChange={this.updateMessage}
              />
          </p>
          <p>
            <button className="send" onClick={this.onSubmit}>Send</button>
          </p>
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  onSend: React.PropTypes.func.isRequired
};

Form.defaultProps = {
  onSend: () => {}
};

export default Form;
