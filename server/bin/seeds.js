const mongoose          = require('mongoose');
const Schema            = mongoose.Schema();

const User              = require('../models/user');
const Event             = require('../models/event');
const Organization      = require('../models/organization');
const Review            = require('../models/review');

const dbName = 'server';
mongoose.connect(`mongodb://localhost/${dbName}`);

const usersArray = [

{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

},
{

    firstName:                  'Ahmed',
    lastName:                   '',
    zipCode:                    '',
    email:                      '',
    password:                   '',
    skills:                     '',
    preferredEventType:         '',
    profilePicture:             '',
    phoneNumber:                '',
    orgAdmin:                   '',
    events:                     ''

}

];

const orgsArray = [

    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    },
    {

        name:               '',
        address:            '',
        email:              '',
        phoneNumber:        '',
        description:        '',
        logo:               '',
        reviews:            [],
        staff:              [],
        events:             []

    }

];

Author.create(authors)
.then((response)=>{

  console.log(`created ${response.length} authors`);

//book .create method inside the .then for the author.create
    Book.create(books)
    .then((result)=>{
        console.log(`created ${result.length} books`);
        mongoose.disconnect();
    })
    .catch((err)=>{
        console.log(err)
    })

    //book.create ends here



})
.catch((err)=>{
  console.log('didnt work', err)
})