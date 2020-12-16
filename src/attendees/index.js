const express = require("express");
const attendeesRouter = express.Router();
const {readDB,writeDB} = require("../fsUtilities")
const uniqid = require("uniqid")
const sgMail = require("@sendgrid/mail")


attendeesRouter.post("/", async(req,res,next) => {
    try {
        const attDB = await readDB()
        attDB.push({
            ...req.body,
            ID: uniqid(),
        })
        await writeDB(attDB)
        
        try {
            sgMail.setApiKey(process.eventNames.SENDGRID_API)

        } catch (error) {
            console.log(error)
            next(error)
        }
        

    } catch (error) {
        console.log(error)
        next(error)
    }
})


module.exports = attendeesRouter;