const express = require("express");
const cors = require("cors");
const { log } = require("./routes/common");
let app = express();

const PORT = process.env.ROUTE_PORT || 4000;
require("dotenv").config();

let startServer = async () => {
  try {
    app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/", require("./routes"));
    app.listen(PORT);
    log(`Server is now running in port ${PORT}...`);
  } catch (e) {
    log(e);
  }
};

if (require.main === module) startServer();
