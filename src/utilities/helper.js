const fs = require("fs");

const randomStringGenerator = (len=100) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const length = chars.length;
    let random = "";
    for(let i =0; i < len; i++) {
        const position = Math.celi(Math.random()*(length-1))
        random += chars[position]
     }
}

module.exports= {
    randomStringGenerator
}