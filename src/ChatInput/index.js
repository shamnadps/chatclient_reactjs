import React, { Component} from 'react';

const nonAlphaNumericRegex = /[^0-9a-zA-Z]+/g;
class ChatInput extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      message: ''
    };

    this.onSubmitNick = this.onSubmitNick.bind(this);
    this.onSubmitChat = this.onSubmitChat.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  onSubmitNick() {
    const {name} = this.state;
    this.props.onSendNick(name);
  }

  onSubmitChat() {
    const {name, message} = this.state;
    this.props.onSendChat(name, message);
    this.setState({message:''});
  }

  updateName(event) {
    this.setState({name:event.target.value.replace(nonAlphaNumericRegex, "").substr(0,15)});
  }

  updateMessage(event) {
    this.setState({message:event.target.value.substr(0,200)});
  }

  render () {
    return (
      // <div className="MessagePane-Form">
      // <div className="MessagePane-Form-container">
      // <p>
      // <input
      // className="name"
      // type="text"
      // placeholder="username ~ 20 Chars (Alphanumeric)"
      // value={this.state.name}
      // onChange={this.updateName}
      // />
      // <button className="send" onClick={this.onSubmitNick}>Send</button>
      // </p>
      // <ErrorMessages errorMessages={this.props.errorMessages}/>
      // <p>
      // <textarea
      // className="message"
      // placeholder="Message ~ 200 Chars"
      // value={this.state.message}
      // onChange={this.updateMessage}
      // />
      // <button className="send" onClick={this.onSubmitChat}>Send</button>
      // </p>
      // </div>
      <div className="chatbox-container">
        <div className="chat-box">
          <textarea
            className="form-control"
            placeholder="Message ~ 200 Chars"
            value={this.state.message}
            onChange={this.updateMessage}
          >
          </textarea>
          <button type="button" onClick={this.onSubmitChat} className="btn btn-lg btn-primary btn-chat">
            <span className="glyphicon glyphicon-send"></span>
          </button>
        </div>
      </div>

    );
  }
};

ChatInput.propTypes = {
  onSendNick: React.PropTypes.func.isRequired,
  onSendChat: React.PropTypes.func.isRequired
};

ChatInput.defaultProps = {
  onSendNick: () => {},
  onSendChat: () => {}
};

export default ChatInput;
