const express = require('express');
const Mongoose = require('mongoose');
const router = express.Router();

const Motor = require('../models/motor');
router.get('/:motorId', (req, res, next) => {
    const id = req.params.motorId;
    switch (id) {
        case 'getAll': 
        Motor.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
            break;
        default:
                Motor.findById(id)
                .exec()
                .then(doc => {
                    console.log("From database", doc);
                    if (doc) {
                        res.status(200).json(doc);
                    } else{
                        res.status(404).json({message: 'No valid entry found for provided ID'});
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
            break;
    }
});

router.post('/', (req, res, next) => {
    const motor = new Motor ({
        _id: new Mongoose.Types.ObjectId(),
        name: req.body.name,
        state: req.body.state
    });
    motor
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Made ' + req.body.name + ' data in Mongo',
            motor_information: motor
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch("/:motorId", (req, res, next) => {
    const id = req.params.motorId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Motor.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



module.exports = router;