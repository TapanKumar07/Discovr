console.log("Chat engine On");

class ChatEngine {
    constructor(chatBox, userEmail) {
        this.chatBox = $(`#${chatBox}`);
        this.userEmail = userEmail;
        this.socket = io.connect('https://dazzling-mammoth-cave-39143.herokuapp.com/');
        if(this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function(){
            console.log("Connection Estsbliashed with Backend !");
            
            self.socket.emit('join_room', {
                userEmail : self.userEmail,
                chatroom : 'discover'
            })

            self.socket.on('user_joined', function(data) {
                console.log("New User Joined", data)
            })

            self.socket.on('new_message', function(data) {
                console.log('Message data', data);
                let newMessage = $('<li>');
                let messageType = "others-message";
                if(data.userEmail == self.userEmail)
                  messageType = "own-message"

                newMessage.append('<span>', {
                    'html' : data.userEmail
                });
                newMessage.append('<p>', {
                    
                })
                let span = $('<span>').text(data.userEmail);
                let p = $('<p>').text(data.message);
                newMessage.append(span);
                newMessage.append(p);
                newMessage.addClass(messageType);
                $('#message-list').append(newMessage);
             
        })

       

        $('#send-message').click(function() {
            let message = $('#message-input').val();
            if(message != ''){
                self.socket.emit('send_message', {
                    message : message,
                    userEmail : self.userEmail,
                    chatroom : 'discover'
                });
            }

            $('#message-input').val('');
           })

    })
    }

}