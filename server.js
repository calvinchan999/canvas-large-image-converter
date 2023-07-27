"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const imageRouter = require("./routes/image");
const cors = require('cors');

const port = 5100;

const app = express();

// Enable CORS for all routes
app.use(cors());

const jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 1024,
  type: "application/json",
});
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 1024,
  type: "application/x-www-form-urlencoded",
});

app.use(jsonParser);
app.use(urlencodedParser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, async () => {
  console.log(`Server is running on ${process.env.PORT || port}`);
});

app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("server is running!");
});
