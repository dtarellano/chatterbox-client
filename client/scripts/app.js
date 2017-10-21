var storage;
$(document).ready(function() {
  // Fetch Data
  var getContent = function(callback) {
    $.get('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages' + '?order=-createdAt', function(data) {
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
        roomName = storage[i].roomname.split(' ').join('').toLowerCase();
      }
      if (!array.includes(roomName) && roomName !== undefined && roomName !== null && roomName !== '') {
        array.push(roomName);
      }
      // Creating all Chats
      var element = document.createElement('div');
      // var userName = storage[i].username;
      var userName = storage[i].username.split(' ').join('').toLowerCase();
      var text = storage[i].text;
      var uID = storage[i].objectId; 
      
      element.className = 'chat';
      element.value = userName;
      element.setAttribute('id', uID);
      $('#chats').append(element);
      $(`#${element.id}`).addClass(`${roomName} viewtoggle ${userName}`);
      
      
      var userNameElement = document.createElement('span');
      userNameElement.className = 'username';
      $(`#${element.id}`).prepend(userNameElement).text(userName + ': ' + text);     
    }
    
    // Create Room Toggle
    for (var j = 0; j < array.length; j++) {
      var option = document.createElement('option');
      option.className = `${j} selected`;
      option.value = array[j].toLowerCase();
      $('#rooms').append(option);
      $(`.${j}`).text(array[j]);
      $('form').data(array[j].toLowerCase(), {room: array[j].toLowerCase()});
      // console.log($('form').data());
    }
    console.log(storage);
  });
  
  // Add friends
  $('#chats').on('click', '.chat', function(e) {
    var userNameClass = $(this).val();
    if ($(`.${userNameClass}`).hasClass('isbold')) {
      $(`.${userNameClass}`).removeClass('isbold');
      return;
    }
    //$(`.${userNameClass}`).css('font-weight', 'bold');
    $(`.${userNameClass}`).addClass('isbold');
  });
  
  // Change Chat Rooms
  var toggleChat = function(room) {
    $('.viewtoggle').hide();
    $(`.${room}`).show();
  };
  var currentRoom;
  $('#rooms').change(function() {
    toggleChat($(this).val());
    currentRoom = $(this).val();
  });
  
  $('form').submit(function(e) {
    e.preventDefault();
    $.post('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', 
      {
        username: 'Pacman',
        text: $('.messagebox').val(),
        roomname: currentRoom
      });
  });

});
























