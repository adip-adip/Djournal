const joi = require("joi");

const registerDTO= joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required()
})




module.exports= {
    registerDTO,
    
}