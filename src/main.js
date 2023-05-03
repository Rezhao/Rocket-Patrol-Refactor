/*
    AUTHOR: Rebecca Zhao
    MOD TITLE: Beach Vibes
    APPROXIMATE TIME: 20+ hours
    IMPLEMENTED MODS: 
        1. Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
            --> Created watermelon enemy that is smaller, moves faster, and worth more points

        2. Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
            --> adds two seconds to the clock for successful hits and 4 seconds if you hit the watermelon

        3. Implement mouse control for player movement and mouse click to fire (15)
            --> player has ability to choose if they want to use arrows or mouse to move and fire the rocket
            --> if mouse is chosen, the rocket will follow the x direction of the mouse and fire when they click

        4. Display the time remaining (in seconds) on the screen (10)
            --> the amount of time remaining is displayed on the top of the screen/on the white border

        5. Create a new title screen (e.g., new artwork, typography, layout) (10)
            --> reformatted title screen by changing title/text, text stylizations, background, adding shapes, layout

        6. Track a high score that persists across scenes and display it in the UI (5)
            --> high score is displayed on the top right corner of the game screen

        7. Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
            --> added background music that plays once the player starts the actual game (play scene)

        8. Create a new scrolling tile sprite for the background (5)
            --> added new scrolling beach background during game play

        9. Implement the 'FIRE' UI text from the original game (5)
            --> displays 'FIRE' whenever the player fires and ends once the rocket resets 

        10. Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
            --> created a particle explosion (glowing firework) that displays when the rocket hits the spaceship

    CITATIONS:
        https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/   //for local storage
        https://steemit.com/utopian-io/@onepice/move-objects-according-to-the-mouse-position-with-phaser-3 //for mouse control
        https://phaser.discourse.group/t/how-to-remove-text/742/2 //set visible
        https://labs.phaser.io/index.html?dir=game%20objects/particle%20emitter/&q= //particle emitter
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Controls, Play],
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15; //white border
let borderPadding = borderUISize / 3;

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

//reserve mouse var
let mouse, useMouse;

//resets high score to zero when window refreshes
// localStorage.setItem("score", 0);