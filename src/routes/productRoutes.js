import express from 'express'
const Joi = require('@hapi/joi');


const productRoutes = express.Router();
const productsList = require('../../products.js')
productRoutes.get('/',(req,res)=>{
    res.send(productsList)
})

productRoutes.get('/:productId',(req,res)=>{
    const getProduct = productsList.find(a=>a.id == req.params.productId);
    if(getProduct){
       return res.status(200).send(getProduct);
    }else{
        return res.send('Product not found');
    }
})

productRoutes.post('/',(req,res)=>{
    const schema = {
        name:Joi.string().required(),
        category:Joi.string().required(),
        price:Joi.number().integer(),
        quantity:Joi.number().integer(),
        description:Joi.string().required(),
        image_url:Joi.string().required(),
    }
    const {error} = Joi.validate(req.body,schema);
    if(error){
        res.send(error.details[0].message)
    }
    else{
        const newProduct = {
            "id":productsList.length + 1,
            "name":req.body.name,
            "category":req.body.category,
            "price":req.body.price,
            "quantity":req.body.quantity,
            "description":req.body.description,
            "image_url": req.body.image_url
        }
        productsList.push(newProduct)
        res.send(productsList)
    }
})


module.exports= productRoutes;