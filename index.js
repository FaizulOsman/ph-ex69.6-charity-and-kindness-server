const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || "5000";

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const uri =
  "mongodb+srv://dbUser1:3Pg8TzrHmCBXNqqG@cluster0.mzkazhr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client.db("charity").collection("categories");
    const volunteerCollection = client.db("charity").collection("volunteers");

    // Create
    app.post("/categories", async (req, res) => {
      const category = req.body;
      const result = await categoriesCollection.insertOne(category);
      res.send(result);
    });

    // Read (Categories)
    app.get("/categories", async (req, res) => {
      const cursor = categoriesCollection.find({});
      const categories = await cursor.toArray();
      res.send(categories);
    });

    // Read (Volunteers)
    app.get("/volunteers", async (req, res) => {
      const cursor = volunteerCollection.find({});
      const volunteers = await cursor.toArray();
      res.send(volunteers);
    });
  } catch (error) {
    console.log(error);
  }
}
run();

app.listen(port, () => {
  console.log("Hello world is coming from port: ", port);
});
