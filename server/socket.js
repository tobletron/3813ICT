module.exports = {
    connect: function(io, port, db) {

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