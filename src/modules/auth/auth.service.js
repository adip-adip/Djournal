const UserModel = require("../user/user.model")
const {randomStringGenerator} = require("../../utilities/helper")
const bcrypt = require("bcryptjs")
const {Status} = require("../../config/constants.config");

class AuthService {
    // transformRegisterUser= async(req) => {
    //     const data = req.body
    //     // data.password= bcrypt.hashSync(data.password, 10);
    //     // data.activationToken = randomStringGenerator(30);
    //     // data.activeFor = new Date(Date.now() + (60*60*3*1000))
    //     // data.status = Status.INACTIVE;
    
    //     return data
    // } 

    registerUser = async(data) => {
        try{
            const usersObj = new UserModel(data)
            return await usersObj.save()
        }catch(exception){
            throw exception;
        }
    }

    // getSingleUserByFilter = async(filter) => {
    //     try{
    //         const user = await UserModel.findOne(filter);
    //         if(!user) {
    //             throw {code: 404, message: "User not found", status: "USER_NOT_FOUND" }
    //         } else  {
    //             return user;
    //         }
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    // updateUserById = async (id, data) => {
    //     try {
    //         const user = await UserModel.findByIdAndUpdate(id, {$set: data}, {new: true});
    //         return user;
    //     } catch(exception) {
    //         throw exception
    //     }
    //}
}

const authSvc = new AuthService()
module.exports = authSvc;