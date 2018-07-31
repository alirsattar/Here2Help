const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    firstName:            String,
    lastName:             String,
    zipCode:              Number,
    email:                String,
    skills:               [String],
    preferredEventType:   [String],
    profilePicture:       String,
    phoneNumber:          Number,
    orgAdmin:             [{type: Schema.Types.ObjectId, ref: 'Organization'}],
    events:               [{type: Schema.Types.ObjectId, ref: 'Event'}]
},
{  
    usePushEach: true
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;