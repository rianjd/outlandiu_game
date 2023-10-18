

export default class Npc extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, `${key}`);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.vida = 25;
        this.speed = 20; // Velocidade do movimento
        this.setSize(18,18)
        this.setOffset(7,14)
        this.setRandomDirection(); // Define uma direção de movimento aleatória inicial
        this.setInteractive(); // Permitir interação com o inimigo
        this.npcNoc = false;
        this.key = key;
        this.npcColheita = false;
        this.depth = 3;
        this.isDead = false;
        this.isActive = true;

        // this.lifeBarEmpty = scene.add.sprite(x, y - 20, 'lifeBarEmpty');
        // this.lifeBarEmpty.depth = 3;
        // this.lifeBarFull = scene.add.sprite(x, y - 20, 'lifeBarFull');
        // this.lifeBarFull.depth = 3;
        // this.lifeBarEmpty.setOrigin(0.5, 1);
        // this.lifeBarFull.setOrigin(0.5, 1);
        // scene.add.existing(this.lifeBarFull);
        // scene.add.existing(this.lifeBarEmpty);
        // this.lifeBarFull.scaleX = 1;

        this.talking = false;

        this.talking_npc = this.scene.sound.add('talking_npc');

        this.specieAnim = {
            farmer: this.scene.farmer,
            fisherman: this.scene.fisherman,
            nomade: this.scene.nomade,
            'nomade-girl': this.scene.nomade,

        }
        this.closestThing = null;
        this.isWorking = false;
        this.isDodge = false;
        this.changeDirection = false;
        this.isHome = false;
        this.isGoingHome = false;
    }
    setRandomDirection() {
        if (Math.random() < 0.5) {
            this.directionX = Math.random() < 0.5 ? -1 : 1;
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = Math.random() < 0.5 ? -1 : 1;
        }

        this.remainingDistanceX = Phaser.Math.Between(8000, 10000);
        this.remainingDistanceY = Phaser.Math.Between(8000, 10000);
    }

    setNewDirection(thing){
        if(!this.isDodge){
            console.log('desviando')
            const deltaX = thing.x - this.x;
            const deltaY = thing.y - this.y;
            const speed = 20; // Ajuste conforme necessário


            if (Math.abs(deltaX) > Math.abs(deltaY)) {

                this.setVelocityX(0);
                this.directionY = Math.sign(deltaX);
                this.setVelocityY(Math.sign(deltaY) * speed);

            } else {

                this.setVelocityX(Math.sign(deltaX) * speed);
                this.directionX = Math.sign(deltaX);
                this.setVelocityY(0);
            }
            this.animate();
        }


    }
    update() {
        // Verifique se o inimigo colidiu com algo (colisores ou limites da tela)
        if (this.body.blocked.left || this.body.blocked.right || this.body.blocked.up || this.body.blocked.down) {
            if(!this.isWorking && !this.isGoingHome){
                this.npcNoc = true;
                this.setRandomDirection();
                this.scene.time.delayedCall(5000, () => {
                    this.npcNoc = false;
                })
            }
            else{
                this.anims.stop;
                let thing = this.closestThing;
                this.setNewDirection(thing);
                this.isDodge = true;

                this.scene.time.delayedCall(Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000, () => {
                    this.isDodge = false;
                })
            }
        }

        if(this.scene.isDay){
            if(!this.body.enable){
                this.setVisible(true);
                this.setActive(true);
                this.enableBody();
                this.isGoingHome = false;
                this.isWorking = false;
                this.setVelocityX(0);
                this.setVelocityY(0);

            }

            if(!this.isDodge){
                this.setVelocityX(this.speed * this.directionX);
                this.setVelocityY(this.speed * this.directionY);

                this.remainingDistanceX -= Math.abs(this.speed);
                this.remainingDistanceY -= Math.abs(this.speed);

                if(!this.isWorking){
                    if (this.remainingDistanceX <= 0 || this.remainingDistanceY <= 0) {
                        this.setRandomDirection();
                        this.specieAnim[this.key].detect(this);
                    }
                    if (this.x < 50 || this.x > this.scene.physics.world.bounds.width - 50 ) {
                        this.directionX *= -1;
                        this.setVelocityX(this.speed * this.directionX);
                    }
                    if (this.y < 50 || this.y > this.scene.physics.world.bounds.height - 50) {
                        this.directionY *= -1;
                        this.setVelocityY(this.speed * this.directionY);
                    }
                }else{
                    this.specieAnim[this.key].goWork(this);
                }

            }


        }else{
            if(!this.isDodge){
                this.isWorking = false;
                this.isGoingHome = true;
                this.goHome();
            }

        }

        if (!this.npcNoc && !this.isDead && !this.npcColheita ) {
            this.speed = 20;
            this.animate();

            if (!this.talking) {
                this.talk();
            }

        } else if (this.npcNoc) {
            this.anims.stop;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.anims.play(this.key+ '-turn', true);
            this.speed = 0;

        }
        else if (this.npcColheita) {
            this.anims.stop;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.speed = 0;
        }
        else {
            this.anims.stop;
            this.speed = 0;

        }
    }

    npcInside(){
        this.setVisible(false);
        this.setActive(false);
        this.disableBody();
        this.setVelocityX(0);
        this.setVelocityY(0);

    }

    goHome(){
        this.closestThing = this.mainHouse;
        this.npcColheita = false;
        const deltaX = this.mainHouse.x - this.x;
        const deltaY = this.mainHouse.y - this.y;
        const speed = 30; // Ajuste conforme necessário

        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
            this.isGoingHome = false;
            this.npcInside();
        }
        else if (Math.abs(deltaX) > Math.abs(deltaY)) {
            this.setVelocityX(Math.sign(deltaX) * speed);
            this.directionX = Math.sign(deltaX);
            this.setVelocityY(0);
            this.animate()

        } else {
            this.setVelocityX(0);
            this.directionY = Math.sign(deltaY);
            this.setVelocityY(Math.sign(deltaY) * speed);
            this.animate()

        }
    }



    animate() {
        if (this.directionX !== 0) {
            //this.anims.play(this.key+ '-side', true);
            this.anims.play(this.key+ '-side', true);
            this.setFlipX(this.directionX > 0);
        } else if (this.directionY < 0) {
            this.anims.play(this.key+ '-up', true);
            this.setFlipX(false); // Mantém a orientação horizontal original

        } else if (this.directionY > 0) {
            this.anims.play(this.key+ '-down', true);
            this.setFlipX(false); // Mantém a orientação horizontal original

        }
    }

    talk(){}

    // Dentro da classe Enemies
    takeDamage(damage) {



    }

}
