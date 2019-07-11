// bringing in my file containing my methods
const data = require('./modules/data');
//bringing in the file holding my array of objects
//const dNd = require('./modules/array');
//allowing for http methods
const http = require('http');
//require allowing of access to files
const fs = require('fs');
//converting queries as strings
const querystring = require('querystring');


http.createServer((req,res) => {
  // separate route from query string as an array of 2 items, turns typed in url path into lowercase 
  let url = req.url.toLowerCase().split("?"); 
  //the [0] is the first portion of the array AKA the path 
  let path = url[0];
  //the [1] is the second portion of the array
  //let queryParams = querystring.parse(url[1]);
  //console.log( 'queryParams' + queryParams);


  switch(path) {
  case '/':
    fs.readFile('public/home.html', (err, data) => {
      // if an error shows, console log the error
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      //make the error data a readable string
      res.end(data.toString());
    });
    break;
  case '/about':
    //used as an example to show text content when a specific path is put into the url
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page');
    break;

  case '/getall':
    let revealChar = data.getAll();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('List of all characters: ' + JSON.stringify(revealChar));
    break;
  case '/detail':
    //let query = url.split('=');
    //console.log('this is data.name ' + data.name);
    //console.log('this is queryParams ' + queryParams);
    // if(queryParams.contains(data.name)){
    if(1 === 0){
      res.writeHead(200,{'Content-Type': 'text/html'});
      res.end('item not found');
    }else{
      // var query splits the url array item[1] of "name = the searched for name" at the "=" mark into into an array and gets back the second position which is the the searched for name
      let query = url[1].split('=');
      // console.log('query: ' + query[1]);
      //let revealSpecificChar = data.get();
      // let query = url.split('='); 
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('specific character: ' + JSON.stringify(data.get(query[1])));
    }
    break;
  case '/deleted':
    let query = url[1].split('=');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('query: ' + query[1]);
    //data.deleted(query[1]);
    res.end('List of remaining character(s): ' +  JSON.stringify(data.deleted(query[1])));
    break;

  default:
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
    break;
  }
}).listen(process.env.PORT || 3000);
