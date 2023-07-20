const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    TXNDATE: {
        type: String,
    },
    VALUEDATE: {
        type: String,
    },
    DESCRIPTION: {
        type: String,
    },
    REFERENCE: {
        type: String,
    },
    CREDITS: {
        type: String,
    },
    DEBITS: {
        type: String,
    },
    BALANCE: {
        type: String,
    },
});


module.exports = mongoose.model("User", UserSchema);