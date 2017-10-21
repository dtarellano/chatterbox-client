var storage;

// $.get('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', function(data) {
//   storage = data;

// });
$(document).ready(function() {

  var getContent = function(callback) {
    $.get('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages', function(data) {
      callback(data);
    });
  };
  
  getContent(function(data) {  
    var storage = data.results;
    console.log(data);
    var array = [];  
    for (var i = 0; i < storage.length; i++) {
      var roomName = storage[i].roomname;
      
      if (roomName === undefined || roomName === null) {
        roomName = '';
      } else {
        roomName = storage[i].roomname.toLowerCase();
      }
      if (!array.includes(roomName) && roomName !== undefined && roomName !== null && roomName !== '') {
        array.push(roomName);
      }

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
    
    console.log(array);
    for (var j = 0; j < array.length; j++) {
      var option = document.createElement('option');
      option.className = `${j} selected`;
      option.value = array[j].toLowerCase();
      $('#rooms').append(option);
      $(`.${j}`).text(array[j]);
    }
     
  });
  var toggleChat = function(room) {
    debugger;
    //$('.viewtoggle').toggle('.viewtoggle');
    //$(`.${room}`).toggle('.viewtoggle');
    $('.viewtoggle').hide();
    $(`.${room}`).show();
  };
    
  $('#rooms').change(function() {

    toggleChat($(this).val());
  });
    
});
    // var element = document.createElement('div');
  
    
//console.log(storage);