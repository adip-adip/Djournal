const UserModel = require("../user/user.model")

const authRouter = require("express").Router();



authRouter.post( '/api/users', async (req, res) => {
    try {
        const newUser = new UserModel(req.body); // Assuming req.body contains user data
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});
// authRouter.get("/activate/:token", authCtrl.activateRegisteredUser);
// authRouter.get("/re-send/activation/:token", authCtrl.resendToken);

// authRouter.get("/me", loginCheck, authCtrl.getLoggedInUser)



// authRouter.post("/login", bodyValidator(loginDTO), authCtrl.login);

// authRouter.delete("/logout",loginCheck, authCtrl.logout)

// authRouter.post("/forget-password", authCtrl.forgetPassword)

// authRouter.patch("/reset-password/:token",)



module.exports=authRouter;

