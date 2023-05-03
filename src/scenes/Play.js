class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('crab', 'assets/crab.png');
        this.load.image('rocket', 'assets/bubble.png');
        this.load.image('beach', 'assets/beach.png');
        this.load.image('pineapple', 'assets/pineapple.png');
        this.load.image('coconut', 'assets/coconut.png');
        this.load.image('watermelon', 'assets/watermelon.png');
        this.load.image('glow', 'assets/glow.png');

        //load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //place tile sprite
        this.beach = this.add.tileSprite(0, 0, 640, 480,'beach').setOrigin(0, 0);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'watermelon', 0, 40).setOrigin(0, 0);
        this.ship01.moveSpeed += 3;
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'coconut', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'pineapple', 0, 10).setOrigin(0, 0);

        //white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //initialize rocket and crab
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding + 5, 'rocket').setOrigin(0.5, 0);
        this.crab = this.add.image(this.p1Rocket.x, game.config.height - borderUISize - borderPadding, 'crab');

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //define mouse
        mouse = this.input.mousePointer;

        //initialize score
        this.p1Score = 0;

        //score stylization
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#edcb8f',
            color: '#866146',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //timer stylization
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#042861',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        //display player's current score
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, this.p1Score, scoreConfig);

        //display high score
        this.add.rectangle(game.config.width - borderUISize - borderPadding - 260, borderUISize + borderPadding, 260, 40, 0xedcb8f).setOrigin(0, 0);
        scoreConfig.fixedWidth = 0;
        scoreConfig.fontSize = '25px';
        this.highScore = this.add.text(game.config.width - borderUISize - borderPadding - 70, borderUISize + borderPadding * 1.25, localStorage.getItem("score"), scoreConfig);
        this.add.text(game.config.width - borderUISize - borderPadding - 255, borderUISize + borderPadding * 1.25, "High Score: ", scoreConfig);

        //GAME OVER flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //display time left
        this.timer = this.add.text(game.config.width/2 + 30, borderUISize/2, "Timer: ", timerConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 - 30, borderUISize/2, "Timer: ", timerConfig).setOrigin(0.5);
        
        //play and loop song in background
        this.song = this.sound.add('play_song');
        this.song.setLoop(true);
        this.song.play();

        //adding fire text
        scoreConfig.backgroundColor = '#eb8f81';
        scoreConfig.color = '#bf2a13';
        this.fireText = this.add.text(game.config.width/2, borderUISize * 3.5, 'FIRE', scoreConfig).setOrigin(0.5);
        this.fireText.setVisible(false);

    }

    update() {
        //makes crab image follow the rocket
        this.crabFollow();

        //display fire ui
        if(this.p1Rocket.isFiring){
            this.fireText.setVisible(true);
        } else{
            this.fireText.setVisible(false);
        }

        //updates time remaining
        this.timer.text = Math.floor(this.clock.getRemainingSeconds());

        //keep track of highest score
        if(localStorage.getItem("score") < this.p1Score){
            localStorage.setItem("score", this.p1Score);
            this.highScore.text = localStorage.getItem("score");
        }


        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.song.stop();
            this.scene.restart();
        }

        this.beach.tilePositionX -= 2;
        if(!this.gameOver) {
            this.p1Rocket.update();

            //update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollisions(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.addTime(2000);
        }
        if(this.checkCollisions(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.addTime(2000);
        }
        if(this.checkCollisions(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.addTime(4000);
        }

        //goes back to menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.song.stop();
            this.scene.start("menuScene");
        }
    }

    checkCollisions(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else{
            return false;
        }
    }

    addTime(miliseconds){
        //adding time to clock when player hits ship
        this.clock.delay += miliseconds;
    }

    shipExplode(ship) {
        //creating particle emitter
        var emitter = this.add.particles(ship.x, ship.y, 'glow', {
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.8, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });

        //temporarily hide ship
        ship.alpha = 0;

        //play particle emitter
        emitter.explode(30);
        ship.reset()
        ship.alpha = 1;

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

    crabFollow() {
        //crab can only move along x axis
        this.crab.x = this.p1Rocket.x;
    }

}