
import express from "express";
const app = express();
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

app.use(express.json());

import { MongoClient } from "mongodb";
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

// mongodb+srv://hallbooking:789789@flashspeed.hsre6qm.mongodb.net


const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


app.post("/booking", async  function (request, response) {
  const postdata = request.body;
  
    const data = await client
    .db("hallticketbooking")
    .collection("booking")
  .insertMany(postdata)
    
  
  
  
    response.send(data);
  });
  app.post("/rooms", async  function (request, response) {
  const postdata = request.body;
  
  
    const datas = await client
    .db("hallticketbooking")
    .collection("rooms")
    .insertMany(postdata)
  
   response.send(datas)
  
  });
  
app.get("/rooms", async  function (request, response) {

  const data = await client
  .db("hallticketbooking")
  .collection("rooms")
  .find({})
  .toArray();



  response.send(data);
});
app.get("/booking", async  function (request, response) {

  const data = await client
  .db("hallticketbooking")
  .collection("booking")
  .find({})
  .toArray()
  



  response.send(data);
});
app.get("/bookedrecord", async  function (request, response) {

  const data = await client
  .db("hallticketbooking")
  .collection("rooms")
  .aggregate([
    {
      $lookup:
      {
        from: "booking",
        localField: "id",
        foreignField: "id",
        as: "bookeddata"
      }
    }
  ])
  .toArray()
  



  response.send(data);
});
app.get("/bookeddata", async  function (request, response) {

  const data = await client
  .db("hallticketbooking")
  .collection("rooms")
  .aggregate([
    {
      $lookup:
      {
        from: "booking",
        localField: "id",
        foreignField: "id",
        as: "bookeddata"
      }
    },
    {$project :{_id:0,name:1,"bookeddata.booked_status":1,"bookeddata.customer_name":1,"bookeddata.data":1,"bookeddata.start_time":1,"bookeddata.end_time":1}}
  ])
  .toArray()
  



  response.send(data);
});





// db.booking.updateMany({},{$set: {booked_status : "true"}})
// Room Name
// booked Status
// customer name
// Date

// Start Time
// end time

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


