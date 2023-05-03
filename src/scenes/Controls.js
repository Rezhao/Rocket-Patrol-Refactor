class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene");
    }

    preload() {
        //load background
        this.load.image('home', 'assets/home.png');
    }

    create(){
        //controls background
        this.home = this.add.tileSprite(0, 0, 640, 480,'home').setOrigin(0, 0);

        //title text configuration
        let titleConfig = {
            fontFamily: 'Helvetica Neue',
            fontSize: '45px',
            fontStyle: 'bold',
            color: '#ffa8db',
            // align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //text stylization
        let menuConfig = {
            fontFamily: 'Helvetica Neue',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#099673',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            wordWrap: { width: game.config.width/3 - 10}
        }

        //controls title
        var text = this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding + 25, 'CONTROLS', titleConfig).setOrigin(0.5);
        text.setShadow(4, 4, '#ff0096', 5);

        //keyboard title
        this.add.rectangle(borderUISize*3 + borderPadding*3, game.config.height/3 - borderUISize - borderPadding + 40, game.config.width/3 - 75, borderUISize * 1.5, 0x91e3cf).setOrigin(0, 0);
        this.add.circle(borderUISize*3 + borderPadding*3, game.config.height/3 - borderUISize - borderPadding + 40, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.circle(borderUISize*3 + borderPadding*3 + game.config.width/3 - 75, game.config.height/3 - borderUISize - borderPadding + 40, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.text(borderUISize*3 + borderPadding*3 + 67, game.config.height/3 - borderUISize - borderPadding + 65, 'Keyboard', menuConfig).setOrigin(0.5);



        //mouse title
        this.add.rectangle(game.config.width - borderUISize*3 - borderPadding*3 - 140, game.config.height/3 - borderUISize - borderPadding + 40, game.config.width/3 - 75, borderUISize * 1.5, 0x91e3cf).setOrigin(0, 0);
        this.add.circle(game.config.width - borderUISize*3 - borderPadding*3 - 140, game.config.height/3 - borderUISize - borderPadding + 40, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.circle(game.config.width - borderUISize*3 - borderPadding*3 - 140 + game.config.width/3 - 75, game.config.height/3 - borderUISize - borderPadding + 40, borderUISize * 0.75, 0x91e3cf).setOrigin(0.5, 0);
        this.add.text(game.config.width - borderUISize*3 - borderPadding*3 - 70, game.config.height/3 - borderUISize - borderPadding + 65, 'Mouse', menuConfig).setOrigin(0.5);

        menuConfig.color = '#f7dfcd';
        menuConfig.fontSize = '22px';

        //arrows control description box
        this.add.rectangle(borderUISize*2 + borderPadding*2, game.config.height/3 + borderUISize + borderPadding + 20, game.config.width/3 + 10, game.config.height/3 + 10, 0xd97a32).setOrigin(0, 0);
        this.add.rectangle(borderUISize*2 + borderPadding*2 + 5, game.config.height/3 + borderUISize + borderPadding + 25, game.config.width/3, game.config.height/3, 0xeb9452).setOrigin(0, 0);
        this.add.text(borderUISize*2 + borderPadding*2 + 12, game.config.height/3 + borderUISize + borderPadding + 30, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0);

        //mouse control description box
        this.add.rectangle(game.config.width/2 + 11, game.config.height/3 + borderUISize + borderPadding + 20, game.config.width/3 + 10, game.config.height/3 + 10, 0xd97a32).setOrigin(0, 0);
        this.add.rectangle(game.config.width/2 + 16, game.config.height/3 + borderUISize + borderPadding + 25, game.config.width/3, game.config.height/3, 0xeb9452).setOrigin(0, 0);
        this.add.text(game.config.width/2 + 23, game.config.height/3 + borderUISize + borderPadding + 30, 'Use mouse to move & (click) to fire', menuConfig).setOrigin(0);

        //directions to start
        menuConfig.color = '#ba5407';
        this.add.text(borderUISize*2 + borderPadding*2 + 12, game.config.height/2 + 110, 'Press ← to start', menuConfig).setOrigin(0);
        this.add.text(game.config.width/2 + 23, game.config.height/2 + 110, 'Press → to start', menuConfig).setOrigin(0);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //use arrows to play
            useMouse = false;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //use mouse to play
            useMouse = true;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

    }
}