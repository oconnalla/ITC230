//////////////////////////////////////////////////////////////////
//HOMEWORK 2 LET'S GET MODULAR VERSION//
//////////////////////////////////////////////////////////////////

// bringing in my file containing my methods
//const data = require('./modules/data');

//bringing in the file holding my array of objects, currently not being used
//const dNd = require('./modules/array'); currently not used

//allowing for http methods
//const http = require('http');

//require allowing of access to files
//const fs = require('fs');

//converting queries as strings
//const querystring = require('querystring');


//http.createServer((req,res) => {
// separate route from query string as an array of 2 items, turns typed in url path into lowercase
//let url = req.url.toLowerCase().split("?");
//the [0] is the first portion of the array AKA the path
//let path = url[0];
//the [1] is the second portion of the array
//let queryParams = querystring.parse(url[1]); currently not used



//switch(path) {
//case '/':
//fs.readFile('public/home.html', (err, data) => {
// if an error shows, console log the error
//if (err) return console.error(err);
//res.writeHead(200, {'Content-Type': 'text/html'});
//make the error data a readable string
//res.end(data.toString());
//});
//break;
//case '/about':
//used as an example to show text content when a specific path is put into the url
//res.writeHead(200, {'Content-Type': 'text/plain'});
//res.end('About Page');
//break;

//case '/getall':
//let revealChar = data.getAll();
//res.writeHead(200, {'Content-Type': 'text/plain'});
//res.end('List of all characters: ' + JSON.stringify(revealChar));
//break;
//case '/detail':
//if(1 === 0){
//res.writeHead(200,{'Content-Type': 'text/html'});
//res.end('item not found');
//}else{
// var query splits the url array item[1] of "name = the searched for name" at the "=" mark into into an array and gets back the second position which is the the searched for name
//let query = url[1].split('=');
//res.writeHead(200, {'Content-Type': 'text/plain'});
//res.end('specific character: ' + JSON.stringify(data.get(query[1])));
//}
//break;
//case '/deleted':
//let query = url[1].split('=');
//res.writeHead(200, {'Content-Type': 'text/plain'});
//res.end('List of remaining character(s): ' +  JSON.stringify(data.deleted(query[1])));
//break;

//default:
//res.writeHead(404, {'Content-Type': 'text/plain'});
//res.end('Not found');
//break;
//}
//}).listen(process.env.PORT || 3000);









//////////////////////////////////////////////////////////////////
//HOMEWORK 3 EXPRESS YOURSELF VERSION//
//////////////////////////////////////////////////////////////////

'use strict';
// bringing in my file containing my methods
const data = require('./modules/data');
//bringing in express to app
const express = require('express');
//assigning express method to app variable
const app = express();
//To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
const bodyParser = require('body-parser');
app.set('port', process.env.PORT || 3000);
// set location for static files
//__dirname tells the path (for ex:docs\ITC230)
app.use(express.static(__dirname + '/public'));
// parse form submissions
app.use(bodyParser.urlencoded({extended: true}));
// set Access-Control-Allow-Origin header for api route
app.use('/api', require('cors')());
//lets this file access handlebars
const handlebars =  require('express-handlebars');
//tells express what template to use and the file extension
app.engine('.html', handlebars({extname: '.html', defaultLayout: false}));
app.set('view engine', '.html');


// allows page to be changed on the servers before being sent to the client
//home page, render marries layout with dynamic information
//looks for layout files in views folder
app.get('/', (req, res) => {
  res.render('home',{badDnDChar: data.getAll()});
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
//functions below were in class practice
// handle form submission
//  app.post('/detail', (req, res) => {
//   res.render('detail', {name:req.body.dndChar});
//  });
// send content of 'home' view
// app.get('/get', (req,res) => {
//   let searchResult = data.get(req.query.name);
//   res.render('detail', {name: req.query.name, result: searchResult });
//  });

// Handle functions for get method
app.get('/delete', (req,res) => {
  // delete dndChar object
  let result = data.deleted(req.query.name);
  let total = data.getAll().length;
  res.render('delete', {name: req.query.name, result: result, total: total});
});

app.get('/detail', (req,res) => {
  let findChar = data.get(req.query.name);
  res.render('details', {
    name: req.query.name,
    result: findChar
  }
  );
});

// handle POST method
app.post('/detail', (req,res) => {
  let findChar = data.get(req.body.name);
  res.render('detail', {name: req.body.name, result: findChar, badDnDChar: data.getAll()});
});




////////////////////////////////////////////////////////////////////////API SECTION//
//////////////////////////////////////////////////////////////////////
// app.get('/api:char'),(req, res, next) =>{
//   data.find((err, item) => {
//     if(err || !item) return next(err);
//     res.JSON(item);
//   });
// };


app.get('/api/char', (req,res) => {
  // return all items in badDndChar array
  var char = data.getAll();
  if (char) {
    // turn it into JSON 
    res.json(char);
    //else return an error
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
});


app.get('/api/:name', (req,res) => {
  let char = data.get(req.params.name)
  if (char) {
    // turn it into JSON 
    res.json(char);
    //else return an error
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
});

app.get('/api/delete/:name', (req,res) => {
  let char = data.deleted(req.params.name);
  console.log(char);
  let total = data.getAll().length;
  if (char) {
    // turn it into JSON 
    res.json('Your request to remove ' + req.params.name + ' was successful. Remaining characters: ' + total);
    //else return an error
  } else {
    return res.status(500).send('Error occurred: database error. Cannont delete character');
  }
});

app.put('/api/add/:name:strenth:weakness', (req,res) => {
  let char = data.added(req.params);
  console.log(char);
  let total = data.getAll().length;
  if (char) {
    // turn it into JSON 
    res.json('Your request to add ' + req.params.name + ' was successful. Remaining characters: ' + total);
    //else return an error
  } else {
    return res.status(500).send('Error occurred: database error. Cannont delete character');
  }
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
