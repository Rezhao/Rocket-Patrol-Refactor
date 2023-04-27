class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;

        //add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        if(!this.isFiring && !useMouse) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            } 
        }

        if(!this.isFiring && useMouse){
            if(mouse.x >= borderUISize + this.width/2 && mouse.x <= game.config.width - borderUISize - this.width/2){
                this.x = mouse.x;
            }
        }


        //fire button
        if(!useMouse && Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        if(useMouse && mouse.isDown && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        //if fired, move up
        if(this.isFiring && this.y >= borderUISize) {
            this.y -= this.moveSpeed;
        }

        //reset on miss
        if(this.y <= borderUISize) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        if(useMouse){
            this.x = mouse.x;
        }
        // this.x = mouse.x;
        // this.y = borderUISize + borderPadding;
    }

    // pointerMove(pointer){
    //     this.x = pointer.worldX;
    // }
}