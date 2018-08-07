const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const timestamps    = require('mongoose-timestamp');


//need to add validation

const userSchema = new Schema({
    firstName:            String,
    lastName:             String,
    zipCode:              Number,
    email:                String,
    password:             String,
    skills:               [String],
    preferredEventType:   [String],
    profilePicture:       {type: String, default: 'https://vignette.wikia.nocookie.net/shingekinokyojin/images/c/c0/Anonymous_User.jpg/revision/latest?cb=20160312154300'},
    phoneNumber:          Number,
    orgAdmin:             [{type: Schema.Types.ObjectId, ref: 'Organization', default: []}],
    events:               [{type: Schema.Types.ObjectId, ref: 'Event', default: []}],
    organizations:        [{type: Schema.Types.ObjectId, ref: 'Organization', default: []}]
},
{  
    usePushEach: true
},{
    timestamps: {
      timestamps: true
    }
});

userSchema.plugin(timestamps);

const User = mongoose.model('User', userSchema);

module.exports = User;