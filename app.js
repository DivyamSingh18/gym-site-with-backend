const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


// momngoose schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS 
app.use('/static', express.static('static'));
app.use(express.urlencoded());
    
// PUG
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/' , (req , res ) =>{
    res.status(200).render('home.pug');
})
app.get('/contact' , (req , res ) =>{
    res.status(200).render('contact.pug');
})
app.post('/contact' , (req , res ) =>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved into the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
})

// SERVER
app.listen(port, () =>{
    console.log(`This app is started successfully at port ${port}`);
})