const { mongoose } = require('./mongoose');
const userSchema = require('./userMongoose')
const commentSchema = new mongoose.Schema({
    user: userSchema,
    comment: {
        type: String,
        required: true,
        trim: true
    }

});


module.exports = commentSchema

