import React from 'react';
import Form from './Form';
import './index.css';

const Message =({author,text}) => (
  <div className="Message">
    <div className="Message-author">{author}</div>
    <div className="Message-text">{text}</div>
  </div>
);

const List =({messages}) => (
  <div className="MessagePane-list">
    {messages.map(({id, author, text}) => <Message key={id} author={author} text={text} />)}
  </div>
);

const ChatPane = ({messages, onSendMessage}) => (
  <div className="MessagePane">
    <List messages={messages} />
    <Form onSend={onSendMessage}/>
  </div>
);

ChatPane.defaultProps = {
  messages: []
};

ChatPane.propTypes = {
  messages: React.PropTypes.array.isRequired
};

export default ChatPane;
