// const square = (num) => {
//     return num * num;
// };



// console.log(square(3));

const event = {
    name: 'asdf',
    printGuestList : () => {
        console.log('guest list for ' + this.name)
    }
};

event.printGuestList()