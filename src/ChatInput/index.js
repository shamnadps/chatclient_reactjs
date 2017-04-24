import React, { Component} from 'react';

const ErrorMessages = ({errorMessages}) => {
  const className = errorMessages.length > 0 ? "error" : "noerror";
  return (
    <p className={className}>{errorMessages}</p>
  )
};
class ChatInput extends Component {
  nonAlphaNumericRegex = /[^0-9a-zA-Z]+/g;
  constructor() {
    super();

    this.state = {
      name: '',
      message: '',
      showChatInput: 'hidden',
      showNickInput: 'nick'
    };

    this.onSubmitNick = this.onSubmitNick.bind(this);
    this.onSubmitChat = this.onSubmitChat.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  onSubmitNick() {
    const {name} = this.state;
    if (name.trim().length > 0) {
      this.props.onSendNick(name);
    }
  }

  onSubmitChat() {
    const {name, message} = this.state;
    if (message.trim().length > 0) {
      this.props.onSendChat(name, message);
      this.setState({message:''});
    }
  }

  updateName(event) {
    this.setState({name:event.target.value.replace(this.nonAlphaNumericRegex, "").substr(0,15)});
  }

  updateMessage(event) {
    this.setState({message:event.target.value.substr(0,200)});
  }

  render () {
    return (
      <div className="chatbox-container">
        <div className="chat-box">
        <ErrorMessages errorMessages={this.props.errorMessages}/>
        <div className={ (this.props.nickSuccessful === 2 && this.props.errorMessages.length === 0) ? 'show' : 'hidden'}>
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
          <div className={ (this.props.nickSuccessful !== 2 && this.props.errorMessages.length === 0) ? 'show' : 'hidden'} >

            <input type="text"
              className="form-control"
              placeholder="Set a Nickname ~ 20 Chars"
              value={this.state.name}
              onChange={this.updateName}
            />
            <button type="button" onClick={this.onSubmitNick} className="btn btn-primary btn-margin" >Set Nickname</button>
          </div>
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
