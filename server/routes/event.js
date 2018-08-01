const express = require('express');
const router  = express.Router();
const Event = require('../models/event');

// POST ROUTE FOR CREATING A NEW EVENT
router.post('/events/create', (req, res, next) => {
  let newEvent = new Event({
    participants: [],
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
    status: req.body.status,
    pictures: [],
    reviews: []
  });
  
  if(!newEvent.name      || newEvent.name      === '') {res.status(400).json({message: 'The event name is required'      }); return}
  if(!newEvent.type      || newEvent.type      === '') {res.status(400).json({message: 'The event type is required'      }); return}
  if(!newEvent.location  || newEvent.location  === '') {res.status(400).json({message: 'The event location is required'  }); return}
  if(!newEvent.startTime || newEvent.startTime === '') {res.status(400).json({message: 'The event start time is required'}); return}
  if(!newEvent.endTime   || newEvent.endTime   === '') {res.status(400).json({message: 'The event end time is required'  }); return}
  if(!newEvent.status    || newEvent.status    === '') {res.status(400).json({message: 'The event status is required'    }); return}

  newEvent.save((err, event) => {
    if(err) {res.status(400).json(err)}
    else if(!event) {res.status(400).json({message: 'Unable to create event'})}
    else {res.status(200).json(event)}
  });
});

// GET ROUTE FOR GETTING ALL EVENTS
router.get('/events/', (req, res, next) => {
  Event.find((err, events) => {
    if(err) {res.status(400).json(err)}
    else {res.status(200).json(events)};
  })
});


// POST ROUTE FOR UPDATING ONE EVENT


// POST ROUTE FOR DELETING ONE EVENT

  
// GET ROUTE FOR GETTING ONE EVENT


module.exports = router;