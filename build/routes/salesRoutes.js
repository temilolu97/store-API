'use strict';

var express = require('express');

var salesRoutes = express.Router();
var salesList = require('../../sales.js');
var Joi = require('@hapi/joi');
salesRoutes.get('/', function (req, res) {
    res.send(salesList);
});

salesRoutes.get('/:salesId', function (req, res) {
    var sale = salesList.find(function (a) {
        return a.id == req.params.salesId;
    });
    if (sale) {
        return res.status(200).send(sale);
    } else {
        return res.send('Data requested not found');
    }
});

salesRoutes.post('/', function (req, res) {
    var schema = {
        price: Joi.string().required()
    };

    var _Joi$validate = Joi.validate(req.body, schema),
        error = _Joi$validate.error;

    if (error) {
        res.send(error.details[0].message);
    } else {
        var newsale = {
            "id": salesList.length + 1,
            "price": req.body.price
        };
        salesList.push(newsale);
        res.send(salesList);
    }
});
module.exports = salesRoutes;