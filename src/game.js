const readline = require('readline-sync')
const fs = require('fs');
const path = require('path');

// this is our monsters catalog
const monsters = {
  killer_princess:
      {hp:20,atk:2},
  dragon:
      {hp:200,atk:20},
  crocodile:
      {hp:10,atk:1}
}

// this is the player stats
var player = {
  hp:20,
  atk:3
}

/** This section is for toolbox function reused everywhere **/
function game_over() {
  display_art("game_over")
  console.log("game over");
}
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
function fight(monster, victory, defeat){
  while (player.hp > 0 && monster.hp > 0){
    console.log("hp hero : " + player.hp)
    console.log("monster hp : " + monster.hp)

    console.log("1. ATTACK 2. DEFEND")
    var choice=   player_choice()
    var atk = player.atk
    var monster_atk = monster.atk
    if (choice == "1") {

    }
    if (choice == "2") {
      monster_atk = monster_atk/2
      atk = 0
    }
    monster.hp=monster.hp-atk
    player.hp=player.hp-monster_atk
  }

  if (monster.hp<=0){
    return victory()
  }else{
    return defeat()
  }

}
/** This section is for events in the game **/
function dragon_lair(){
  display_art("Dragon")
  console.log("You have entered th dragons lair and awoken him. \n" +
      "1.Flee.\n" +
      "2.Fight \n" +
      "3.Hide ." )
      var choice = player_choice()
  switch (choice ) {
    case '1':
      return castle_entrance()
    case '2':
      return fight(monsters.dragon,castle_entrance,game_over)
    case '3':
      return
  }

}

function princess_death(){
console.log("well done")
 player.atk = player.atk + 1

}
function fake_princess_chamber(){
  display_art("princess")
  console.log("You climb the tower and find your self nose to nose with a princess.\n There" +
      "is a door.\n" +
      "1. Kill her.\n" +
      "2. Get back down. \n" +
      "3. Take the pricess down ." )
      var choice = player_choice()
  switch (choice ) {
    case '1':
      return fight(monsters.killer_princess,princess_death,game_over)
    case '2':
      return castle_entrance()
    case '3':
      return

  }
}

function sewer_entrance(){
  display_art("croco")
    console.log("You see an opening in the sewer grate guarded by a huge crocodile \n." +
        "1. Fight .\n" +
        "2. Sneek. \n" +
        "3. Go back." )
        var choice = player_choice()
  switch (choice ) {
    case '1':
      return fight(monsters.crocodile,castle_entrance,game_over)
    case '2':
      return
    case '3':
      return castle_entrance()
  }
}

function castle_entrance() {
  display_art("castle")
  console.log("You arrive in front of a castle.\n" +
      "1. Use the front door.\n" +
      "2. Climb the wall to the tower window\n" +
      "3. Go swim in the moar." )
  
      var choice = player_choice()
  
  switch (choice) {
    case '1':
      return dragon_lair()
    case '2':
      return fake_princess_chamber()
    case '3':
      return sewer_entrance()
  }

}

/** This is the start of the game and the first event castle_entrance **/
var name = readline.question(" what is your name ? ")
console.log("Welcome to the Adventure Game "+name);

castle_entrance()