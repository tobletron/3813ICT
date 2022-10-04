/* Exporting the function listen to be used in other files. */
module.exports = {

    /* A function that is listening for the app to start on the port that is passed in. */
    listen: function(app, port) {

        app.listen(port, ()=> {
            let d = new Date();
            let h = d.getHours();
            let m = d.getMinutes();
            console.log("Server started on port " + port + ' at ' + h + ':' + m);
        });

    }
    
}
