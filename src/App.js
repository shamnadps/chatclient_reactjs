import React, { Component } from 'react';
import moment from 'moment';
import NavBar from './NavBar/NavBar';
import NavBarItems from './NavBarItems/NavBarItems';
import ChatInput from './ChatInput/ChatInput';
import ChatMessage from './ChatMessage/ChatMessage';
import './App.css';

class App extends Component {

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
      chatHeader: 'Leadin Chat',
    };
    this.user = '';
    this.toggleNavBarDiv = true;
    this.scroll = false;
    this.onSendNick = this.onSendNick.bind(this);
    this.onSendChat = this.onSendChat.bind(this);
    this.buildNewChatEntry = this.buildNewChatEntry.bind(this);
    this.onChatGroupSelect = this.onChatGroupSelect.bind(this);
    this.filteredmessages = this.filteredmessages.bind(this);
    this.handleWebSocketConnection = this.handleWebSocketConnection.bind(this);
    this.getMemberdata = this.getMemberdata.bind(this);
    this.getHistoryData = this.getHistoryData.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.countdown = setInterval(this.updateTime, 1000);
    this.handleWebSocketConnection();
  }

  componentDidUpdate() {
    if (this.scroll) {
      this.scrollToBottom();
      this.scroll = false;
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  onSendNick(author) {
    this.connection.send(`/nick ${author}`);
    this.user = author;
    this.setState({
      nickSuccessful: 1,
      chatHeader: 'Leadin Chat - Group Chat',
    });
  }

  onSendChat(author, text) {
    this.buildNewChatEntry(author, text);
    this.connection.send(text);
    this.setState({
      selectedChatId: '#',
      chatHeader: 'Leadin Chat - Group Chat',
    });
  }

  onChatGroupSelect(id) {
    this.getHistoryData();
    let title;
    if (id === '#') {
      title = '- Group Chat';
    } else if (id === '$') {
      title = '- App Notification';
    } else {
      title = `- ${id}`;
    }
    this.setState({
      selectedChatId: id,
      chatHeader: `Leadin Chat ${title}`,
    });
    this.scroll = true;
  }

  getMembersurl = 'http://localhost:8888/users';

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

  getHistoryurl = 'http://localhost:8888/history';

  getHistoryData() {
    fetch(this.getHistoryurl)
    .then(result => result.json())
    .then((result) => {
      const chatHistoryList = result.data.map((item) => {
        const chatHistory = {
          id: item.timestamp,
          author: item.from,
          text: item.msg,
          timeStamp: item.timestamp,
        };
        return chatHistory;
      });
      this.setState({
        messages: chatHistoryList,
      });
    });
  }

  updateTime() {
    this.setState({ messages: this.state.messages });
  }

  filteredmessages() {
    if (this.state.selectedChatId === '#') {
      return this.state.messages;
    } else if (this.state.selectedChatId === '$') {
      return this.state.messages.filter(({ author }) => author === '_server');
    }
    return this.state.messages.filter(({ author }) => author === this.state.selectedChatId);
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

  scrollToBottom() {
    const scrollHeight = this.chatContainer.scrollHeight;
    const height = this.chatContainer.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chatContainer.scrollTop = maxScrollTop > 0 ? scrollHeight : 0;
  }

  buildNewChatEntry(author, text) {
    const newMessage = {
      id: moment().toDate().getTime(),
      author,
      text,
      timeStamp: moment().toDate().getTime(),
    };
    const messages = [...this.state.messages, newMessage];
    this.setState({
      messages,
    });
    this.scroll = true;
  }

  chatMembers = [
    { id: '#', name: 'Group Chat', online: true },
    { id: '$', name: 'App Notifications', online: true },
  ];

  websocketserver = 'ws://localhost:8888/';

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
          message = parsedata.error;
        } else {
          message = parsedata.message;
        }
        if (!this.error) {
          if (parsedata.from === '_server' && message !== 'Nick in use') {
            this.getMemberdata();
          }
          this.buildNewChatEntry(parsedata.from, message);
          if (this.state.nickSuccessful === 1 && message !== 'Nick in use') {
            this.setState({
              nickSuccessful: 2,
              errorMessages: '',
            });
          }
        } else {
          this.setState({
            errorMessages: parsedata.error,
          });
        }
      } else {
        this.handShakeCompleted = true;
      }
    };
    this.connection.onerror = () => {
      this.error = true;
      this.setState({
        connectionClosed: true,
        errorMessages: 'Connection closed! Restart Server.',
      });
    };
    this.connection.onclose = () => {
      this.error = true;
      this.setState({
        connectionClosed: true,
        errorMessages: 'Connection closed! Restart Server.',
      });
    };
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <NavBar toggleNavBar={this.toggleNavBar} chatHeader={this.state.chatHeader} />
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
                <div className="chat-container" ref={(ref) => { this.chatContainer = ref; }}>
                  <ChatMessage messages={this.filteredmessages()} user={this.user} />
                </div>
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
