const readline = require('readline-sync')
const fs = require('fs');
const path = require('path');

console.log("Welcome to the Adventure Game!");

// Function to display ASCII art
function display_art(name) {
  try {
    const asciiArt = fs.readFileSync('./art/'+name, 'utf8');
    console.log(asciiArt);
  } catch (error) {
    console.error("Could not read ASCII art file:", error.message);
  }
}

// GAME LOOP
while (true) {

  var yn = readline.question(" ? ");
  if(yn === 'REPONSE') {
    console.log("Hooray!");
    display_art('castle')
  } 


}