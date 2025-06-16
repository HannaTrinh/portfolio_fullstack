const express = require('express');
const database = require('./connect');
const ObjectId = require('mongodb').ObjectId;

let postRoutes = express.Router();

//#1 - Retrieve all
postRoutes.route("/posts").get(async (req, res) => {
    console.log("/skills get: received request");
    let db = database.getDb();
    try {
        const documents = await db.collection('skills').find({}).toArray();
        console.log("/skills get: fetched documents:", documents);
        res.status(200).json(documents);
    } catch (err) {
        console.log("/skills get: error", err);
        res.status(500).send("Error fetching posts from database.");
    }
});

//#2 - Retrieve one
postRoutes.route("/posts/:id").get(async (req, res) => {
    let db = database.getDb();
    try {
        const document = await db.collection('skills').findOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json(document);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching post from database.");
    }
});

//#3 - Create one
postRoutes.route("/posts").post(async (req, res) => {
    console.log("Received POST /posts request");
    let db = database.getDb();
    let mongoObject = {
        imageURL: req.body.imageURL,
        name: req.body.name,
        type: req.body.type,
    }

    console.log("Inserting:", mongoObject);
    
    await db.collection('skills').insertOne(mongoObject, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting post into database.");
        } else {
            console.log("Inserted:", result.insertedId);
            res.status(201).json(result);
        }
    });
});

//#4 - Update one
postRoutes.route("/skills/:id").put(async (req, res) => {
    let db = database.getDb();
    let mongoObject = {
        imageURL: req.body.imageURL,
        name: req.body.name,
        type: req.body.type,
    }
    
    await db.collection('skills').updateOne({ _id: new ObjectId(req.params.id) }, { $set: mongoObject }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating post in database.");
        } else {
            res.status(200).json(result);
        }
    });
});

//#5 - Delete one
postRoutes.route("/posts/:id").delete(async (req, res) => {
    let db = database.getDb();
    await db.collection('skills').deleteOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting post from database.");
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = postRoutes;