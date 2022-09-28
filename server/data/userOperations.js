const { MongoClient } = require("mongodb");

exports.insert = function(req, res) {
    MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        let doc = req.body;
        db.collection("users").insertOne(doc, function(err, result) {
            console.log("inserted into users: ");
            console.log(doc);
            res.send(doc);
            client.close();
        })
    });
}

exports.find = function (req, res) {

    MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client) {
        if (err) throw err;
        let db = client.db('myAssignmentDb');

        db.collection("users").find({}).toArray().then(function(docs) {
            //console.log("Found the following records");
            //console.log(docs);
            res.send(docs);
        }).catch((err) => {console.log(err);}).finally(() => {client.close();});
    });
}

exports.update = function(req,res) {
    MongoClient.connect(url, function(err, client) {
        let db = client.db(dbName);
        db.collection("users", function(err, collection) {
            let queryJSON = req.params;
            let updateJson = req.body;

            collection.updateMany(queryJSON, { $set: updateJson }, function(err, result) {
                console.log("for the documents with: ", queryJSON);
                console.log("set: ", updateJson);
                res.send(result);
                client.close();
            });
        });
    });
}

exports.remove = function(req, res) {
    MongoClient.connect(url, function(err, client) {
        let db = client.db(dbName);
        db.collection("users", function(err, collection) {
            let queryJSON = req.body;
            collection.deleteMany(queryJSON, function(err, result) {
                console.log("removed documents with", queryJSON);
                res.send(queryJSON);
                client.close();
            });
        })

    })
    
}