
export default class Wolf extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene) {
        super(scene, 'wolf');
        this.scene = scene;
        this.scene.anims.create({
            key: 'wolf-side',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 6, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'wolf-right',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'wolf-up',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 12, end: 17 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'wolf-down',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });


        this.scene.anims.create({
            key: 'wolf-punch',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 19, end: 21 }),
            frameRate: 30,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'wolf-die',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 42, end: 47 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'wolf-die-up',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 48, end: 53 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'wolf-die-down',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 36, end: 41 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'wolf-attack',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 24, end: 29 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'wolf-attack-up',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'wolf-attack-down',
            frames: this.scene.anims.generateFrameNumbers('wolf', { start: 30, end: 35 }),
            frameRate: 10,
            repeat: 0
        });
    }

    create(){


    }
    // Métodos específicos do ogro
}
