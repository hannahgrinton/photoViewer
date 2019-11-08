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
        // convert all documents in technologies collection into array in one awesome statement!
        let photoArray = await mongoClient.db(DB_NAME).collection("photos").find().sort("name",1).toArray();
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
        let json = { "photos": photoArray };
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
app.post("/post", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");

        //sanitize incoming json
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });
        //add the new doc into mongodb
        let result = await techCollection.insertOne(request.body);
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
app.put("/put/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        let id = objectId(request.params.id);
        //sanitize incoming json
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });
        let selector = {"_id" : id};
        let newValue = { $set : {"name":request.body.name, "description":request.body.description, "difficulty":request.body.difficulty, "courses":request.body.courses}};
        //add the updated doc into mongodb
        let result = await techCollection.updateOne(selector, newValue);
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
app.delete("/delete/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    let result;
    try {
        await mongoClient.connect(); 
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        let id = objectId(request.params.id);
        let selector = {"_id" : id};
        //delete the doc in mongodb if it exists
        try {
            result = await techCollection.deleteOne(selector);
            if (result.deletedCount < 1) {
                response.status(422);
                response.send({error: `Incorrect ID submitted, could not delete where ID = ${id}.`});
            }
            else {
                response.status(200);
                //send json back to client to use if needed
                response.send(result);
            }
        } catch(e) {
            console.log(`>>> ERROR : ${e}`);
            response.status(422);
            response.send({error: `Incorrect ID submitted, could not delete where ID = ${id}. Error thrown: ${e}`});
            throw e;
        }
        
        mongoClient.close();
        
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});


app.listen(8080, () => console.log("Listening on port 8080"));