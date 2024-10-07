const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
});

const JournalModel = mongoose.model("Journal", JournalSchema);

module.exports = JournalModel;
