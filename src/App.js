import React, { Component } from 'react';
import moment from 'moment';
import NavBar from './NavBar';
import NavBarItems from './NavBarItems';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './App.css';

class App extends Component {
  getMembersurl = 'http://localhost:8888/users';
  getHistoryurl = 'http://localhost:8888/history';
  websocketserver = 'ws://localhost:8888/';

  chatMembers = [
    { id: 1, name: 'Group Chat', online: true },
    { id: 2, name: 'App Notifications', online: true },
  ];

  constructor() {
    super();
    this.state = {
      messages: [],
      chatMembers: [],
      errorMessages: '',
      selectedChatId: this.chatMembers[0].id,
      connectionClosed: true,
      toggleNavBar: 'col-md-2 col-xs-2 user-menu sidebar-left sidebar-hide',
      nickSuccessful: 0,
    };
    this.user = '';
    this.toggleNavBarDiv = true;
    this.onSendNick = this.onSendNick.bind(this);
    this.onSendChat = this.onSendChat.bind(this);
    this.buildNewChatEntry = this.buildNewChatEntry.bind(this);
    this.onChatGroupSelect = this.onChatGroupSelect.bind(this);
    this.filteredmessages = this.filteredmessages.bind(this);
    this.handleWebSocketConnection = this.handleWebSocketConnection.bind(this);
    this.getMemberdata = this.getMemberdata.bind(this);
    this.getHistoryData = this.getHistoryData.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  onSendNick(author) {
    this.connection.send(`/nick ${author}`);
    this.user = author;
    this.setState({ nickSuccessful: 1 });
  }

  onSendChat(author, text) {
    this.buildNewChatEntry(author, text);
    this.connection.send(text);
  }

  buildNewChatEntry(author, text) {
    const newMessage = {
      id: this.state.messages.length + 1,
      author,
      text,
      chat_id: author,
      timestamp: moment().toDate().getTime(),
    };
    const messages = [...this.state.messages, newMessage];
    this.setState({ messages });
  }

  onChatGroupSelect(id) {
    this.getHistoryData();
    this.setState({ selectedChatId: id });
  }

  toggleNavBar() {
    if (this.toggleNavBarDiv) {
      this.setState({ toggleNavBar: 'col-md-2 col-xs-2 user-menu sidebar-left ' });
      this.toggleNavBarDiv = false;
    } else {
      this.setState({ toggleNavBar: 'col-md-2 col-xs-2 user-menu sidebar-left sidebar-hide' });
      this.toggleNavBarDiv = true;
    }
  }

  filteredmessages() {
    if (this.state.selectedChatId === 1) {
      return this.state.messages;
    } else if (this.state.selectedChatId === 2) {
      return this.state.messages.filter(({ author }) => author === '_server');
    }
    return this.state.messages.filter(({ author }) => author === this.state.selectedChatId);
  }

  getMemberdata() {
    fetch(this.getMembersurl)
    .then(result => result.json())
    .then((result) => {
      const chatMemberList = result.data.map((item) => {
        const chatMember = {
          id: item.nick,
          name: item.nick,
          online: item.online,
        };
        return chatMember;
      });
      const memberList = [...this.chatMembers, ...chatMemberList];
      this.setState({
        chatMembers: memberList,
      });
    });
  }

  getHistoryData() {
    fetch(this.getHistoryurl)
    .then(result => result.json())
    .then((result) => {
      const chatHistoryList = result.data.map((item) => {
        const chatHistory = {
          id: item.timestamp,
          author: item.from,
          text: item.msg,
          chatId: item.timestamp,
          timeStamp: item.timestamp,
        };
        return chatHistory;
      });
      this.setState({
        messages: chatHistoryList,
      });
    });
  }

  handleWebSocketConnection() {
    this.handShakeCompleted = false;
    this.connection = new WebSocket(this.websocketserver);
    this.connection.onmessage = (evt) => {
      this.setState({
        connectionClosed: false,
      });
      if (this.handShakeCompleted) {
        const parsedata = JSON.parse(evt.data);
        let message;
        if (parsedata.error) {
          this.error = true;
          message = parsedata.error;
        } else {
          this.error = false;
          message = parsedata.message;
        }
        if (!this.error) {
          if (parsedata.from === '_server') {
            this.getMemberdata();
          }
          this.buildNewChatEntry(parsedata.from, message);
          if (this.state.nickSuccessful === 1) {
            this.setState({
              nickSuccessful: 2,
              errorMessages: '',
            });
          }
        } else {
          console.log(parsedata.error);
          this.setState({
            errorMessages: parsedata.error,
          });
        }
      } else {
        this.handShakeCompleted = true;
      }
    };
    this.connection.onerror = (evt) => {
      this.error = true;
      this.setState({
        connectionClosed: true,
        errorMessages: 'Connection closed! Restart Server.',
      });
      console.log('OnError');
    };
    this.connection.onclose = (evt) => {
      this.error = true;
      this.setState({
        connectionClosed: true,
        errorMessages: 'Connection closed! Restart Server.',
      });
      console.log('OnClose Connection Closed');
    };
  }

  componentDidMount() {
    this.handleWebSocketConnection();
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <NavBar toggleNavBar={this.toggleNavBar} />
        </div>
        <div id="main" className="body-content container-fluid">
          <div className="row">
            <div className={this.state.toggleNavBar}>
              <NavBarItems
                onlinemembers={this.state.chatMembers}
                onSelect={this.onChatGroupSelect}
                user={this.user}
              />
            </div>
            <div className="col-md-10 col-xs-12">
              <hr />
              <div className="chat-area">
                <ChatMessage messages={this.filteredmessages()} user={this.user} />
                <ChatInput
                  onSendNick={this.onSendNick}
                  onSendChat={this.onSendChat}
                  nickSuccessful={this.state.nickSuccessful}
                  errorMessages={this.state.errorMessages}
                />
              </div>
              <hr />
              <footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
