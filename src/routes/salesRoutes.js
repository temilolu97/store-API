import express from 'express'

const salesRoutes = express.Router();
const salesList = require('../../sales.js')
const Joi = require('@hapi/joi')
salesRoutes.get('/',(req,res)=>{
    res.send(salesList);
})

salesRoutes.get('/:salesId',(req,res)=>{
    const sale = salesList.find(a => a.id == req.params.salesId);
    if(sale) {
        return res.status(200).send(sale);
    }
    else{
        return res.send('Data requested not found');
    }
})

salesRoutes.post('/',(req,res)=>{
    const schema = {
        price:Joi.string().required()
    }
    const { error } =Joi.validate(req.body, schema);
    if(error){
        res.send(error.details[0].message);
    }
    else{
        const newsale= {
            "id": salesList.length + 1,
            "price":req.body.price
        }
        salesList.push(newsale);
        res.send(salesList)
    }
})
module.exports = salesRoutes;