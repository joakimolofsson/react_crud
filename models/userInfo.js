const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        username: String,
        password: String,
        timestamp: String
    },
    {
        collection: 'userInfoColl'
    }
);
const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;