
const randomStringGenerator = (len=100) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const length = chars.length;
    let random = "";
    for(let i =0; i < len; i++) {
        const position = Math.ceil(Math.random()*(length-1))
        random += chars[position]
     }
     return random
}

module.exports= {
    randomStringGenerator
}