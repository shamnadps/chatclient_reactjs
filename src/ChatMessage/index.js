import React from 'react';
import moment from 'moment';

const ChatMedia =({id, author, text, chat_id, timestamp}) => (
  <div className="media">
      <div className="media-body pull-left">
          <h4 className="media-heading">{author}</h4>
          <div className="well">{text}</div>
          <div className="timestamp">{moment(timestamp).fromNow()}</div>
          <hr/>
      </div>
  </div>
);

const ChatMessage =({messages}) => (
  <div className="chat-container">
    {
      messages.map(({id, author, text, chat_id, timestamp}) =>
        <ChatMedia key={id} author={author} text={text}  chat_id={chat_id} timestamp={timestamp}/>
      )
    }
  </div>
);

export default ChatMessage;
