const fs = require('fs');

//JavaScript Object
const book = {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    isJSON: false,
    isObject: true,
    number: 451
};

function readJSON(params) {
    //IMPORTANT: returns binary data when you use fs.readFileSync
    let dataBuffer = fs.readFileSync('json.json');
    console.log(dataBuffer.toString());

}

function writeJSON(params) {
    //JSON method to cast a JS Object to a JSON String
    let bookJSON = JSON.stringify(book);
    fs.writeFileSync('json.json', bookJSON);
    console.log('saved to JSON: ' + bookJSON);
}

function appendJSON(params) {
    // let newJSON
    let newThing = {
        a: 'farts',
        b: 'ass',
        c: 'cunt',
        d: true,
        e: 2.1,
        f: 1,
        g: false
    };
    let newJSON = Object.assign({}, newThing, book);
    fs.writeFileSync('json.json', JSON.stringify(newJSON));
}

//challenge problem
//1: Load and parse JSON data (andrew.json)
//2: change the name and age property using your info
//3: stringify the changed object and overwrite the original JSON data
//4: test your work by viewing the data in the JSON file

//challenge answer
function toCorbinJSON(params) {
    const dataBuffer = fs.readFileSync('andrew.json');
    let corbin = JSON.parse(dataBuffer.toString());
    corbin.name = 'Corbin';
    corbin.planet = 'Mars';
    corbin.age = 18;
    fs.writeFileSync('andrew.json', JSON.stringify(corbin));
}


function main(params) {
    // writeJSON();
    // appendJSON();
    // readJSON();
    toCorbinJSON();
}

main();