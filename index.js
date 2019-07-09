const getAllChar = require('./modules/getAll');
const dNd = require('./modules/array');
const http = require('http');
// const querystring = require('querystring');


http.createServer((req,res) => {
  const path = req.url.toLowerCase();

  switch(path) {
  case '/':
    const fs = require('fs');
    fs.readFile('public/home.html', (err, data) => {

      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data.toString());
    });
    break;
  case '/about':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page');
    break;

  case '/getall':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('List of all characters: ' + JSON.stringify(getAllChar));
    break;
    // if (err)
    //   res.writeHead(404, {'Content-Type': 'text/html'});
    // return res.end("404 Not Found");

    // let show= []
    // res.writeHead(200, {'Content-type': 'text/plain'})
    // for (let i = 0; i <dNd.length; i++) {
    //  show.push(`${dNd[i].key}`);
    // }
    //res.end(`${show}`);

  case '/get':
    // let url = req.url.split("?");
    // let path = url[0].toLowerCase();
    // let queryParams = querystring.parse(url[1]);
    break;
  case '/deleted':
    // let url = req.url.split("?");
    // let path = url[0].toLowerCase();
    // let queryParams = querystring.parse(url[1]);
    break;

  default:
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
    break;
  }
}).listen(process.env.PORT || 3000);
