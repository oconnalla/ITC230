//////////////////////////////////////////////////////////////////
//HOMEWORK APIS//
//////////////////////////////////////////////////////////////////

'use strict';
const express = require('express');
//To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
const bodyParser = require('body-parser');
const Data = require('./models/character');
const data = require('./modules/data');

//assigning express method to app variable
const app = express();

//CONFIGURE EXPRESSS
app.set('port', process.env.PORT || 3000);
// set location for static files
//__dirname tells the path (for ex:docs\ITC230)
app.use(express.static(__dirname + '/public'));
// parse form submissions
app.use(bodyParser.urlencoded({extended: true}));
//server application will need this command to recognize JSON requests
app.use(bodyParser.json());
// set Access-Control-Allow-Origin header for api route
app.use('/api', require('cors')());
app.use((err, req, res, next) => {
  console.log(err);
});


//lets this file access handlebars
const handlebars =  require('express-handlebars');
//tells express what template to use and the file extension
app.engine('.html', handlebars({extname: '.html', defaultLayout: false}));
app.set('view engine', '.html');


//ROUTES
//old method: // res.render('home',{badDnDChar: data.getAll()});

app.get('/', (req, res) => {
  Data.find((err,name) => {
      if (err) return next(err); 
      res.render('home', {badDnDChar:JSON.stringify(name)});
    });
});



// sends a plain text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page');
});

// redirects to my linkedIn (if signed in to linkedIn)
app.get('/meetthedev', (req, res) =>
  res.redirect('https://www.linkedin.com/in/arieloconnall/')
);

// immediately stops running
app.get('/stop', (req, res) =>
  res.end()
);

// Handle functions for methods
app.get('/delete', (req,res) => {
  res.render('delete');
});

app.get('/detail', (req,res) => {
  let findChar = data.get(req.query.name);
  res.render('details', {
    name: req.query.name,
    result: findChar
  }
  );
});

//add route
app.get('/add', (req,res) => {
  // delete dndChar object
  res.render('add');
});


// handle POST method
app.post('/detail', (req,res) => {
  let findChar = data.get(req.body.name);
  res.render('detail', {name: req.body.name, result: findChar, badDnDChar: data.getAll()});
});


////////////////////////////////////////////////////////////////////////
//API SECTION//
//////////////////////////////////////////////////////////////////////

//THE GETALL METHOD
app.get('/api/char', (req,res, next) => {
  Data.find((err,results) => {
      if (err || !results) return next(err);
      res.json(results);
  });
});

//DELETE METHOD
app.get('/api/char/deleted:id', (req,res,next) => {
  Data.remove({'_id':req.params.id}, (err, result) => {
      if (err) return next(err);
        res.json({'deleted':result.deletedCount});
  });
});

//THE GET METHOD
app.get('/api/char/:name', (req, res, next) => {
  let name=req.params.name;
  Data.find({'name':name}, (err,result) => {
    if (err || !result) return next(err);
      res.json(result);    
  });
});

//Asked George
//ADD METHOD
app.post('/api/char/add/', (req,res, next) => {
  console.log(req.body);
  Data.updateOne({'_id':req.body._id}, req.body, {upsert:true}, (err, result) =>{
    console.log(err);
    console.log(result);
  if (err) return next(err);
  // res.json({ name:req.body.name + ' was added to database.'});
  res.json( {'add':result.upserted});
  });
});


// define 404 handler in case route doesn't work
app.use( (req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
  console.log('Express started at '+ __dirname);
});