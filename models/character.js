const mongoose = require('mongoose');
const credential = require('./credential');

mongoose.connect(credential.connectionString, { dbName: 'ITC230', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define character model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 character: { type: String, required: true },
 name:String,
 strength: String,
 weakness: String,
}, {
    collection:'badDnDChar'
}); 

module.exports = mongoose.model('Data', mySchema);
