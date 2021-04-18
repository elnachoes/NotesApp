//OVERVIEW: This is a commandline app I wrote  while taking a udemy course 
//to learn npm package management and json manipulation

//NOTE: See udemy course for instructions on this app 
//@: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13728884#overview

//---- npm packages ----//
const validator = require('validator'); //for validating stuff
const chalk = require('chalk');         //for customizing text fonts and colors
const yargs = require('yargs');         //for dealing argv commands and parameters

//---- notes managing script ----//
const notes = require('./notes.js');

//---- chalk styles ----//
//FG is foreground color and BG is background color
const chalkTitleFG = chalk.keyword('orange');
const chalkBodyFG = chalk.keyword('yellow');
const chalkCommandFG = chalk.keyword("red");
const chalkNoteBG = chalk.bgBlue;
const chalkCommandBG = chalk.bgGreen;
const chalkErrorBG = chalk.bgRed;


//---- yargs command builders  ----//

//command builder (unique to yargs)
//used for parsing the argv arguments (see below: yargs commands)

//this command builder only requires a title arg
const builderTitle = {      
    title: {                        //command argument name
        describe: 'Note Title',     //command argument description 
        demandOption: true,         //command argument true if manditory argument else optional argument
        type: 'string'              //command argument value type
    },
};

//this command builder requires a title arg and a body arg
const builderTitleBody = {
    //I reused the builderTitle command builder inside the builderTitleBody command builder
    builderTitle,
    body: {
        describe: 'Note Body',
        demandOption: true,
        type: 'string'
    }
};

//---- yargs commands ----//

//NOTE: to use this command you have to type this in WHEN you launch the program like ' node main.js addNote --title="asdf" --body="asdf" '
//IMPORTANT: (argv) is the parameters input when launching the app : ' --title="asdf" --body="asdf" ' 

//addNote command adds a note given title and body
yargs.command({
    command: 'addNote',             //command name
    describe: 'add a new note',     //command description
    builder: builderTitleBody,      //command builder object for parsing argv parameters (see above: yargs builder objects)
    handler: (argv) => {            //function used
        console.log(chalkCommandBG(chalkCommandFG('command : addNote')));
        notes.addNote(argv.title, argv.body);
    }
});

//removeNote command removes a note given the title
yargs.command({
    command: 'removeNote',
    describe: 'removes a note',
    builder: builderTitle,
    handler: (argv) => {
        console.log(chalkCommandBG(chalkCommandFG('command : removeNote')));
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
            console.log(chalkCommandBG(chalkCommandFG('command : readNote')));
            const note = notes.getNote(argv.title);
            console.log(chalkNoteBG(`\n---- ${chalkTitleFG(note.title)} : ${chalkBodyFG(note.body)} ----`));
        } 
        catch (error) {
            console.log(chalkErrorBG(`\nno note with the title "${argv.title}"`));
        }
    }
});

//listNotes command prints all notes stored within the notes.json file
yargs.command({
    command: 'listNotes',
    describe: 'lists notes',
    handler: (params) => {
        console.log(chalkCommandBG(chalkCommandFG('command : listNotes')));
        notes.listNotes();
    }
});

//---- main function ----//
function main() {
    //IMPORTANT: you have to call the method yargs.parse() in order for it to parse argv args
    yargs.parse()
};

//calling main func
main();