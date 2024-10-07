const journalSvc = require("./journal.service");
const moment = require("moment"); // You might need to install this package
const { createDTO } = require("./journal.contract"); // Assuming your DTO is in the same directory

class JournalController {
    // This function is used to list all the post data
    index = async (req, res, next) => {
        try {
            const journals = await journalSvc.getAllJournals();
            res.json({
                result: journals,
                meta: {
                    total: journals.length,
                },
                message: "Journals retrieved successfully",
                status: "journals_retrieved"
            });
        } catch (exception) {
            next(exception);
        }
    }

    // This function is used to store all the data.
    store = async (req, res, next) => {
        try {
            const { error } = createDTO.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: error.details[0].message,
                    status: "validation_error"
                });
            }
    
            const data = journalSvc.transFromData(req);
    
            // Check if the user has posted today
            const today = moment().startOf('day');
            const recentJournal = await journalSvc.getRecentJournalByUser(req.authUser._id, today);
    
            if (recentJournal) {
                return res.status(400).json({
                    message: "You can only post once a day.",
                    status: "content_creation_error"
                });
            }
    
            const content = await journalSvc.createJournal(data);
            await journalSvc.awardPoints(req.authUser._id, 10);
    
            // Calculate the streak
            const streak = await journalSvc.calculateStreak(req.authUser._id);
    
            res.status(201).json({
                result: content,
                streak, // Include streak in the response
                meta: null,
                message: "Content created successfully",
                status: "content_created"
            });
        } catch (exception) {
            next(exception);
        }
    }
    

    // This function is used to show a specific journal entry
    show = async (req, res, next) => {
        try {
            const journal = await journalSvc.getJournalById(req.params.id);
            if (!journal) {
                return res.status(404).json({
                    message: "Journal not found",
                    status: "journal_not_found"
                });
            }
            res.json({
                result: journal,
                message: "Journal retrieved successfully",
                status: "journal_retrieved"
            });
        } catch (exception) {
            next(exception);
        }
    }

    // This function is used to update a specific journal entry
    update = async (req, res, next) => {
        try {
            const { error } = createDTO.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: error.details[0].message,
                    status: "validation_error"
                });
            }

            const data = journalSvc.transFromData(req);
            const updatedJournal = await journalSvc.updateJournal(req.params.id, data);
            if (!updatedJournal) {
                return res.status(404).json({
                    message: "Journal not found",
                    status: "journal_not_found"
                });
            }
            res.json({
                result: updatedJournal,
                message: "Journal updated successfully",
                status: "journal_updated"
            });
        } catch (exception) {
            next(exception);
        }
    }

    // This function is used to delete a specific journal entry
    delete = async (req, res, next) => {
        try {
            const deleted = await journalSvc.deleteJournal(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    message: "Journal not found",
                    status: "journal_not_found"
                });
            }
            res.json({
                message: "Journal deleted successfully",
                status: "journal_deleted"
            });
        } catch (exception) {
            next(exception);
        }
    }
}

const journalCtrl = new JournalController();
module.exports = {
    journalCtrl
};
