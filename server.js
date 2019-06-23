const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

app.use(express.json());

// DB Config
 const db = config.get('mongoURI');

 // connect to mongodb
 mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

//use route
app.use('/api/items', require('./routes/api/item'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

// server static assets if in production

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const port = process.env.PORT || 5000;


app.listen(port, () => console.log('Server start on port 5000'));