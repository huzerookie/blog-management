const { mongoose } = require('./mongoose');
const commentSchema = require('./commentsMongoose')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 80

    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    content: {
        type: String,
        maxlength: 50,
        trim: true
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},
    { timestamps: true }
);

postSchema.virtual('coverImagePath').get(function () {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post

