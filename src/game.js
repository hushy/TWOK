const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const main = () => {
    console.log("Welcome to the Adventure Game!");
    readline.question("Do you go left or right? ", answer => {
      answer = answer.trim()
      if (answer === "left") {
        console.log("You've encountered a friendly dragon!");
      } else if (answer === "right") {
        console.log("You've stumbled into a trap!");
      } else {
        console.log("Invalid choice. Game over.");
      }
      readline.close();
    });
  };
  
  console.log("test!");

  main();
  