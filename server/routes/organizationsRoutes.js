const express = require('express');
const router  = express.Router();
const Organization = require('../models/organization');

// POST ROUTE FOR CREATING A NEW ORGANIZATION
router.post('/create', (req, res, next) => {
  let newOrg = new Organization ({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description,
    logo: req.body.logo,
    address: req.body.address,
    reviews: [],
    staff: [],
    events: []
  });
  newOrg.save((error, org) => {
    if(error) {res.status(400).json(error);}
    else {res.status(200).json(org);}
  });
});

// GET ROUTE FOR GETTING ALL ORGANIZATIONS
router.get('/', (req, res, next) => {
  Organization.find((err, orgs) => {
    if(err) {res.status(400).json(err)}
    else if(!orgs) {res.status(400).json({message: 'Could not find any organizations'})}
    else {res.status(200).json(orgs)}
  })
});

// POST ROUTE FOR UPDATING ONE ORGANIZATION
router.post('/:id/edit', (req, res, next) => {
  if(!req.body.name        || req.body.name        === '') {res.status(400).json({message: 'Organization name is required'         }); return}
  if(!req.body.address     || req.body.address     === '') {res.status(400).json({message: 'Organization address is required'      }); return}
  if(!req.body.email       || req.body.email       === '') {res.status(400).json({message: 'Organization email is required'        }); return}
  if(!req.body.phoneNumber || req.body.phoneNumber === '') {res.status(400).json({message: 'Organization phone number is required' }); return}

  Organization.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, org) => {
    if(err) {res.status(400).json(err)}
    else if(!org) {res.status(400).json({message: 'Organization does not exist'})}
    else {res.status(200).json(org)}
  });
});

// POST ROUTE FOR ADDING REVIEWS
router.post('/:id/addReview/:reviewId', (req, res, next) => {
  Organization.findByIdAndUpdate(req.params.id, {$push: {reviews: req.params.reviewId}}, {new:true}, (err, conf) => {
    if(err) {res.status(400).json(err)}
    else    {res.status(200).json(conf)}
  })
});

// POST ROUTE FOR DELETING ONE ORGANIZATION
router.post('/:id/delete', (req, res, next) => {
  Organization.findByIdAndRemove(req.params.id, (err, org) => {
    if(err)       {res.status(400).json(err)}
    else if(!org) {res.status(400).json({message: 'Organization does not exist'})}
    else          {res.status(200).json({message: 'Success'})}
  })
})
  
// GET ROUTE FOR GETTING ONE ORGANIZATION
router.get('/:id', (req, res, next) => {
  Organization.findById(req.params.id, (err, org) => {
    if(err) {res.status(400).json(err)}
    else if (!org) {res.status(400).json({message: 'Organization does not exist'})}
    else {res.status(200).json(org)}
  });
});

module.exports = router;