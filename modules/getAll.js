const char = require('./array');

// const getAll = () =>{
// show all array items
// res.writeHead(200, {'Content-type': 'text/plain'})
// for (let i = 0; i <badDnDChar.length; i++) {
//     res.end(`${badDnDChar[i].name}`);
//     res.end(`${badDnDChar[i].strength}`);
//     res.end(`${badDnDChar[i].weakness}`);
// }
// };
const getAll = () =>{
  // show all array items
  return char.badDnDChar;

};

module.exports = getAll;
