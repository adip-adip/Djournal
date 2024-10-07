const mongoose = require("mongoose");

const initDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_NAME,
            autoCreate: true, 
            autoIndex: true
        })
        console.log("DB server connected sucessfully")
    }catch(exception){  
        console.log(process.env.MONGODB_URL)
        console.log(process.env.MONGODB_NAME)
        console.log("Error connecct in db....", exception)
        process.exit(1)

    }
}

initDB();