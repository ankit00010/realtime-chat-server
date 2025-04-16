import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initializeMongo } from "./config/database";




// import { initializeSendgrid } from "./config/mail";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));

// const server = http.createServer(app);

initializeMongo();

// initializeSendgrid();
//api call




app.listen(port, () => {
  console.log(
    `server running on port ${port} and url http://localhost:${port}/`
  );
});
