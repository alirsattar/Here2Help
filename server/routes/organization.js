const express = require('express');
const router  = express.Router();
const Organization = require('../models/organization');

/* GET home page */
router.get('/:id', (req, res, next) => {
  Organization.findById(req.params.id)
  .then(org => {res.json(org)})
  .catch(err => {res.json(err)});
});

router.post('/', (req, res, next) => {
  let newOrg = new Organization ({
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    reviews: [],
    staff: [],
    events: []
  });
  newOrg.save()
  .then(res => {
    res.status(200).json(res);
  })
  .catch(err => {
    res.status(400).json({ message: 'Something went wrong' });
  })
});


module.exports = router;

// name: String,
// description: String,
// logo: String,
// address: String,
// phoneNumber: Number,
// email: String,
// reviews: [{
//   author: {type: Schema.Types.ObjectId, ref: 'User'},
//   content: String
// }],
// staff: [{
//   user: {type: Schema.Types.ObjectId, ref: 'User'},
//   role: {type: String, enum: ['ADMIN', 'VOLUNTEER']}
// }], 
// events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
// });