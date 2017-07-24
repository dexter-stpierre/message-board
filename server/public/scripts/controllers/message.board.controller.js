myApp.controller("MessageBoardController", function($http){
  console.log("Message Board Controller Loaded");
  var mbc = this;
  mbc.newMessage = {};
  mbc.submitMessage = function(message){
    console.log(message);
    $http.post('/messages', message).then(function(response){
      console.log(response);
      mbc.getMessages();
    });
  }
  mbc.getMessages = function(){
    console.log('Getting all messages');
    $http.get('/messages').then(function(response){
      console.log(response.data);
      mbc.messages = response.data;
    });
  }
  mbc.getMessages();
});
