const authCtrl = require("./auth.controller");

const {bodyValidator} = require("../../middleware/validator.middleware")

const {registerDTO,loginDTO} = require("./auth.contract")

const authRouter = require("express").Router();

const {loginCheck} = require("../../middleware/auth.middleware"); 

authRouter.post("/register", bodyValidator(registerDTO), authCtrl.register);
authRouter.get("/activate/:token", authCtrl.activateRegisteredUser);
authRouter.get("/re-send/activation/:token", authCtrl.resendToken);

authRouter.get("/me", loginCheck, authCtrl.getLoggedInUser)



authRouter.post("/login", bodyValidator(loginDTO), authCtrl.login);

authRouter.delete("/logout",loginCheck, authCtrl.logout)

authRouter.post("/forget-password", authCtrl.forgetPassword)

authRouter.patch("/reset-password/:token",)



module.exports=authRouter;

