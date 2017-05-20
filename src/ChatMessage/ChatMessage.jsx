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
  <span>
    {
      messages.map(({ id, author, text, timeStamp }) =>
        <ChatMedia
          key={id}
          author={author === '_server' ? 'App Notification' : author}
          text={text}
          timeStamp={timeStamp}
          user={user}
        />,
      )
    }
  </span>
);

ChatMessage.propTypes = {
  messages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      timeStamp: React.PropTypes.number.isRequired,
    }),
  ),
  user: React.PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
  messages: [],
  user: '',
};

ChatMedia.propTypes = {
  author: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  timeStamp: React.PropTypes.number.isRequired,
  user: React.PropTypes.string.isRequired,
};

export default ChatMessage;
