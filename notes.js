//OVERVIEW: This is a script that manages reading and writing to the notes.json file
//which stores the notes that the user inputs.

//---- core node modules ----//
const fs = require('fs');

//---- npm packages ----//
const chalk = require('chalk');

//---- chalk styles ----//
const chalkErrorFG = chalk.bgRed;
const chalkSuccessFG = chalk.bgGreen;
const chalkNoteBG = chalk.bgBlue;
const chalkTitleFG = chalk.keyword('orange');
const chalkBodyFG = chalk.keyword('yellow');

//returns an Array of Objects 
const loadNotes = (params) => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer.toString());
    } 
    catch (errorFG) {
        return [];
    }
};

//returns note within the loadNotes() Array given title of note
const getNote = (title) => {
    const notes = loadNotes();
    let note;
    notes.forEach((element) => {
        if (element.title === title) {
            note = element;
        }
    });
    return note;
};

//creates a note Object to be saved to the file notes.json
function addNote(title, body) {
    const notes = loadNotes();
    //returns an array of notes that have the same title as the parameter title 
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('note saved');
    } 
    else {
        console.log('note is already saved');
    }
}

//removes a note from the notes.json array
function removeNote(title) {
    const notes = loadNotes();
    const keepNotes = notes.filter((note) => {
        return note.title !== title;
    });
    if (notes.length > keepNotes.length) {
        console.log(chalkSuccessFG(`note with the title : "${title}" removed`));
        saveNotes(keepNotes);
    } 
    else {
        console.log(chalkErrorFG(`no note with the title : "${title}"`));
    }
};

const listNotes = (params) => {
    const notes = loadNotes();
    notes.forEach((element) => {
        console.log(chalkNoteBG(`\n---- ${chalkTitleFG(element.title)} : ${chalkBodyFG(element.body)} ----`));
    });
};

//saves notes to notes.json
function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//---- Exported Functions ----//
module.exports = {
    getNote : getNote,
    addNote : addNote,
    removeNote : removeNote,
    loadNotes : loadNotes,
    listNotes : listNotes
}

