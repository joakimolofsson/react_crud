const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

const app = express(),
port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongodb = require('./config/database');
const mongoDbConnect = async () => {
    try {
        await mongoose.connect(mongodb, {useNewUrlParser: true});
    } catch(err) {
        console.log(`Connecting to MongoDB: ${err}`);
    }    
}
mongoDbConnect();

//////////

const UserInfo = require('./models/userInfo');

app.get('/api/get', async (req, res) => {
    try {
        const allUsers = await UserInfo.find();
        res.send(allUsers);
    } catch(err) {
        res.send(allUsers);
        console.log(`Get UserInfo: ${err}`);
    }
});

app.post('/api/post', async (req, res) => {
    const inputData = req.body;

    const newUserInfo = new UserInfo({
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        email: inputData.email,
        username: inputData.username,
        password: inputData.password,
        timestamp: new Date()
    });

    try {
        await newUserInfo.save();
        res.sendStatus(200);
        console.log(`Post UserInfo: ${JSON.stringify(req.body)} ${Date()}`);
    } catch(err) {
        res.sendStatus(400);
        console.log(`Post UserInfo: ${err}`);
    }
});

//////////

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});