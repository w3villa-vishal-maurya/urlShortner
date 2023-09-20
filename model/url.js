const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type : String,
        required : true,
        unque : true
    },
    redirectURL :{
        type : String,
        required : true
    },
    validateHistory : [{timestamp : {type : Number}}],
},
{timestamps : {required : true}}
)

const URL =  mongoose.model('url', urlSchema);

module.exports = URL;