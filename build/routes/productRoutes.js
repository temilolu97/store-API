'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Joi = require('@hapi/joi');

var productRoutes = _express2.default.Router();
var productsList = require('../../products.js');
productRoutes.get('/', function (req, res) {
    res.send(productsList);
});

productRoutes.get('/:productId', function (req, res) {
    var getProduct = productsList.find(function (a) {
        return a.id == req.params.productId;
    });
    if (getProduct) {
        return res.status(200).send(getProduct);
    } else {
        return res.send('Product not found');
    }
});

productRoutes.post('/', function (req, res) {
    var schema = {
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().integer(),
        quantity: Joi.number().integer(),
        description: Joi.string().required(),
        image_url: Joi.string().required()
    };

    var _Joi$validate = Joi.validate(req.body, schema),
        error = _Joi$validate.error;

    if (error) {
        res.send(error.details[0].message);
    } else {
        var newProduct = {
            "id": productsList.length + 1,
            "name": req.body.name,
            "category": req.body.category,
            "price": req.body.price,
            "quantity": req.body.quantity,
            "description": req.body.description,
            "image_url": req.body.image_url
        };
        productsList.push(newProduct);
        res.send(productsList);
    }
});

module.exports = productRoutes;