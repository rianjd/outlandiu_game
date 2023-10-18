
export default class Ogre extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 'ogre');
        this.scene = scene;
        this.scene.anims.create({
            key: 'ogre-side',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 6, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ogre-right',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ogre-up',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 12, end: 17 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ogre-down',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });


        this.scene.anims.create({
            key: 'ogre-punch',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 19, end: 21 }),
            frameRate: 30,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'ogre-die',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 42, end: 47 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'ogre-die-up',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 48, end: 53 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'ogre-die-down',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 36, end: 41 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'ogre-attack',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 24, end: 29 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'ogre-attack-up',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'ogre-attack-down',
            frames: this.scene.anims.generateFrameNumbers('ogre', { start: 30, end: 35 }),
            frameRate: 10,
            repeat: 0
        });

    }
    create(){

    }

    // Métodos específicos do ogro
}
