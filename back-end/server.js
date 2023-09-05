const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dataPoint = require("./api");
app.use(express.json())
app.use(require("body-parser").urlencoded({extended: false}))
app.use(cors());

const PORT = process.env.ROUTE_PORT || 4000;

app.use(express.json());

app.use("/api", dataPoint);

app.listen(PORT, () => console.log(`Now listening in http://localhost:${PORT}`));
