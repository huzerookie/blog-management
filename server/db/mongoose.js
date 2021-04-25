const mongoose = require("mongoose");
const mongooseURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-management';

//Connection Setup for Mongoose
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //Creates indexes for faster record access
    useFindAndModify: false, //For avoiding deprication warnings
});
module.exports = {
    mongoose,
}