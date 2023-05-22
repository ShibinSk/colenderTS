const mongoose =require('mongoose')


const EventSchema=mongoose.Schema({
    start:Date,
    end:Date,
    title:String

})

const ev=mongoose.model("Event",EventSchema);
module.exports=ev
