const expect = require('chai').expect;
const data = require('../modules/data');
//var assert = require('chai').assert

//*************************GETALL TEST**************************************************

// describe('DndChar GETALL module', () => {
//     it('Should GETALL dnd characters', () => {
//       const result = data.getAll();
//       console.log(result);
//       expect(result).to.be.an('array').to.have.lengthOf(5);
    //   ({name:'Greasy-Beard-Jones', strength:'crying', weakness: 'beards'},
    //   {name:'WhistleBlowin-Steve', strength:'tattling', weakness:'air'},
    //   {name:'Stalking-Sally', strength:'tracking', weakness: 'name-calling'},
    //   {name:'Weeping-Wally', strength:'growing hair', weakness: 'feelings'},
    //   {name:'Narcissistic-Nancy', strength:'being right', weakness: 'mirrors'});
//     });
// });
    
//     it('should fail with a requested DnDChar', () => {
//       const result = data.getAll("Crying-Wally");
//       expect(result).to.be.undefined;
// });

//*************************GET TEST**************************************************

describe('DndChar GET module', () => {
    it('should return requested DnDChar', () => {
        const result = data.get('Weeping-Wally');
        expect(result).to.deep.equal({name: 'Weeping-Wally', strength:'growing hair', weakness: 'feelings'});
    });
    
    it('Should fail to GET a fake character', () => {
        const result = data.get("Crying-Wally");
        expect(result).to.be.undefined;
    });
});

   //************************ADD TEST**************************************************

describe('DndChar ADD module', () => {
    it('should ADD requested DnDChar', () => {
        const result = data.added('Whining-Will', 'sniffles', 'intelligence');
        expect(result[5]).to.deep.include({name: 'Whining-Will'});
    });
    
    it('Should fail to ADD an incomplete fake character', () => {
        const result = data.added('Crying-Wally');
        expect(result).to.be.an('array').that.does.not.include('Crying-Wally');
    });
});

//*************************DELETE TEST**************************************************

describe('DndChar DELETE module', () => {
    it('should DELETE requested DnDChar', () => {
        const result = data.deleted("Weeping-Wally");
        expect(result).to.be.an('array').that.does.not.include('Weeping-Wally');
    });
    
    it('Should fail to DELETE a fake character', () => {
        const result = data.deleted('Crying-Wally');
        expect(result).to.be.an('array').that.does.not.include({name:'Crying-Wally'});
        expect(result).to.be.an('array').that.does.include(result[5]={name:'Whining-Will'});
    });
});



 