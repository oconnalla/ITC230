// const http = require("http");
// http.createServer((req,res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Aloha world');
// }).listen(process.env.PORT || 3000);

// const http = require('http');
// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   switch(path) {
//   case '/':
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Home page');
//     break;
//   case '/about':
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('About page');
//     break;
//   default:
//     res.writeHead(404, {'Content-Type': 'text/plain'});
//     res.end('Not found');
//     break;
//   }
// }).listen(process.env.PORT || 3000);

const http = require('http');
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
  case '/':
    const fs = require('fs');
    console.log('step1');
    fs.readFile('public/home.html', (err, data) => {
      console.log('step2');
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data.toString());
      console.log('step3');
    });
    break;
  case '/about':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page');
    break;
  default:
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
    break;
  }
}).listen(process.env.PORT || 3000);
