'use strict';
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('Filtering service started on: ' + port);

const Stomp = require('stomp-client');
const stompClient = new Stomp('127.0.0.1', 61613, 'admin', 'admin');
stompClient.connect(function (sessionId) {
    console.log("consumer connected");
    stompClient.subscribe('/queue/DummyMessage', function(body, headers){
        /*
        this callback function is invoked whenever our a client receives a message.
        */
       console.log("Received dummy message " + body);
      });
      stompClient.subscribe('/queue/ActualMessage', function(body, headers){
        /*
        this callback function is invoked whenever our a client receives a message.
        */
        console.log("Received actual message " + body);
      });
      setInterval(() => {
        stompClient.publish('/topic/SendMessageRound', "SendMessage");
      }, 60000);
});
