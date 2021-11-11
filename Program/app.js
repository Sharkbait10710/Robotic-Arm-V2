const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const motorsRoutes = require('./api/routes/motors');

mongoose.connect('mongodb://Control-User:'+process.env.MONGO_ATLAS_PW+'@robotic-arm-control-pro-shard-00-00.knhom.mongodb.net:27017,robotic-arm-control-pro-shard-00-01.knhom.mongodb.net:27017,robotic-arm-control-pro-shard-00-02.knhom.mongodb.net:27017/Rest?ssl=true&replicaSet=atlas-12y2yu-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method ==="OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/motors', motorsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, erq, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;