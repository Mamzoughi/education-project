const mongoose=require("mongoose");
const eventSchema=mongoose.Schema({
    eventName:String,
    eventDescription:String,
    eventDate:String,
    eventCreatorId:String,
    eventPlace:String,
    eventPrice: Number,
    img: String,
})
const event=mongoose.model("Event", eventSchema);
module.exports=event;