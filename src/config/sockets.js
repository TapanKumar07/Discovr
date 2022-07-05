const socket = function(socketServer) {
    let io = require('socket.io')(socketServer, {
       
        allowEIO3: true
    });

    
    io.sockets.on('connection', function(socket) {
        console.log("New socket connection recieved", socket.id);
        
        socket.on('disconnect', function() {
            console.log('Socket Disconnect', socket.id);
        })

        socket.on('join_room', function(data) {
            console.log('Joining request recieved....', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);     
        })

        socket.on('send_message', function(data) {
            io.in(data.chatroom).emit('new_message', data);
        })
    })
}


module.exports = {socket}