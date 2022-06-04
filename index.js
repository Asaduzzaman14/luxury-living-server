const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pedrvzd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    await client.connect()

    const roomCollaction = client.db('luxury-living').collection('rooms');



    //  get all rooms
    app.get('/rooms', async (req, res) => {
        const rooms = await roomCollaction.find().toArray()
        res.send(rooms)
    })


    // get room by id
    app.get('/room/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const result = await roomCollaction.findOne(filter)
        res.send(result)
    })







}




run().catch(console.dir())


app.get('/', (req, res) => {
    res.send('luxury living is Runing')
})



app.listen(port, () => {
    console.log(`luxury listening is ${port}`);
})