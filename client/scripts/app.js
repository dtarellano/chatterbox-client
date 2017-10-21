var storage;
$(document).ready(function() {
  // Fetch Data
  var getContent = function(callback) {
    $.get('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', function(data) {
      callback(data);
    });
  };
  
  getContent(function(data) {  
    var storage = data.results;
    var array = [];  
    for (var i = 0; i < storage.length; i++) {
      var roomName = storage[i].roomname;
      // Filter out undefined or null text and rooms
      if (roomName === undefined || roomName === null) {
        roomName = '';
      } else {
        roomName = storage[i].roomname.toLowerCase();
      }
      if (!array.includes(roomName) && roomName !== undefined && roomName !== null && roomName !== '') {
        array.push(roomName);
      }
      
      // Creating all Chats
      var element = document.createElement('div');
      var userName = storage[i].username;
      var text = storage[i].text;
      var uID = storage[i].objectId; 
      element.className = 'chat';
      element.setAttribute('id', uID);
      $('#chats').append(element);
      $(`#${element.id}`).text(text);
      $(`#${element.id}`).addClass(`${roomName} viewtoggle`);           
    }
    
    // Create Room Toggle
    for (var j = 0; j < array.length; j++) {
      var option = document.createElement('option');
      option.className = `${j} selected`;
      option.value = array[j].toLowerCase();
      $('#rooms').append(option);
      $(`.${j}`).text(array[j]);
    }
     
  });
  
  // Change Chat Rooms
  var toggleChat = function(room) {
    $('.viewtoggle').hide();
    $(`.${room}`).show();
  };
    
  $('#rooms').change(function() {

    toggleChat($(this).val());
  });
  
  $('.messagebox').on('')
});
