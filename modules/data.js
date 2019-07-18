const badDnDChar = [
  {name:'Greasy-Beard-Jones', strength:'crying', weakness: 'beards'},
  {name:'WhistleBlowin-Steve', strength:'tattling', weakness:'air'},
  {name:'Stalking-Sally', strength:'tracking', weakness: 'name-calling'},
  {name:'Weeping-Wally', strength:'growing hair', weakness: 'feelings'},
  {name:'Narcissistic-Nancy', strength:'being right', weakness: 'mirrors'}
];

//METHOD ONE
const getAll = () =>{
  // show all array items
  return badDnDChar;
};

//METHOD TWO
//old way that works to get specific items in array, but not as efficient
// const get = (name) =>{
// show specific array items
//   for(let i=0; i < badDnDChar.length; i++){
//     if (badDnDChar,name === name){
//       return badDnDChar[i];
//     }
//   }
// };

//new way to access specific items in an array by using built in methods
const get = (name) =>{
  return badDnDChar.find((charName) => {
    return charName.name.toLowerCase() === name.toLowerCase();
  });
};

//METHOD THREE
const deleted = (name) =>{
        const deletechar = badDnDChar.find((charName) => {
          return charName.name.toLowerCase() === name.toLowerCase();
        });
        badDnDChar.splice(badDnDChar.indexOf(deletechar),1);
        return badDnDChar;
  };

module.exports = { getAll, get, deleted };
