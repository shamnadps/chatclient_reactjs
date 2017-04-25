import React from 'react';
import moment from 'moment';

const ChatMedia = ({ author, text, timeStamp, user }) => (
  <div className="media">
    <div className="media-body pull-left">
      <h4 className="media-heading">{author === user ? 'You' : author}</h4>
      <div className="well">{text}</div>
      <div className="timestamp">{moment(timeStamp).fromNow()}</div>
      <hr />
    </div>
  </div>
);

const ChatMessage = ({ messages, user }) => (
  <div className="chat-container">
    {
      messages.map(({ id, author, text, chatId, timeStamp }) =>
        <ChatMedia
          key={id}
          author={author === '_server' ? 'App Notification' : author}
          text={text}
          chatId={chatId}
          timeStamp={timeStamp}
          user={user}
        />,
      )
    }
  </div>
);

export default ChatMessage;
