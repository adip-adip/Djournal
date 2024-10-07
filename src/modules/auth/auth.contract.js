const joi = require("joi");

const registerDTO= joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,15}$/).required(),
    confirmPassword: joi.string().equal(joi.ref('password')).required().messages({
        "any.only": "Password and confirm Passwrod does not match"
    }),

    role: joi.string().regex(/^(premium|customer)$/)
})


const loginDTO = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


module.exports= {
    registerDTO,
    loginDTO
}