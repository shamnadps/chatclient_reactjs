import React, { Component } from 'react';
import ChatPane from './ChatPane';
import ChatGroupList from './ChatGroup';
import './App.css';

const getMembersurl = 'http://localhost:8888/users';
const getHistoryurl = 'http://localhost:8888/history';

const chatMembers = [
  { id:1, name: 'Group Chat', online: true},
  { id:2, name: 'App Notifications', online: true },
];

const messages = [];
const errorMessages = '';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages,
      chatMembers,
      errorMessages,
      selectedChatId: chatMembers[0].id
    };
    this.onSendNick = this.onSendNick.bind(this);
    this.onSendChat = this.onSendChat.bind(this);
    this.buildNewChatEntry = this.buildNewChatEntry.bind(this);
    this.onChatGroupSelect = this.onChatGroupSelect.bind(this);
    this.filteredmessages = this.filteredmessages.bind(this);
    this.handleWebSocketConnection = this.handleWebSocketConnection.bind(this);
    this.getMemberdata = this.getMemberdata.bind(this);
    this.getHistoryData = this.getHistoryData.bind(this);
  }

  onSendNick(author) {
    this.connection.send("/nick "+author);
  }

  onSendChat(author, text) {
    this.buildNewChatEntry(author, text);
    this.connection.send(text);
  }

  buildNewChatEntry(author, text) {
    const new_message = {
      id:this.state.messages.length + 1,
      author,
      text,
      chat_id: author
    };
    const messages = [...this.state.messages, new_message];
    this.setState({messages});
  }

  onChatGroupSelect(id) {
    this.getHistoryData();
    this.setState({selectedChatId: id});
  }

  filteredmessages() {
    if(this.state.selectedChatId === 1) {
      return this.state.messages.filter(({author}) => author !== '_server');
    } else if(this.state.selectedChatId === 2) {
      return this.state.messages.filter(({author}) => author === '_server');
    } else {
      return this.state.messages.filter(({author}) => author === this.state.selectedChatId);
    }
  }

  getMemberdata() {
    fetch(getMembersurl)
    .then(result => result.json())
    .then(result => {
      var chatMemberList = result.data.map(function(item) {
        const chatMember = {
          id: item.nick,
          name: item.nick,
          online: item.online
        };
        return chatMember;
      })
      const memberList = [...chatMembers, ...chatMemberList];
      this.setState({
        chatMembers: memberList
      })
    })
  }

  getHistoryData() {
    fetch(getHistoryurl)
    .then(result => result.json())
    .then(result => {
      result.data.map(({timestamp, from, msg}) => console.log(from+":"+msg+":"+timestamp))
      var chatHistoryList = result.data.map(function(item) {
        const chatHistory = {
          id: item.timestamp,
          author: item.from,
          text: item.msg,
          chat_id: item.timestamp
        };
        return chatHistory;
      })
      this.setState({
        messages: chatHistoryList
      })
    })
  }

  handleWebSocketConnection() {
    this.handShakeCompleted = false;
    this.connection = new WebSocket('ws://localhost:8888/');
    this.connection.onmessage = evt => {
      if(this.handShakeCompleted) {
        var parsedata = JSON.parse(evt.data);
        var message;
        if(parsedata.error) {
          this.error = true;
          message = parsedata.error;
        } else {
          message = parsedata.message;
        }
        if(!this.error) {
          if(parsedata.from === "_server") {
            this.getMemberdata();
          }
          this.buildNewChatEntry(parsedata.from, message);
        } else {
          console.log(parsedata.error);
          this.setState({
            errorMessages: parsedata.error
          })
          console.log(this.state.errorMessages);
        }
      } else {
        this.handShakeCompleted = true;
      }
    };
    this.connection.onerror = evt => {
      this.error = true;
      console.log("OnError");
    };
    this.connection.onclose = evt => {
      this.error = true;
      console.log("OnClose Connection Closed");
    };
  }

  componentDidMount() {
    this.handleWebSocketConnection();
  }

  render() {
    return (
      <div className="App">
        <ChatGroupList
          chatMembers={this.state.chatMembers}
          selectedChatId={this.state.selectedChatId}
          onSelect={this.onChatGroupSelect}
        />
        <ChatPane
          messages={this.filteredmessages()}
          errorMessages={this.state.errorMessages}
          onSendNick={this.onSendNick}
          onSendChat={this.onSendChat}
        />
      </div>
    );
  }
}

export default App;
