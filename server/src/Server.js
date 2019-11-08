let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser"); //npm install body-parser --save
let sanitizer = require("express-sanitizer"); //npm install expess-sanitizer --save
let objectId = require("mongodb").ObjectID;
// MongoDB constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbPhotos";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());
//add body parser as middleware to parse up any json coming in with request
app.use(bodyParser.json());
//add sanitizer middleware to clean incoming json
app.use(sanitizer());
// express static middleware - setup static files location
app.use(express.static('./dist'));
app.get("/get", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in photos collection into array
        let photoArray = await mongoClient.db(DB_NAME).collection("photos").find().toArray();
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
        let json = { "photos": photoArray };
        json.photos.forEach(photo => {
            photo.comments.reverse();
        });
        //set status code to 200 as per restful requirements
        response.status(200);
        // serializes sampleJSON to string format
        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});
app.put("/add", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        let photoCollection = mongoClient.db(DB_NAME).collection("photos");
        //sanitize incoming json
        console.log("received: " + request.body.photoId + " " + request.body.author + " " + request.body.comment);
        let mycomment = request.sanitize(request.body.comment);
        let myauthor = request.sanitize(request.body.author);
        let id = objectId(request.body.photoId);
        let selector = {"_id" : id};
        let newValue = { $push : {"comments": {"comment": mycomment, "author": myauthor}}};
        console.log("recieved: " + mycomment + " " + myauthor + " " + request.body.photoId);
        //add the updated doc into mongodb
        let result = await photoCollection.updateOne(selector, newValue);
        mongoClient.close();
        response.status(200);
        //send json back to client to use if needed
        response.send(result);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});
app.listen(8080, () => console.log("Listening on port 8080"));