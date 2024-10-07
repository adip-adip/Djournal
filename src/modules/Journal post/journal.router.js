const { loginCheck } = require("../../middleware/auth.middleware");
const { journalCtrl } = require("./journal.controller");

const journalRouter = require("express").Router();


journalRouter.route("/post-journal")
    .get(loginCheck, journalCtrl.index)
    .post(loginCheck, journalCtrl.store)


journalRouter.route("/:id")
    .get(loginCheck,journalCtrl.show)
    .put(loginCheck, journalCtrl.update)
    .delete(loginCheck, journalCtrl.delete)

module.exports = journalRouter;