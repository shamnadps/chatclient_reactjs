import React, { Component } from 'react';
import ChatPane from './ChatPane';
import ChatGroupList from './ChatGroup';
import './App.css';

const chatMembers = [
  { id:1, name: 'Group Chat' },
  { id:2, name: 'User 1' },
  { id:3, name: 'User 2' },
];

const messages = [
  {
    id:1,
    author: 'Shamna',
    text: 'hi',
    chat_id:1
  },
  {
    id:2,
    author: 'Shanu',
    text: 'hi',
    chat_id:2
  },
  {
    id:3,
    author: 'Channel 1 shamnad',
    text: 'hi',
    chat_id:1
  },
  {
    id:4,
    author: 'Channel 2 Shamnad',
    text: 'hi',
    chat_id:2
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages,
      chatMembers,
      selectedChatId: chatMembers[0].id
    };
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.filteredmessages = this.filteredmessages.bind(this);
  }

  onSendMessage(author, text) {
    const new_message = {
      id:this.state.messages[this.state.messages.length-1].id + 1,
      author,
      text,
      chat_id: this.state.selectedChatId
    };
    const messages = [...this.state.messages, new_message];
    this.setState({messages});
  }

  onChannelSelect(id) {
    this.setState({selectedChatId: id});
  }

  filteredmessages() {
    return this.state.messages.filter(({chat_id}) => chat_id ===this.state.selectedChatId);
  }

  componentDidMount() {
    console.log("Component Loaded");
  }

  render() {
    return (
      <div className="App">
        <ChatGroupList
          chatMembers={this.state.chatMembers}
          selectedChatId={this.state.selectedChatId}
          onSelect={this.onChannelSelect}
          />
        <ChatPane messages={this.filteredmessages()} onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
