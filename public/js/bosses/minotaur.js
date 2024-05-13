
export default class Minotaur extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 'minotaur');
        this.scene = scene;
        this.scene.anims.create({
            key: 'minotaur-side',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 10, end: 17 }),
            frameRate: 10,
            repeat: -1
        });



        this.scene.anims.create({
            key: 'minotaur-up',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 20, end: 25  }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'minotaur-down',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 26, end: 30  }),
            frameRate: 10,
            repeat: -1
        });


        this.scene.anims.create({
            key: 'minotaur-punch',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 30, end: 38 }),
            frameRate: 30,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'minotaur-die',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 42, end: 47 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'minotaur-die-up',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 48, end: 53 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'minotaur-die-down',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 36, end: 41 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'minotaur-attack',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 30, end: 38 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'minotaur-attack-up',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 30, end: 38 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'minotaur-attack-down',
            frames: this.scene.anims.generateFrameNumbers('minotaur', { start: 30, end: 38 }),
            frameRate: 10,
            repeat: 0
        });

    }
    create(){

    }

    // Métodos específicos do ogro
}
