const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const organizationSchema = new Schema({
  name: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phoneNumber: {type: Number, required: true, unique: true},
  description: String,
  logo: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  staff: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    role: {type: String, enum: ['ADMIN', 'VOLUNTEER']}
  }], 
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;