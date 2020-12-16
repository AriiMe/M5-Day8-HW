const express = require("express");
const attendeesRouter = express.Router();
const {getAttendees,writeAttendees} = require("../fsUtilities")
const uniqid = require("uniqid")
const sgMail = require("@sendgrid/mail")


attendeesRouter.post("/", async(req,res,next) => {
    try {
        const attDB = await getAttendees()
        attDB.push({
            ...req.body,
            ID: uniqid(),
        })
        await writeAttendees(attDB)

        try {
            sgMail.setApiKey(process.eventNames.SENDGRID_API)

            const msg = {
                to: req.body.Email,
                from: "anothergamer69@gmail.com",
                subject: "You bastard",
                text: "sucky sucky bimbaki!",
            }

            await sgMail.send(msg)
            res.send("EMAIL YEETED")

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