
export default class Farmer extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene) {
        super(scene, 'farmer');
        this.scene = scene;
        this.scene.anims.create({
            key: 'farmer-turn',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 12, end: 14 }),
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'farmer-farm',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 15, end: 20 }),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'farmer-side',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'farmer-right',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'farmer-up',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 9, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'farmer-down',
            frames: this.scene.anims.generateFrameNumbers('farmer', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });



        // this.scene.anims.create({
        //     key: 'farmer-punch',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 19, end: 21 }),
        //     frameRate: 30,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'farmer-die',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 42, end: 47 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'farmer-die-up',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 48, end: 53 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'farmer-die-down',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 36, end: 41 }),
        //     frameRate: 10,
        //     repeat: 0
        // });

        // this.scene.anims.create({
        //     key: 'farmer-attack',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 24, end: 29 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'farmer-attack-up',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 18, end: 23 }),
        //     frameRate: 10,
        //     repeat: 0
        // });
        // this.scene.anims.create({
        //     key: 'farmer-attack-down',
        //     frames: this.scene.anims.generateFrameNumbers('farmer', { start: 30, end: 35 }),
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
            if (distance < closestDistance && element.timeout === 0 && element.grow !== 1) {
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
            this.colheita(npc);
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

    colheita(npc){
        npc.anims.stop();
        npc.setVelocityX(0);
        npc.setVelocityY(0);
        npc.speed = 0;
        npc.npcColheita = true;
        npc.isWorking = false;
        npc.anims.play('farmer-farm', true)

        const farm = npc.closestThing
        farm.timeout = 1;
        this.grow(farm);

        this.scene.time.delayedCall(180000, () => {
            farm.timeout = 0;
        })

        farm.grow = 0;
        farm.setTexture('farm-tile'+farm.index);
        this.scene.time.delayedCall(5000, () => {
            npc.npcColheita = false;
            this.detect(npc)

        })
        // this.anims.play("farm",true).once('animationcomplete', ()=>{

        // });
    }

    talk() {

    }

    grow(farm){
        if(farm.grow !== 2){
            let contador = Phaser.Math.Between(80000, 90000);
            this.scene.time.delayedCall(contador, () => {
                if(farm.grow === 0){
                    farm.setTexture('grow-tile'+farm.index);
                }else{
                    farm.setTexture('last-tile'+farm.index);
                }
                farm.grow += 1
                this.grow(farm);
            })

        }
    }
}
