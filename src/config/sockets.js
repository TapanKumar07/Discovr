const socket = function(socketServer) {
    let io = require('socket.io')(socketServer, {   
        allowEIO3: true
    });
    const socketToUserMap = new Map();
    let onlineUsers = [];
    io.sockets.on('connection', function(socket) {
       
        console.log("New socket connection recieved", socket.id);
        
       

        socket.on('disconnect', function() {
            // Remove user from the list of users
            const user = socketToUserMap.get(socket.id);
            const index  = onlineUsers.indexOf(user);
            if (index !== -1) {
                onlineUsers.splice(index, 1);
                io.emit('online-users', onlineUsers);
            }
            console.log('Socket Disconnect', socket.id);
        })

        socket.on('join_room', function(data) {

            socketToUserMap.set(socket.id, data);
            onlineUsers.push(data);
            io.emit('online-users', onlineUsers);
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