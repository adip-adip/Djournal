require ("dotenv").config();
const express = require("express");

require("./db.config")

const cors= require("cors")
const router = require("./router.config");
const runUserSeeders = require('../seeder/user.seeder');

runUserSeeders()

const app = express();


app.use(cors())
// event middleware


// json parsers 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))



app.use("/api/v1", router)

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        message: "Resource not found",
        status: "Not_Found"
    })
});

app.use((error, req, res , next) => {
    console.log("_______------~~~~~Error Handeling~~~~~------_______", error)
    let result = error.detail || null
    let message= error.message || "Server error..."
    let status= error.status || "Interval Server Error "

    let code = error.code || 500;
    
    if(+error.code === 11000) {
        code = 400;
        message = "Validation failed";
        //field
        let msgs = {};
        Object.keys(error.keyPattern).map((field) => {
            msgs[field] = field+ "should be unique"
        })
        result = msgs;
    }

    res.status(code).status.json({
        result: result,
        message: message,
        meta: null,
        status: status
    })


});

module.exports= app;