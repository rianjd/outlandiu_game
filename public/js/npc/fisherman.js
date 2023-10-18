
export default class Fisherman extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene) {
        super(scene, 'fisherman');
        this.scene = scene;
        this.scene.anims.create({
            key: 'fisherman-turn',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 12, end: 14 }),
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'fisherman-farm',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 15, end: 20 }),
            frameRate: 6,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'fisherman-side',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fisherman-right',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fisherman-up',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 9, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fisherman-down',
            frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });


        // this.scene.anims.create({
        //     key: 'fisherman-punch',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 19, end: 21 }),
        //     frameRate: 30,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'fisherman-die',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 42, end: 47 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'fisherman-die-up',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 48, end: 53 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'fisherman-die-down',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 36, end: 41 }),
        //     frameRate: 10,
        //     repeat: 0
        // });

        // this.scene.anims.create({
        //     key: 'fisherman-attack',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 24, end: 29 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'fisherman-attack-up',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 18, end: 23 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'fisherman-attack-down',
        //     frames: this.scene.anims.generateFrameNumbers('fisherman', { start: 30, end: 35 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
    }

    create(){


    }

    detect(npc) {
        if(npc.isActive){
            let closestDistance = Number.MAX_VALUE; // Comece com um valor muito grande

            this.scene.things.getChildren().forEach(element => {

                const distance = Phaser.Math.Distance.Between(npc.x, npc.y, element.x, element.y);
                if (distance < closestDistance && element.timeout === 0 && element.fishing !== 1) {
                    npc.closestThing = element;
                    closestDistance = distance;
                    npc.isWorking = true;
                }


            });
        }

    }

    goWork(npc){
        const deltaX = npc.closestThing.x - npc.x;
        const deltaY = npc.closestThing.y - npc.y;
        const speed = 20; // Ajuste conforme necessário
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
            console.log('chegou')
            this.pesca(npc);
        }
        else if (Math.abs(deltaX) > Math.abs(deltaY)) {
            npc.setVelocityX(Math.sign(deltaX) * speed);
            npc.directionX = Math.sign(deltaX);
            npc.setVelocityY(0);

        } else {
            npc.setVelocityX(0);
            npc.directionY = Math.sign(deltaY);
            npc.setVelocityY(Math.sign(deltaY) * speed);

        }


    }

    pesca(npc){
        npc.anims.stop();
        npc.setVelocityX(0);
        npc.setVelocityY(0);
        npc.speed = 0;
        npc.isWorking = false;
        npc.npcColheita = true;

        const fish = npc.closestThing
        fish.timeout = 1;
        fish.fishing = 1;
        npc.anims.play('fisherman-farm', true)

        this.scene.time.delayedCall(60000, () => {
            fish.timeout = 0;
            fish.fishing = 0;
        })

        this.scene.time.delayedCall(30000, () => {
            npc.npcColheita = false;
        })
        // this.anims.play("farm",true).once('animationcomplete', ()=>{

        // });
    }

    talk() {

    }

    // grow(farm){
    //     if(farm.fishing == 0){
    //         let contador = Phaser.Math.Between(80000, 90000);
    //         this.scene.time.delayedCall(contador, () => {
    //             if(farm.fishing === 0){
    //                 farm.setTexture('grow-tile'+farm.index);
    //             }else{
    //                 farm.setTexture('last-tile'+farm.index);
    //             }
    //             farm.fishing += 1
    //             this.grow(farm);
    //         })

    //     }
    // }
}
