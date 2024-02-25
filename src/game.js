const readline = require('readline-sync')
const fs = require('fs');
const path = require('path');


// Function to display ASCII art
function display_art(name) {
  try {
    const asciiArt = fs.readFileSync('./art/'+name, 'utf8');
    console.log(asciiArt);
  } catch (error) {
    console.error("Could not read ASCII art file:", error.message);
  }
}



var name = readline.question(" what is your name ? ")
console.log("Welcome to the Adventure Game "+name);
display_art("castle")
console.log("You arrive in front of a castle what do you do ?\n" +
    "1. Use the front door.\n" +
    "2. Climb the wall to the tower window\n" +
    "3. Go swim in the moar." )

var choice = readline.question("?")

if (choice == "1") {
  display_art("Dragon")
  console.log("You have entered th dragons lair and awoken him. \n" +
      "1. Flee.\n" +
      "2.Fight \n" +
      "3.Hide ." )
}

if (choice == "2") {
  display_art("princess")
  console.log("You climb the tower and find your self nose to nose with a princess.\n There" +
      "is a door.\n" +
      "1. kill her.\n" +
      "2.get back down. \n" +
      "3.take the pricess down ." )
}

if (choice == "3") {
  display_art("croco")
  console.log("You see an opening in the sewer grate guarded by a huge crocodile \n." +

      "1.fight .\n" +
      "2.sneek. \n" +
      "3.go back." )
}
var gl=0

// GAME LOOP
while (true) {
//.log("gameloop"+gl)
//gl=gl+1
}
// end of GAME LOOP