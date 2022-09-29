const mongoose = require("mongoose");
const { stringify } = require("querystring");
const eventReservationSchema = mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  eventId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "event"
  },
});
const eventReservation = mongoose.model("EventReservation", eventReservationSchema );
module.exports = eventReservation;
