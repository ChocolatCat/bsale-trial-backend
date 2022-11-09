const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//init
const app = express();
const port = process.env.PORT || 3000;

let corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

//routers
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

const categoriesRouter = require('./routes/categories');
app.use('/api/categories', categoriesRouter);

//Express Listener
app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
});