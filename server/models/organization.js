const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const organizationSchema = new Schema({
  name: String,
  description: String,
  logo: String,
  address: String,
  phoneNumber: Number,
  email: String,
  reviews: [{
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
  }],
  staff: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    role: {type: String, enum: ['ADMIN', 'VOLUNTEER']}
  }], 
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;