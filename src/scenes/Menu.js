class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('play_song', './assets/Wallpaper.mp3');

        //load images
        this.load.image('home', 'assets/home.png');
    }

    create(){
        //home background
        this.home = this.add.tileSprite(0, 0, 640, 480,'home').setOrigin(0, 0);

        //title text configuration
        let titleConfig = {
            fontFamily: 'Helvetica Neue',
            fontSize: '50px',
            fontStyle: 'bold',
            color: '#ffa8db',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text configuration
        let menuConfig = {
            fontFamily: 'Helvetica Neue',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#099673',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display game title
        var text = this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding + 80, 'BEACH VIBES', titleConfig).setOrigin(0.5);
        text.setShadow(4, 4, '#ff0096', 5);
        
        //sub title: select game level
        this.add.rectangle(borderUISize*4.5 + borderPadding*4.5, game.config.height/4 + borderUISize + borderPadding + 49, game.config.width - borderPadding * 9 - borderUISize * 9, borderUISize * 1.5, 0x91e3cf).setOrigin(0, 0);
        this.add.circle(borderUISize*4.5 + borderPadding*4.5, game.config.height/4 + borderUISize + borderPadding + 49, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.circle(borderUISize*4.5 + borderPadding*4.5 + game.config.width - borderPadding * 9 - borderUISize * 9, game.config.height/4 + borderUISize + borderPadding + 49, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize*2 + borderPadding + 42, 'Select a game level:', menuConfig).setOrigin(0.5);
        
        //arrow select description
        menuConfig.color = '#b8236d';
        menuConfig.fontSize = '22px';
        this.add.text(game.config.width/2, game.config.height/3 + borderUISize*2 + borderPadding*2 + 45, 'Press ← or → to select', menuConfig).setOrigin(0.5);

        //new style for buttons
        menuConfig.color = '#f7dfcd';
        menuConfig.fontSize = '20px';

        //NOVICE BUTTON
        //border of novice button
        this.add.circle(game.config.width/4 + 45, game.config.height/2 + borderUISize + borderPadding + 60, 24, 0xd97a32).setOrigin(0.5);
        this.add.circle(game.config.width/4 + 45 + game.config.width/8, game.config.height/2 + borderUISize + borderPadding + 60, 24, 0xd97a32).setOrigin(0.5);
        this.add.rectangle(game.config.width/4 + 45, game.config.height/2 + borderUISize + borderPadding + 36, game.config.width/8, borderUISize*1.5, 0xd97a32).setOrigin(0, 0);

        //novice button body
        this.add.circle(game.config.width/4 + 45, game.config.height/2 + borderUISize + borderPadding + 60, 20, 0xeb9452).setOrigin(0.5);
        this.add.circle(game.config.width/4 + 45 + game.config.width/8, game.config.height/2 + borderUISize + borderPadding + 60, 20, 0xeb9452).setOrigin(0.5);
        this.add.rectangle(game.config.width/4 + 45, game.config.height/2 + borderUISize + borderPadding + 40, game.config.width/8, borderUISize*1.25, 0xeb9452).setOrigin(0, 0);
        this.add.text(game.config.width/2 - 80, game.config.height/2 + borderUISize + borderPadding + 59, '← Novice', menuConfig).setOrigin(0.5);


        //EXPERT BUTTON
        //border of expert button
        this.add.circle(game.config.width/2 + 40, game.config.height/2 + borderUISize + borderPadding + 60, 24, 0xd97a32).setOrigin(0.5);
        this.add.circle(game.config.width/2 + 40 + game.config.width/8, game.config.height/2 + borderUISize + borderPadding + 60, 24, 0xd97a32).setOrigin(0.5);
        this.add.rectangle(game.config.width/2 + 40, game.config.height/2 + borderUISize + borderPadding + 36, game.config.width/8, borderUISize*1.5, 0xd97a32).setOrigin(0, 0);

        //expert button body
        this.add.circle(game.config.width/2 + 40, game.config.height/2 + borderUISize + borderPadding + 60, 20, 0xeb9452).setOrigin(0.5);
        this.add.circle(game.config.width/2 + 40 + game.config.width/8, game.config.height/2 + borderUISize + borderPadding + 60, 20, 0xeb9452).setOrigin(0.5);
        this.add.rectangle(game.config.width/2 + 40, game.config.height/2 + borderUISize + borderPadding + 40, game.config.width/8, borderUISize*1.25, 0xeb9452).setOrigin(0, 0);
        this.add.text(game.config.width/2 + 82, game.config.height/2 + borderUISize + borderPadding + 59, 'Expert →', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 61000
            }
            this.sound.play('sfx_select');
            this.scene.start('controlScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 46000
            }
            this.sound.play('sfx_select');
            this.scene.start('controlScene');
        }
    }
}
