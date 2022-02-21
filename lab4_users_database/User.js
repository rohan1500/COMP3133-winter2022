const mongoose = require("mongoose")

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validateCity = function (city) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(city)
};
var validateWeb = function (website) {
    var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;;
    return re.test(website)
};
var validatePhone = function(phone){
    var re = /\d{1}-\d{3}-\d{3}-\d{4}$/
    return re.test(phone)
};
var validateZip = function(zipcode){
    var re = /\d{5}-\d{4}$/
    return re.test(zipcode)
}

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Username can\'t be empty!"],
        minlength:4,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        required: [true,'Email can\'t be empty!'],
        validate: [validateEmail, 'Invalid Email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    city: {
        type: String,
        required: [true, "City can\'t be empty"],
        validate: [validateCity, 'Invalid city'],
    },
    website: {
        type: String,
        required: [true,'Website can\'t be empty'],
        validate: [validateWeb, 'Invalid URL'],
    },
    zipcode: {
        type: String,
        required: [true,'Zipcode can\'t be empty'],
        validate: [validateZip, 'Invalid zipcode'],
    },
    phone: {
        type: String,
        required: [true,'Phone number can\'t be empty'],
        validate: [validatePhone, 'Invalid phonenumber'],
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;