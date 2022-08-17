import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

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

app.get("/posts", async (req, res) => {
  try {
    const dbres = 
    await client.query('select * from posts ORDER BY creationdate DESC ');
      res.status(200).json(dbres.rows);
  } catch (error) {
    console.log(error)
  }
  });

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
