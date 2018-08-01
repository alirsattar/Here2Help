const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
    author:         [{ type: Schema.Types.ObjectId, ref: 'User' }],
    content:        String,
    eventID:        [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    orgID:          [{ type: Schema.Types.ObjectId, ref: 'Organization' }]
},
{  
    usePushEach: true
},{
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;