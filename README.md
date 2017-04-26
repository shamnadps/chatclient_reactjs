# README #


### Stupid and simple chat client for Leadin using ReactJS ###

### Install ###

* Install [NodeJS](https://nodejs.org)
* Install libraries: `npm install`
* Run: `npm start`

By the default the client listens on port 3000.

### How to use ###

This is very simple chat client using ReactJS

* browse to http://localhost:3000

#### PreRequisites for the  Client Application####

The Client application expectes the server to be running on port 8888.
The below connectivity calls are requested to the server.

To get the websocket connectivity : ws://localhost:8888/

To get user details : http://localhost:8888/users

To get chat history : http://localhost:8888/history

#### ReactJS Client ####

The application tries to connect to the websocket server on port 8888.
Once the connection is established, the input area to register the nick name is dispayed to the user.

Nick name is currently resticted to be Alphanumeric.

Once the nickname is registerd with websocket server the input area of sending chat messages is enabled.

Now you can start chatting.

*Note! If the connection is closed then the input areas are disabled. You need to refresh the page after restarting server.*

#### XSS and Input Sanitization ####

XSS and Input Sanitization is handled by ReactJS itself. Since this is a simple application, we do not need to add any external validations.

#### Code Styling and Intendation ####

babel-eslint is been used to correct the styling and for the intendation issues.

#### Bug Reporting ####

Feel free to report any bugs. I will be more than happy to fix them right away.
