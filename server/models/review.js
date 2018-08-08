const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const timestamps    = require('mongoose-timestamp');

const reviewSchema = new Schema({
    author:         { type: Schema.Types.ObjectId, ref: 'User' },
    subject:        { type: Schema.Types.ObjectId },
    content:        String,
    eventID:        { type: Schema.Types.ObjectId, ref: 'Event' },
    orgID:          { type: Schema.Types.ObjectId, ref: 'Organization' },
    reviewPhoto:    { type: String, default: '/assets/images/review_placeholder.png'}// <-- TO BE REPLACED BY USER'S
},                                                                                    //      PROFILE PICTURE ON REVIEW
{                                                                                     //      CREATION IN THE DB
    usePushEach: true
},{
    timestamps: true
});

reviewSchema.plugin(timestamps);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;