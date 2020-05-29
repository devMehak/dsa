const router  = require('express').Router();
let Contact = require('../models/contact.model');
let Phone = require('../models/phone.model');

//to get all the Contacts
router.route('/').get((req, res) => {
    Contact.find()
     .then(contacts => res.json(contacts))
     .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email == undefined? null: req.body.email;
    const dob = req.body.dob == undefined ? null : Date.parse(req.body.dob);
    
    const newContact = new Contact({
        username, phone, email, dob
    });
    
    newContact.save()
        .then(()=> res.json('Contact Added'))
        .catch(err => res.status(400).json('Error' + err));
     
});

router.route('/:id').delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
      .then(() => res.json('Contact Deleted'))
      .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) => {
    Contact.findById(req.params.id)
     .then((contact) => res.json(contact))
     .catch(err => res.status(400).json('Error' + err));
})

router.route('/update/:id').post((req, res) => {
    Contact.findById(req.params.id)
      .then((contact) => {
         contact.username = req.body.username;
         contact.phone = req.body.phone;
         contact.email = req.body.email == undefined? null: req.body.email;
         contact.dob = req.body.dob == undefined ? null : Date.parse(req.body.dob);

         contact.save()
          .then(() => res.json('contact updated'))
          .catch(err => res.status(400).json("error " + err));
      })
      .catch(err => res.status(400).json("error " + err));
});

module.exports = router;