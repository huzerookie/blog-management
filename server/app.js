const express = require('express')
const app = express();
const path = require("path");
const Post = require("./db/postsMongoose")
const cors = require("cors");
const base64 = require("base-64");
const rateLimit = require("express-rate-limit")
const viewsPath = path.join(__dirname, "../full_code/ng-cribs");
console.log(viewsPath)
const port = process.env.PORT || 3000;
const posts = require('../full_code/ng-cribs/data/data.json');
const { base } = require('./db/postsMongoose');
const { post } = require('./db/userMongoose');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif', 'images/jpg'];
//Initialize with express
app.use(express.urlencoded({ extended: false, limit: '200mb' }))
app.use(express.json({ limit: '200mb' }))
app.use(express.static(viewsPath));
app.use(cors());


app.get('/get-posts', async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: 'desc' }).exec();
        const newPosts = []
        posts.forEach(post => {
            if (post.coverImage == null) {
                newPosts.push(post);
                return;
            }
            return newPosts.push({ ...post._doc, "coverImage": post.coverImage.toString("utf8") });
        })
        res.json(newPosts);
    } catch (e) {
        res.send(e.message);
    }
})
app.post('/add-post', async (req, res) => {
    try {
        console.log('in post')
        const post = new Post(req.body);
        saveCover(post)
        await post.save();
        console.log("Reaches here");
        res.json({ "data": "success" });
    } catch (e) {
        console.log(e);
        res.send(e).status(400);
    }
})

function getPostString(coverImage) {
    return new Promise((resolve, reject) => {
        console.log(coverImage.toString('utf8'))
        resolve(coverImage.toString('utf8'));
    })
    // console.log(posts)
}


function saveCover(post) {
    if (post.coverImageType == null || !imageMimeTypes.includes(post.coverImageType)) return;
    if (post.coverImage == null) return;
    post.coverImage = Buffer.from(post.coverImage, 'utf8');
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 Mins
    max: 100 //100 IP to 100 Req per window
})
app.use(limiter);
const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})