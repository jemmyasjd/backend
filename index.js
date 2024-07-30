const express = require('express');
const {connectDB} = require('./connection.js');
const cors = require('cors');
require('dotenv').config();
const PayemntRouter = require('./routes/payment');
const ProductRouter = require('./routes/product');
const OderRouter = require('./routes/order');


const app = express();
const port = process.env.PORT || 4000;

// console.log(port);

connectDB(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/payment', PayemntRouter);
app.use('/product', ProductRouter);
app.use('/order', OderRouter);

app.get('/', (req, res) => {
    res.send('Hello World from cicd');
});  

app.post('/test', (req, res) => {
    console.log(req.body);
    const userId = req.auth.userId;
    console.log('User ID:', userId);
    res.json({url: 'http://localhost:3000/success'});
});


app.listen(port, () => {
    console.log('Server running on port 4000');
});