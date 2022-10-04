/* Exporting the function connect to be used in other files. */
module.exports = {
    connect: function(io, port, db) {

        /* This is the code that is executed when a new user connects to the chat. */
        io.on('connection', (socket) => {

            socket.on('message', (message, username)=> {
                let d = new Date();
                let h = d.getHours();
                let m = d.getMinutes();
                let content = username + " at " + h + ":" + m + " - " + message;
                io.emit('message', content);
            });

        });

    }
}