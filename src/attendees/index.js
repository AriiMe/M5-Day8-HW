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

        
            
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        //console.log(sgMail)
        const msg = {
            to: req.body.Email,
            from: "anothergamer69@gmail.com",
            subject: "You nice and gentle guy",
            html: "<strong>really nice!</strong>"
        }

        
        sgMail.send(msg).then ( () => 
            res.send("EMAIL YEETED")
        )

     // res.status(204).send()
        

    } catch (error) {
        console.log(error)
        next(error)
    }
})

attendeesRouter.get("/test", (req,res,next) => {
    res.status(200).send("test attendees working")
})


module.exports = attendeesRouter;