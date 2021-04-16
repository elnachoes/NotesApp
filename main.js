//OVERVIEW: this is a learning app I wrote to learn Node.js
//NOTE: see udemy course for instructions on this app 
//@: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13728884#overview

//npm packages
const validator = require('validator'); //for validating stuff
const chalk = require('chalk');         //for customizing text fonts and colors
const yargs = require('yargs');         //for dealing argv commands and parameters

//other scripts
const notes = require('./notes.js');

//---- chalk styles ----//
const chalkTitle = chalk.keyword('red');
const chalkBody = chalk.keyword('yellow');
const chalkNoteBG = chalk.bgBlue;
const chalkCommandBG = chalk.bgGreen;
const chalkErrorBG = chalk.bgRed;


//---- yargs builder objects ----//

//used for parsing the argv arguments (see below: yargs commands)
const builderTitle = {      //command builder (unique to yargs)
    title: {
        describe: 'Note Title',
        demandOption: true,
        type: 'string'
    },
};

const builderTitleBody = {
    builderTitle,
    body: {
        describe: 'Note Body',
        demandOption: true,
        type: 'string'
    }
};

//---- yargs commands ----//

//addNote command adds a note given title and body
//NOTE: to use this command you have to type this in WHEN you launch the program like ' node main.js addNote --title="asdf" --body="asdf" '
//IMPORTANT: (argv) is the parameters input when launching the app : ' --title="asdf" --body="asdf" ' 
yargs.command({
    command: 'addNote',             //command name
    describe: 'add a new note',     //command description
    builder: builderTitleBody,      //command builder object for parsing argv parameters (see above: yargs builder objects)
    handler: (argv) => {            //function used
        console.log(chalkCommandBG('command : addNote'));
        notes.addNote(argv.title, argv.body);
    }
});

//removeNote command removes a note given the title
yargs.command({
    command: 'removeNote',
    describe: 'removes a note',
    builder: builderTitle,
    handler: (argv) => {
        console.log(chalkCommandBG('command : removeNote'));
        notes.removeNote(argv.title);
    }
});

//readNote command prints a specific note given the title
yargs.command({
    command: 'readNote',
    describe: 'reads a specific note given title',
    builder: builderTitle,
    handler: (argv) => {
        try {
            console.log(chalkCommandBG('command : readNote'));
            const note = notes.getNote(argv.title);
            console.log(chalkNoteBG(`\n---- ${chalkTitle(note.title)} : ${chalkBody(note.body)} ----`));
        } catch (error) {
            console.log(chalkErrorBG(`\nno note with the title "${argv.title}"`));
        }
    }
});

//listNotes command prints all notes stored within the notes.json file
yargs.command({
    command: 'listNotes',
    describe: 'lists notes',
    handler: (params) => {
        console.log(chalkCommandBG('command : listNotes'));
        const notesList = notes.loadNotes();
        notesList.forEach((element) => {
            console.log(chalkNoteBG(`\n---- ${chalkTitle(element.title)} : ${chalkBody(element.body)} ----`));
        });
    }
});

//---- main function ----//
function main() {
    //IMPORTANT: you have to call the method yargs.parse() in order for it to parse argv args
    yargs.parse()
};

//calling main func
main();