$(function(){
    // CREATE A REFERENCE TO FIREBASE
    var messagesRef = new Firebase('https://firechatgdg.firebaseio.com/');
    
    // REGISTER DOM ELEMENTS
    var messageField = $('.chat-container__text textarea');
    var messageList = $('.chat-container__items');
    
    function Send(){
        //FIELD VALUES
        var username = socialUser || 'anonymous';
        var message = messageField.val();
        
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        messagesRef.push({user:username, text:message});
        messageField.val('');
    }
    
    // Add a callback that is triggered for each chat message.
    messagesRef.limitToLast(10).on('child_added', function (snapshot) {
        
        //GET DATA
        var data = snapshot.val();
        var username = data.name;
        var message = data.text;
        
        console.log(data);
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        
        var itemElement = $('<div class="chat-container__item">');
        var avatarElement = $('<div class="contacts-avatar"></div>').css('background-image','url("http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png")');
        var stateElement = $('<div class="contacts-state"></div>');
        
        var messageItem = $('<div class="chat-item__message"></div>');
        var userElement = $("<h2></h2>").text(username);
        var messageElement = $("<p></p>").text(message);
        
        //APPENDS ELEMENTS
        messageItem.append(userElement);
        messageItem.append(messageElement);
        
        avatarElement.append(stateElement);
        
        itemElement.append(avatarElement);
        itemElement.append(messageItem);
        
        //ADD MESSAGE
        messageList.append(itemElement)
    });
});