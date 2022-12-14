import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import {PostInterface} from "./PostInterface";
import {PutInterface} from "./PutInterface"

config(); 

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

//get all posts
app.get("/posts", async (req, res) => {
  try {
    const dbres = 
    await client.query('select * from posts ORDER BY creationdate DESC ');
      res.status(200).json(dbres.rows);
  } catch (error) {
    console.log(error)
  }
  });

//create a post
app.post<{}, {}, PostInterface>("/posts", async (req, res) => {
 let {title, description, feeStructure, feeAmount, feePercentage, state} = req.body;
 try {
  const postQuery = 'INSERT INTO posts (title, description, feeStructure, feeAmount, feePercentage, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
  const postedQuery = await client.query(postQuery, [title, description, feeStructure, feeAmount, feePercentage, state])
  res.status(200).json(
    {
      status: "success",
      data: {
        info: postedQuery.rows,
      }
    })
} catch (error) {
  res.status(400).send(error)
}
})

//update a post 
app.put<{ id: string }, {}, PutInterface>("/posts/:id", async (req,res) => {
  try {
    const id = parseInt(req.params.id)
    let { amountPaid, settlementAmount, state } = req.body
    const query = `
    UPDATE posts 
    SET amountPaid = $1, settlementAmount = $2, state = $3
    WHERE id = $4
    RETURNING *`
    const updateResponse = await client.query(query, [amountPaid, settlementAmount, state, id])
    const didUpdate = updateResponse.rowCount === 1;

    if (didUpdate) {
      res.status(200).json({
        success: true,
        updated: updateResponse.rows
      })
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
