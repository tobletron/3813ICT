const { appendFile } = require("fs");

/* Exporting the function connect to be used in other files. */
module.exports = {

    connect: function(io, port) {

        /* This is the code that is executed when a new user connects to the chat. */
        io.on('connection', (socket) => {

            socket.on('room', (room, username) => {
                
                socket.join(room); 
                let content = username + " joined the " + room + " channel."
                console.log(content);
                io.to(room).emit('userJoined', content);
                

                socket.on('message', (message, username)=> {
                    let d = new Date();
                    let h = d.getHours();
                    let m = d.getMinutes();
                    let content = username + " at " + h + ":" + m + " - " + message;
                    io.to(room).emit('message', content);
                });

                socket.on('disconnect', function() {
                    let leaveMessage = username + " left the " + room + " channel.";
                    console.log(leaveMessage);
                    io.to(room).emit('userDisconnected', leaveMessage);
                })
            });


            

        });

    }
}