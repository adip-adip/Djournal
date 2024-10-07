const router = require("express").Router();

const journalRouter = require("../modules/Journal post/journal.router");
const authRouter = require("../modules/auth/auth.router");


// const authRouter = require()

router.use("/auth", authRouter)
/
router.use("/postBox", journalRouter)

// router.use("/auth",auth)

router.use("/", (request,response) => {
    response.end("Hello world");
})

module.exports = router;
