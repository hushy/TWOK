const readline = require('readline-sync')
const fs = require('fs');
const path = require('path');

// this is our monsters catalog
const monsters = {
    killer_princess:
        {hp: 20, atk: 2, name: "princess",
            perception:0.2,
            specials: [
                {
                    name:"shard_attack",
                    text:"I will pierce your body with a thousand shards !",
                    atk:6,
                    proba:0.1
                }
            ]
        },
    dragon:
        {hp: 200, atk: 20, name: "dragon",
            perception:0.01,
            specials: []
        },
    crocodile:
        {hp: 10, atk: 1, name: "croc",
            perception:0.1,
            specials: []
        }
}

// this is the player stats
let player = {
    hp: 20,
    def: 2,
    dodge: 0.2,
    atk: 3,
    crit: 0.05,
    multiplier: 2,
    stealth:0.3,
    name: "hero"
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (true) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

/** This section is for toolbox function reused everywhere **/
function separator() {
    write_and_wait("==============================NEXT TURN==============================",0,true)
}

function write_and_wait(text, sleep_time,line) {
    if (!sleep_time)
        sleep_time = 300
    cnt = 0
    if (line){
        console.log(text)
        sleep(sleep_time)
    }else{
        for(c in text){
            if(cnt >= 100){
                cnt = 0
                process.stdout.write('\n\r');
            }
            process.stdout.write(text[c]);
            sleep(30)
            cnt ++
            if (text[c] == '\n'){
                cnt = 0
            }
        }
        console.log()

    }
}

function game_over() {
    display_art("game_over")
    write_and_wait("game over");
}

// Function to display ASCII art
function display_art(name,time) {
    try {
        const asciiArt = fs.readFileSync('./art/' + name, 'utf8');
        let lines = asciiArt.split("\n")
        for (let i in lines){
            write_and_wait(lines[i],time || 75,true)
        }
    } catch (error) {
        console.error("Could not read ASCII art file:", error.message);
    }
}

function player_choice(question) {
    if (!question)
        question = "What do you want to do?"
    let r =  readline.question(question)
    if (isNaN(r)){
        return player_choice(question)
    }
    return r
}


function sneak(monster,next_room,defeat){
    write_and_wait("You try to sneak past the " + monster.name)
    if(Math.random() <= (player.stealth-monster.perception)){
        write_and_wait("You succeed.")
        next_room()
    }else{
        write_and_wait("It saw you and caught you by surprise !")
        fight(monster,next_room,defeat,true)
    }
}

function fight(monster, victory, defeat,surprise) {
    write_and_wait(player.name + " : " + player.hp)
    write_and_wait(monster.name + " : " + monster.hp)
    write_and_wait("1. Attack or 2. Defend")
    let r = 1;
    while (player.hp > 0 && monster.hp > 0) {
        var dammage = player.atk
        let base_atk = monster.atk
        r = Math.random()
        if (monster.specials && monster.specials.length > 0){
            let special_attack = monster.specials[0]
            if (r <= special_attack.proba){
                base_atk = special_attack.atk
                write_and_wait(monster.name + ":" + special_attack.text)
            }
        }

        var monster_dammage = base_atk

        if (surprise){
            dammage = 0
            write_and_wait("You are surprised by the "+ monster.name)
            surprise = false
        }else{
            var choice = player_choice("select:")
        }

        if (choice == "1") {
            if (Math.random() <= player.crit)
            {
                dammage = dammage * player.multiplier
                write_and_wait("Critical Hit !")
            }
        }

        if (choice == "2") {
            monster_dammage = monster_dammage / 2
            dammage = 0
        }
        //Dodge will reduce monster attack by monster.atk / 2
        if (Math.random() <= player.dodge){
            monster_dammage = monster_dammage - base_atk / 2
            write_and_wait("You dodged the attack !")
        }

        monster.hp = monster.hp - dammage
        player.hp = player.hp - monster_dammage
        write_and_wait("You take " + monster_dammage + " dammage and deal " + dammage)
        separator()
    }

    if (monster.hp <= 0) {
        return victory()
    } else {
        return defeat()
    }

}

/** This section is for events in the game **/
function dragon_lair() {
    display_art("Dragon")
    write_and_wait("You have entered th dragons lair it is still sleeping heavily. \n" +
        "1.Flee.\n" +
        "2.Fight \n" +
        "3.Sneak.")
    var choice = player_choice()
    switch (choice) {
        case '1':
            return castle_entrance()
        case '2':
            return fight(monsters.dragon, castle_entrance, game_over)
        case '3':
            return sneak(monsters.dragon, mystery_doors,game_over)
    }

}

function princess_death() {
    write_and_wait("well done")
    player.atk = player.atk + 1

}

function fake_princess_chamber() {
    display_art("princess")
    write_and_wait("You climb the tower and find your self nose to nose with a princess.\n There" +
        "is a door.\n" +
        "1. Kill her.\n" +
        "2. Get back down. \n" +
        "3. Talk to the princess.")
    var choice = player_choice()
    switch (choice) {
        case '1':
            display_art("princess_monster")
            write_and_wait("The princess' head turns into a spider and her arms cover with deadly shards of glass. ")
            return fight(monsters.killer_princess, princess_death, game_over)
        case '2':
            return castle_entrance()
        case '3':
            write_and_wait("The princess' head turns into a spider and her arms cover with deadly shards of glass. ")
            return fight(monsters.killer_princess, princess_death, game_over,true)

    }
}

function mystery_doors(){
    display_art("mystery_room")
    write_and_wait(`You see 3 doors in front of you, in the middle of the room is a book.
1. Open the book.
2. Open the left door. 
3. Open the right door. 
4. Open the middle door.
5. Go back ! 
`)
    while (true){
        let choice = player_choice()
        switch (choice){
            case '1':
                display_art("riddle1",500)
                return
            case '2':

                return
            case '3':
                return
            case '4':
                return
            case '5':
                write_and_wait("the door is locked, you cannot go back.")
        }
    }
}

function sewer_entrance() {
    display_art("croco")
    write_and_wait("You see an opening in the sewer grate guarded by a huge crocodile. \n" +
        "1. Fight.\n" +
        "2. Sneak. \n" +
        "3. Go back.")
    var choice = player_choice()
    switch (choice) {
        case '1':
            return fight(monsters.crocodile, mystery_doors, game_over)
        case '2':
            return sneak(monsters.crocodile,mystery_doors,game_over)
        case '3':
            return castle_entrance()
    }
}

function castle_entrance() {
    display_art("castle")
    write_and_wait("Mighty Hero " + player.name + " you arrive in front of a castle.\n" +
        "1. Use the front door.\n" +
        "2. Climb the wall to the tower window\n" +
        "3. Go swim in the moat.")

    var choice = player_choice("How will you start your journey ?")

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
player.name = readline.question("What is your name ? ")
castle_entrance()