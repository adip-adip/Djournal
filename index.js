const http = require("http")
const app = require("./src/config/express.config")



const server = http.createServer(app)


server.listen(9005, "127.0.0.1", (err) => {
    if(!err){
        console.log("Server is running .....");
        console.log("press ctrl+c to exist");
    }
});