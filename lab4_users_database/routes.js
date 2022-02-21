const User = require('./User');
const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.status(200).send("hello")
})
app.post('/users', async (req, res) => {
    try {
        const{username,email,website,phone} = req.body
        const { city, zipcode } = req.body.address
        const takenUsername = await User.findOne({ username })
        if (takenUsername !== null) {
            throw new Error('Username already is use')
        }
        const result = new User({
            username,email,city,website,zipcode,phone
        })
        const user = await  result.save()
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({error: err.message});
    }
})
app.post('/register', async (req, res) => {
    try {
        const { userName, firstName, lastName, password } = req.body
        const takenUsername = await User.findOne({ userName })
        if (takenUsername !== null) {
            throw new Error('Username is already in use')
        }
        const newUser = new User({
            userName, firstName, lastName, password
        })
        const user = await newUser.save();
        res.status(200).send({ user: user._doc })
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }

});

module.exports = app
