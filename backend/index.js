const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware setup
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cookieParser())
//app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route')
const reviewRoutes = require('./src/reviews/reviews.router')

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes)


main()
  .then(() => console.log('Mongo successfully connected'))
  .catch((err) => console.log(err));

async function main() {
  mongoose.connect(process.env.MONGO_URL);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
