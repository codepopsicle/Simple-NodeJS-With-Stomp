const Stomp = require('stomp-client');
const stompClient = new Stomp('130.83.163.160', 4502, 'admin', 'admin');
//const stompClient = new Stomp('127.0.0.1', 4502, 'admin', 'admin');
//const stompClient = new Stomp('127.0.0.1', 4502, 'admin', 'admin');

const DummyMessage = "DummyMessage";
const RealMessage = "RealMessage";
const selectionArray = Array(0,1);
var queue = [];

stompClient.connect(function () {
    console.log("producer connected");
    /*const notification = {
        label : "New notification",
    };*/

    setInterval(() => {
        var selection = selectionArray[Math.floor(Math.random()*selectionArray.length)];
        if(selection==0){
            queue.push(DummyMessage);
        }
        else{
            queue.push(RealMessage);
        }
      }, 45000);


    //stompClient.disconnect();
      stompClient.subscribe('/topic/SendMessageRound', function(body, headers){
        /*
        this callback function is invoked whenever our a client receives a message.
        */
       console.log(body);
       var itemToPublish;
       if(queue.length==0){
           itemToPublish = DummyMessage;
       }
       else{
           itemToPublish = queue.shift();
       }
       if(itemToPublish.localeCompare(DummyMessage)==0){
           console.log("Publishing dummy message");
        stompClient.publish('/queue/DummyMessage', itemToPublish);
       }
       else{
           console.log("Publishing real message");
        stompClient.publish('/queue/ActualMessage', itemToPublish);
       }
      });
});