import React from 'react';

const ChatMedia =({id, author, text, chat_id}) => (
  <div className="media">
      <div className="media-body pull-left">
          <h4 className="media-heading">{author}</h4>
          <div className="well">{text}</div>
      </div>
  </div>
);

const ChatMessage =({messages}) => (
  <div className="chat-container">
    {messages.map(({id, author, text, chat_id}) => <ChatMedia key={id} author={author} text={text}  chat_id={chat_id}/>)}
  </div>
);

export default ChatMessage;
