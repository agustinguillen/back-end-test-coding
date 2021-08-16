const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

//app config
const app = express();
const port = process.env.PORT || 8002;
const server = http.Server(app);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", routes);

//listen
server.listen(port, () => {
  console.log(`Listening on localhost ${port}`);
});
