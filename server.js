const express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
cors = require('cors'),
mongoose = require('mongoose');

const app = express(),
port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'Session Secret!',
}));
app.use(cors());

//////////

const mongodb = require('./config/database');
const mongoDbConnect = async () => {
    try {
        await mongoose.connect(mongodb, {useNewUrlParser: true});
    } catch(err) {
        console.log(`Connecting to MongoDB: ${err}`);
    }    
}
mongoDbConnect();

const UserInfo = require('./models/userInfo');

//////////

app.get('/api/', (req, res) => {
    /* res.cookie("react_crud_cookie", "cookie_value_test", {maxAge: 360000}).send("Cookie Set");
    console.log('Cookies: ', req.cookies); */
});

app.post('/api/login', async (req, res) => {
    try {
        const loginInput = await UserInfo.findOne({username: req.body.username, password: req.body.password});

        if(loginInput != null) {
            res.send({status: 'OK', userData: loginInput});
            console.log(`Login: ${loginInput}`);
        } else {
            res.send({status: 'NOMATCH'});
            console.log(`Login Not Found: ${req.body.username} ${req.body.password}`);
        }
    } catch(err) {
        res.send({status: 'ERROR'});
        console.log(`Login error: ${err}`);
    }
});

app.get('/api/home', async (req, res) => {
    /* try {
        const allUsers = await UserInfo.find();
        console.log(allUsers);
        res.send(allUsers);
    } catch(err) {
        res.send(allUsers);
        console.log(`All UserInfo: ${err}`);
    } */
});

app.post('/api/create', async (req, res) => {
    const newUserInfo = new UserInfo({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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
    console.log(`Server OK: ${port}`);
});