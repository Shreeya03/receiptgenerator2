const User = require("./schema");

const reader = require('xlsx')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kropbook', {
    useNewUrlParser: true,

});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
        
module.exports={
     
    fetchData:function(callback){
       var userData=User.find({});
       userData.exec(function(err, data){
           if(err) throw err;
           return callback(data);
       })
       
    }
}
