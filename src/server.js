const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers");

const attendeesRouter = require("./attendees");

const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());
server.use(cors());

server.use("/attendees", attendeesRouter);

const testRouter = express.Router()

testRouter.get("/test", (req,res) => {
    res.status(200).send('test success')
})
server.use(testRouter)

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


server.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
        console.log("Running on cloud on port", port);
    } else {
      console.log(listEndpoints(server));
    console.log("Running locally on port", port);
  }
});