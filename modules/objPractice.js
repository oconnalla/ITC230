const badDnDChar = [
  {name:'Greasy Beard Jones', strength:'crying', weakness: 'beards'},
  {name:'whistleBlowin\' Steve', strength:'tattling', weakness:'air'},
  {name:'Stalking Sally', strength:'tracking', weakness: 'name-calling'},
  {name:'Weeping Wally', strength:'growing hair', weakness: 'feelings'},
  {name:'Narcissistic Nancy ', strength:'being right', weakness: 'mirrors'}
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
    return charName.name === name;
  });
};

//METHOD THREE
// const deleted = (name) =>{
//   return badDnDChar.splice((character) =>{
//     return character.name === name;
//   });
// };
const deleted = (name) =>{
  badDnDChar.find((charName) => {
    if(charName.name === name){
      return charName.name === name;
    }
    return badDnDChar.splice(name);
  });
};

module.exports = { getAll, get, deleted };

//used to test that method 2 works
//console.log(get('Weeping Wally'));

//used to test that method 3 works
console.log(deleted('Weeping Wally'));
console.log(get());
