const char = require('./array');

//const deleted = (name) => {
  // remove item from array
//   badDnDChar.filter;
// };
const deleted = (name) =>{
  badDnDChar.find((charName) => {
    if(charName.name === name){
      return charName.name === name;
    }
    return badDnDChar.splice(name);
  });
};

module.exports = deleted;

