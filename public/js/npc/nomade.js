
export default class key extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, key) {
        super(scene, `${key}`);
        this.key = key;
        this.scene = scene;
        this.scene.anims.create({
            key: `${key}-turn`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 12, end: 14 }),
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: `${key}-farm`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 15, end: 20 }),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: `${key}-side`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${key}-right`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${key}-up`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 9, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${key}-down`,
            frames: this.scene.anims.generateFrameNumbers(`${key}`, { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });


        // this.scene.anims.create({
        //     key: `${key}-punch`,
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 19, end: 21 }),
        //     frameRate: 30,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: `${key}-die',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 42, end: 47 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: `${key}-die-up',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 48, end: 53 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: `${key}-die-down',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 36, end: 41 }),
        //     frameRate: 10,
        //     repeat: 0
        // });

        // this.scene.anims.create({
        //     key: `${key}-attack',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 24, end: 29 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: `${key}-attack-up',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 18, end: 23 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: `${key}-attack-down',
        //     frames: this.scene.anims.generateFrameNumbers(`${key}', { start: 30, end: 35 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
    }

    create(){


    }

    detect(npc) {
        if(!npc.npcNoc){
           npc.npcNoc = true;
           this.scene.time.delayedCall(5000, () => {
                npc.npcNoc = false;
           })

        }

    }

}
