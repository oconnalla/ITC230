
const data = require('./character');

data.countDocuments((err, result) => {
    console.log(result);
});

//find all the documents
data.find({}, (err, result) =>{
    //output error if one occured
    if(err){
        console.log(err);
        //otherwise output the array of documents
    }else{
        console.log(result)
    }
});