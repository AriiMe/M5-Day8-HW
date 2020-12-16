const express = require("express");
const attendeesRouter = express.Router();
const {getAttendees,writeAttendees} = require("../fsUtilities")
const uniqid = require("uniqid")
const sgMail = require("@sendgrid/mail")
const { join } = require("path");
const { createReadStream } = require("fs-extra");
const { pipeline } = require("stream");
const { Transform } = require("json2csv");

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

attendeesRouter.get("/export/csv", (req, res, next) => {
    try {
      const pathToJson = join(__dirname, "attendees.json"); //CREATING PATH TO JSON FILE
      const jsonReadableStream = createReadStream(pathToJson); //CREATES SOURCE FOR PIPELINE
      //SOURCE IS THE FILE THAT WE'RE SENDING
  
      const json2csv = new Transform({
        fields: ["FirstName", "Surname", "ToA", "Email", "ID"],
      }); //TURNS JSON FILE INTO A CSV FILE WITH THE FIELDS AS COLUMNS
  
      res.setHeader("Content-Disposition", "attachment; filename=export.csv"); //SETS ENDPOINT TO DOWNLOAD THE FILES IN THE RESPONSE
      pipeline(jsonReadableStream, json2csv, res, (err) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          console.log("THIS ONE WORKS");
        }
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = attendeesRouter;