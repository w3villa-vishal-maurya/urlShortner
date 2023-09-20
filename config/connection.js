const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToDb(url){
    await mongoose.connect(url)
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log("connection err");
    });
}

module.exports = {
    connectToDb
}