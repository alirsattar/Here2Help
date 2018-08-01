const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  participants:[{
    user: {type: Schema.Types.ObjectId, ref: 'User'}, 
    role: {type: String, enum: ['organizer', 'sponsor', 'performer', 'staff', 'security']}
  }],
  name: {type: String, required: true},
  type: {type: String, required: true},
  location: {type: String, required: true},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  status: {type: String, enum: ['confirmed', 'pending', 'cancelled']},
  pictures: {type: String},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;