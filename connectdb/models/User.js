const MongoClient = require('mongodb').MongoClient;

const userSchema = new MongoClient.Schema({
    email: {
        type: String,
        unique:true,
        requiered:true
    },
    password:{
        type:String,
        requiered:true
    }
})

MongoClient.model('User',userSchema);


