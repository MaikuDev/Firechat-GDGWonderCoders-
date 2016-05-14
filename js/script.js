$(function(){
    // CREATE A REFERENCE TO FIREBASE
    var messagesRef = new Firebase('https://firechatgdg.firebaseio.com/');
    
    // REGISTER DOM ELEMENTS
    var messageField = $('.chat-container__text textarea');
    var messageList = $('.chat-container__items');
    
    //SOCIAL INFO
    var socialUser = 'anonymous';
    var socialAvatar = 'http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png';
    
    function send(){
        //FIELD VALUES
        var username = socialUser;
        var message = messageField.val();
        
        //SAVE DATA TO FIREBASE AND EMPTY FIELD
        messagesRef.push({user:username, text:message});
        messageField.val('');
    }
    
    $('.chat-container__text a').click(function (e) {
        send();
    });
    
    // Add a callback that is triggered for each chat message.
    messagesRef.limitToLast(10).on('child_added', function (snapshot) {
        
        //GET DATA
        var data = snapshot.val();
        var user = data.user;
        var message = data.text;
        
        console.log(data);
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        
        var itemElement = $('<div class="chat-container__item">');
        var avatarElement = $('<div class="contacts-avatar"></div>').css('background-image','url('+ socialAvatar +')');
        var stateElement = $('<div class="contacts-state"></div>');
        
        var messageItem = $('<div class="chat-item__message"></div>');
        console.log(user)
        var userElement = $("<h2></h2>").text(user);
        console.log(userElement)
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