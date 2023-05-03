/*
    AUTHOR: Rebecca Zhao
    MOD TITLE:
    APPROX. TIME: 
    MOD DESCRIPTION:
    CITATIONS:
        https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/   //for local storage
        https://steemit.com/utopian-io/@onepice/move-objects-according-to-the-mouse-position-with-phaser-3 //for mouse control
        https://newdocs.phaser.io/docs/3.55.2/Phaser.Sound.Events.STOP //sound

    IDEAS:
    FINISHED: Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, 
    and is worth more points (15)

    FINISHED: Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)

    FINISHED: Implement mouse control for player movement and mouse click to fire (15)

    Create 4 new explosion sound effects and randomize which one plays on impact (10)
    OR
    Implement parallax scrolling for the background (10)

    FINISHED: Display the time remaining (in seconds) on the screen (10)

    // Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)

    FINISHED: Create a new title screen (e.g., new artwork, typography, layout) (10)

    FINISHED: Track a high score that persists across scenes and display it in the UI (5)

    FINISHED: Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)

    FINISHED: Create a new scrolling tile sprite for the background (5)
    OR
    Implement the speed increase that happens after 30 seconds in the original game (5)
    OR
    FINISHED: Implement the 'FIRE' UI text from the original game (5)
    
    extra
    Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)

    85 total
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

//creates a score that keeps track of highest score
// localStorage.setItem("score", 0);