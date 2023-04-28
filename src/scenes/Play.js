class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', 'assets/crab.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        // this.load.image('starfield', 'assets/starfield.png');
        this.load.image('beach', 'assets/beach.png');

        //load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //place tile sprite
        this.beach = this.add.tileSprite(0, 0, 640, 480,'beach').setOrigin(0, 0);
        // this.beach.scale(0.5);

        //green UI background
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // this.add.rectangle(0, borderUISize, game.config.width, borderUISize * 2, 0x33d8dd).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5);

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //define mouse
        mouse = this.input.mousePointer;
        
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        //display score
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
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            // backgroundColor: '#4287f5',
            color: '#042861',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let highScoreLabelConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            // backgroundColor: '#4287f5',
            color: '#042861',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, this.p1Score, scoreConfig);
        this.highScore = this.add.text(game.config.width - borderUISize - borderPadding - 100, borderUISize + borderPadding * 1.25, localStorage.getItem("score"), highScoreConfig);
        this.add.text(game.config.width - borderUISize - borderPadding - 210, borderUISize + borderPadding * 1.25, "High Score: ", highScoreLabelConfig);

        //GAME OVER flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // this.clock = this.time.delayedCall(30000, () => {
        //     game.settings.spaceshipSpeed += 1;
        // }, null, this);


        //display time left
        this.timer = this.add.text(game.config.width/2, borderUISize/2, '', highScoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 - 20, borderUISize/2, "Timer: ", highScoreLabelConfig).setOrigin(0.5);
        // let timerTemp = this.add.text(game.config.width/2, borderUISize/2, game.settings.gameTimer, highScoreConfig).setOrigin(0.5);


    }

    update() {
        //updates time remaining
        this.timer.text = Math.floor(this.clock.getRemainingSeconds());
        // var timerTemp = Math.floor(this.clock.getRemainingSeconds());

        //keep track of highest score
        if(localStorage.getItem("score") < this.p1Score){
            localStorage.setItem("score", this.p1Score);
            this.highScore.text = localStorage.getItem("score");
        }


        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        this.beach.tilePositionX -= 4;
        if(!this.gameOver) {
            this.p1Rocket.update();

            //update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollisions(this.p1Rocket, this.ship03)) {
            // console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            // this.clock = this.clock + 5000;
            // timerTemp += 5000;
        }
        if(this.checkCollisions(this.p1Rocket, this.ship02)) {
            // console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            // this.clock = this.clock + 5000;
        }
        if(this.checkCollisions(this.p1Rocket, this.ship01)) {
            // console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            // this.clock = this.clock + 5000;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
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

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); //play explosion animation
        boom.on('animationcomplete', () => { //callback after anim completes
            ship.reset(); //reset ship position
            ship.alpha = 1; //make ship visible again
            boom.destroy(); //remove explosion sprite
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

}