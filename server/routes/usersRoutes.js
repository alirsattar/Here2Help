const express       = require('express');
const router        = express.Router();
const User          = require('../models/user');
const bcrypt        = require('bcryptjs');
const passport      = require('passport');


// POST ROUTE FOR CHANGING USER'S INFO
router.post('/edit/:userID', (req, res, next) => {
    const userID = req.params.userID;
    User.findByIdAndUpdate(userID, req.body, {new: true}, (err, theUser) => {
        if(err) {res.status(400).json(err)}
        else if(!theUser) {res.status(400).json({message: 'User not found'})}
        else {res.status(200).json(theUser)}
    });
});

// ----------------------------------------------------------------------------------

// add orgId to orgs array on user model if provided
// also add user to org's users-list if needed

// POST ROUTE FOR CREATING A NEW USER
router.post('/signup', (req, res, next) => {
    const email         = req.body.email;
    const password      = req.body.password;
    const firstName     = req.body.firstName;
    const lastName      = req.body.lastName;
    const zipCode       = req.body.zipCode;
    const phoneNumber   = req.body.phoneNumber;
    const orgAdmin      = req.body.orgAdmin;
    
    if (!email || !password) {
        res.status(400).json({ message: 'Provide email and password' });
        return;
    }
    User.findOne({ email }, '_id', (err, foundUser) => {
        if (foundUser) {
            res.status(400).json({ message: 'The email already exists' });
            return;
        }
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const theUser = new User({
            email,
            password:       hashPass,
            firstName:      firstName,
            lastName:       lastName,
            zipCode:        zipCode,
            phoneNumber:    phoneNumber,
            orgAdmin:       orgAdmin,
        });
        theUser.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Something went wrong' });
                return;
            }
            req.login(theUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Something went wrong' });
                    return;
                }
                res.status(200).json(req.user);
            });
        });
    });
});

// ----------------------------------------------------------------------------------

// LOGIN POST ROUTE
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' });
            return;
        }
        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }
        // We are now logged in (notice req.user)
            res.status(200).json(req.user);
        });
    })(req, res, next);
});

// ----------------------------------------------------------------------------------

// POST ROUTE FOR LOGOUT
router.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
});

// ----------------------------------------------------------------------------------

// GET ROUTE FOR CHECKING IF USER IS LOGGED IN
router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

// ----------------------------------------------------------------------------------

// POST ROUTE FOR DELETING A USER'S ACCOUNT
router.post('/delete/:userID', (req, res, next) => {
    const userID = req.params.userID;
    User.findByIdAndRemove(userID, (err, theUser) => {
        if(err) {res.status(400).json(err)}
        else if(!theUser)       {res.status(400).json({message: 'User does not exist'})}
        else                    {res.status(200).json({message: 'Success'})}
    });
});

// ----------------------------------------------------------------------------------

// GET ROUTE FOR PULLING SINGLE USER'S INFO
router.get('/:userID', (req, res, next) => {
    const userID = req.params.userID;
    User.findById(userID)
    .populate('events')
    .populate('organizations')
    .populate('reviews')
        .then((theUser) => {
        if (!theUser)           {res.status(400).json({message: 'User does not exist'})}
        else                    {res.status(200).json(theUser)}
        })
        .catch((err)=>{
            res.status(400).json(err)
        });
});

// GET ROUTE FOR PULLING ALL USERS
router.get('/', (req,res,next)=>{
    User.find()
        .then((allUsers)=>{
            if (!allUsers)      {res.status(400).json({message: 'User does not exist'})}
            else                {res.status(200).json(allUsers)}
        })
        .catch((err)=>{
            res.status(400).json(err);
        });
});

// ORIGINAL ROUTE FOR SINGLE USER INFO
// router.get('/:userID', (req, res, next) => {
//     const userID = req.params.userID;
//     User.findById(userID, (err, theUser) => {
//         if(err) {res.status(400).json(err)}
//         else if (!theUser) {res.status(400).json({message: 'User does not exist'})}
//         else {res.status(200).json(theUser)}
//     });
// });

module.exports = router;