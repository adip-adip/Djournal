const JournalModel = require("./journal.model");
const UserModel = require("../user/user.model"); // Ensure to import UserModel

class JournalService {
    transFromData = (req) => {
        const data = req.body;
        data.user = req.authUser._id; // Changed 'createdBy' to 'user' for consistency
        return data;
    }

    createJournal = async (data) => {
        try {
            const journal = new JournalModel(data);
            return await journal.save();
        } catch (exception) {
            console.error("Error creating journal:", exception);
            throw exception; // Rethrow the error for the controller to handle
        }
    }

    async getAllJournals() {
        return await JournalModel.find().populate('user'); // Populate user if needed
    }

    async getRecentJournalByUser(userId, date) {
        return await JournalModel.findOne({
            user: userId, // Ensure consistent field name
            createdAt: { $gte: date.toDate() } // Assuming you use 'createdAt' field
        });
    }
    
    async getJournalById(id) {
        return await JournalModel.findById(id).populate('user'); // Populate user if needed
    }

    async updateJournal(id, data) {
        const updatedJournal = await JournalModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedJournal) {
            throw new Error("Journal not found");
        }
        return updatedJournal;
    }

    async deleteJournal(id) {
        const deletedJournal = await JournalModel.findByIdAndDelete(id);
        if (!deletedJournal) {
            throw new Error("Journal not found");
        }
        return deletedJournal;
    }

    async awardPoints(userId, points) {
        return await UserModel.findByIdAndUpdate(userId, { $inc: { points: points } });
    }

    async calculateStreak(userId) {
        const today = moment().startOf('day');
        const entries = await JournalModel.find({
            user: userId,
            createdAt: { $gte: today.subtract(7, 'days').toDate() }, // Check entries in the last week
        }).sort({ createdAt: -1 });
    
        let streak = 0;
    
        for (let i = 0; i < entries.length; i++) {
            const entryDate = moment(entries[i].createdAt).startOf('day');
    
            // If the entry is from today or consecutive days, increase the streak
            if (entryDate.isSame(today, 'day')) {
                streak++;
                today.subtract(1, 'days'); // Move to yesterday
            } else if (entryDate.isSame(today, 'day')) {
                streak++;
                break; // Stop if the streak is broken
            } else {
                break; // No more consecutive days
            }
        }
    
        return streak;
    }

}

const journalSvc = new JournalService();

module.exports = journalSvc;
