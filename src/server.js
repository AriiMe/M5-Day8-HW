const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")

const booksRoutes = require("./services/books")


const server = express()

const port = process.env.PORT || 3001 // the fallback is for local development, heroku will use his own port, something like 12312, because imagine how many processes are running on the same machine there

server.use(express.json())
server.use(cors()) // CROSS ORIGIN RESOURCE SHARING

//ROUTES

server.use("/books", booksRoutes)

// ERROR HANDLERS

console.log(listEndpoints(server))

server.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
        console.log("Running on cloud on port", port)
    } else {
        console.log("Running locally on port", port)
    }
})