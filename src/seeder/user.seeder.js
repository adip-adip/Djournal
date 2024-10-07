const bcrypt = require("bcryptjs");
const UserModel = require("../modules/user/user.model");


const users =[ 
    {
        name: "Admin User",
        email: "admin@ecommerce.com",
        password: bcrypt.hashSync("Admin123#", 10),
        address: "Kathmandu, Nepal", 
        phone: "123123123123", 
        role: "admin",
        status: "active"
    },
    {
        name: "Regular User",
        email: "user@ecommerce.com",
        password: bcrypt.hashSync("User123#", 10),
        address: "Pokhara, Nepal",
        phone: "321321321321",
        role: "user",
        status: "active"
    }
]

    const runUserSeeders = async () => {
        try {
            const populates = [];
    
            for(let user of users) {
                const exists =await UserModel.findOne({
                    email: user.email
                })
                if(!exists) {
                    const userObj = new UserModel(user);
                    populates.push(userObj.save())
                }
            }
            if(populates.length) {
                await Promise.allSettled(populates)
                console.log("--- Users Table seeded Successfully ----")
            }
        } catch(exception) {
            console.log('-------- Error executing seeder -------', exception);
        }
    }
    
    module.exports = runUserSeeders;