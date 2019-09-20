import express from 'express'
import bodyParser from 'body-parser'
const basicAuth = require('express-basic-auth')

const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//authentication
const users = require('./users.js');
const unauthorized=(res)=>{
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
}
const auth = (req,res,next)=>{
    if(users.some(a=>a.fname==req.body.fname)){
        next()
    }
    else{
        return unauthorized(res)
    
    }
}


//productRouter
const productRoutes = require('./src/routes/productRoutes.js');
app.use('/products',auth,productRoutes);

//salesRouter
const salesRoutes = require('./src/routes/salesRoutes.js');
app.use('/sales',auth, salesRoutes);



const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('listening on port ' + port)
})