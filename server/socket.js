const { appendFile } = require("fs");

/* Exporting the function connect to be used in other files. */
module.exports = {

    connect: function(io, port) {

        /* This is the code that is executed when a new user connects to the chat. */
        io.on('connection', (socket) => {

            socket.on('room', (room) => {
                
                socket.join(room); 

                socket.on('message', (message, username)=> {
                    let d = new Date();
                    let h = d.getHours();
                    let m = d.getMinutes();
                    let content = username + " at " + h + ":" + m + " - " + message;
                    io.to(room).emit('message', content);
                });
            });


            

        });

    }
}