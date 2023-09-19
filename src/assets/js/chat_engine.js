console.log("Chat engine On");

class ChatEngine {
    constructor(chatBox, userName, userEmail, uri) {
    
        this.chatBox = $(`#${chatBox}`);
        this.userName = userName;
        this.userEmail = userEmail;
        this.socket = io.connect(uri);
        if(this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        console.log(self)
        this.socket.on('connect', function(){
            console.log("Connection Estsbliashed with Backend !");
            
            self.socket.emit('join_room', {
                userEmail : self.userEmail,
                userName: self.userName,
                chatroom : 'discover'
            })

            self.socket.on('user_joined', function(data) {
                console.log("New User Joined", data)
            })

            self.socket.on('online-users', (data) => {
                console.log(data);
                $('#user-list').html("");
                for(var userData of data) {
                    let newUserListItem = $('<li>');
                    // Create a span for the green dot
                    let onlineStatusDot = $('<span>').addClass('online-status-dot');
                    newUserListItem.append(onlineStatusDot);
                    // Create a span for the user name
                    let userNameSpan = $('<span>').text(userData.userName);
                    newUserListItem.append(userNameSpan);
                    
                    $('#user-list').append(newUserListItem);
                }
                

            })

            self.socket.on('new_message', function(data) {
                console.log('Message data', data);


                var newMessage = $('<li class="chat-message">');  
                var messageType = (data.userEmail === self.userEmail) ? "own-message" : "others-message";

                var nameBubble = $('<div class="message-name">').text(data.userName);
                var messageBubble = $('<div class="message-text">').text(data.message);
                newMessage.append(nameBubble, messageBubble);
                newMessage.addClass(messageType);
                var chatWindow = $("#message-list");
                chatWindow.append(newMessage);
                chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
        })

       

        $('#send-message').click(function() {
            let message = $('#message-input').val();
            if(message != ''){
                self.socket.emit('send_message', {
                    message : message,
                    userName : self.userName,
                    userEmail : self.userEmail,
                    chatroom : 'discover'
                });        
            }

            $('#message-input').val('');
           })
          
    })
    }

}