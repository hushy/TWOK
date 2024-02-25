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

function player_choice(){
  return readline.question("What do you want to do?")
}

function dragon_lair(){
  display_art("Dragon")
  console.log("You have entered th dragons lair and awoken him. \n" +
      "1. Flee.\n" +
      "2.Fight \n" +
      "3.Hide ." )
      var choice = player_choice()

}

function fake_princess_chamber(){
  display_art("princess")
  console.log("You climb the tower and find your self nose to nose with a princess.\n There" +
      "is a door.\n" +
      "1. kill her.\n" +
      "2. get back down. \n" +
      "3. take the pricess down ." )
      var choice = player_choice()

}

function sewer_entrance(){
  display_art("croco")
    console.log("You see an opening in the sewer grate guarded by a huge crocodile \n." +
        "1. fight .\n" +
        "2. sneek. \n" +
        "3. go back." )
        var choice = player_choice()

}

function castle_entrance() {
  display_art("castle")
  console.log("You arrive in front of a castle what do you do ?\n" +
      "1. Use the front door.\n" +
      "2. Climb the wall to the tower window\n" +
      "3. Go swim in the moar." )
  
      var choice = player_choice()
  
  switch (choice ) {
    case '1':
      return dragon_lair()
    case '2':
      return fake_princess_chamber()
    case '3':
      return sewer_entrance()
  }

}

var name = readline.question(" what is your name ? ")
console.log("Welcome to the Adventure Game "+name);

castle_entrance()