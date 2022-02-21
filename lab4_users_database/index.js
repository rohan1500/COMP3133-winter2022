const mongoose = require('mongoose');
const express = require('express')
const router = require('./routes.js');

const app = express()
app.use(express.json())

mongoose.connect(`mongodb://localhost:27017/users`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection',err)
});

app.use(router);

app.listen(port = 3000, () => { console.log(`Server is running...${port}`) });