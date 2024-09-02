require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post'); // creating a post and storing the data in mongodb DB
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs'); // use it to rename the file name

const port = 4000;
const salt = bcrypt.genSaltSync(10); // to hash a password
const secret = process.env.JWT_SECRET; // secretkey used to sign the token

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // credentials ko true kro and origin is react app hosting url
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // we should add the endpoint for our image

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.post("/register", async (req, res) => {
    try { // try catch to not let same user register multiple times
        const { username, password } = req.body; // fetch username and password from body
        const UserDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt), // bcrypt the password
        }); // Create a new user
        res.json(UserDoc);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOK = bcrypt.compareSync(password, userDoc.password); // retuen true if pass matches
    // res.json(passOK);

    if (passOK) {
        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            // res.cookie('token', token).json('OK'); instead of sending ok in json 
            res.cookie('token', token).json({
                id: userDoc._id, //._id because it is written in that form in the preview section of profile
                username,
            });
        });
    } else {
        res.status(404).json({ message: 'Request failed' });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
    //res.json(req.cookies);
});

app.post("/logout", (req, res) => {
    res.cookie('token', '').json('OK');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => { // .single('file') cause we ahve named it as data.set('file', files[0]);
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]; // we will be sending the file extension not the whole for clear view
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath); // to get the filename with ext

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath, // cover for the image with the filename and ext
            author: info.id, // this will help to create a new user id and use it as ref so we used jwt just like in prev case above it
        });
        res.json(postDoc);
        //res.json(info);
    });

    //res.json({extension});
    //res.json({title, summary, content});
});


app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }


    const { token } = req.cookies; // get the credentials from editpost.js
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        // isAuthor is to be a js object so use json.stringify then it will match the authors and send status as true
        //otherwise if we use without json.stringify then it will return false (always)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        // res.json({isAuthor, postDoc, info});

        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }

        //if we are the author then update the postDoc
        // there are 2 METHODS BELOW USE ANY ONE
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });
    // postDoc.title = title;
    // postDoc.summary = summary;
    // postDoc.content = content;
    // if (newPath) {
    //     postDoc.cover = newPath;
    // }

    // await postDoc.save();

    // res.json(postDoc);

    // const PostDoc = await Post.create({
    // title,
    // summary,
    // content,
    // cover: newPath, // cover for the image with the filename and ext
    // author: info.id, // this will help to create a new user id and use it as ref so we used jwt just like in prev case above it
    //});
    // res.json(PostDoc);
});

app.get('/post', async (req, res) => {
    //res.json(await Post.find()); // what we want from author i.e, his username otherwise it will print his password too in default
    try {
        res.json(await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 }) // this will bring the recent blog on the top
            .limit(20) //in case of 10 posts only more than 10 posts no sorting
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error populating author' });
    }
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params; // to fetch the id of the post
    const postDoc = await Post.findById(id).populate('author', ['username']); // i want to get only username and author info
    res.json(postDoc); // get all the info about the post 
});

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});

