import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import {PostInterface} from "./PostInterface"

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
  let {title, description, state} = req.body;
  if (title && description) {
  const postQuery = 'INSERT INTO posts (title, description, state) VALUES ($1, $2, $3) RETURNING *'
  const postedQuery = await client.query(postQuery, [title, description, state])
  res.status(200).json(
    {
      status: "success",
      data: {
        info: postedQuery.rows,
      }
    })
} else {
  res.status(500).send("Error 500: Entry title or description missing")
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
