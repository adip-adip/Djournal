const Joi = require("joi")
const { Status } = require("../../config/constants.config")


const  createDTO = Joi.object({
        name: Joi.string().min(2).required(),
        status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
        content: Joi.string().required(),
        startdate: Joi.date().required()
    })

module.exports = {
    createDTO
}
