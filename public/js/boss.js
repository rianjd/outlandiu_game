export default class Boss extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, `${key}`);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        //Vida
        this.vida = 300;
        this.vidaMaxima = 300;

        this.setSize(36, 36); // Defina a largura e altura da hitbox (em pixels)
        this.initialX = x;
        this.speed = 20; // Velocidade do movimento
        this.directionX  = -1;
        this.setRandomDirection(); // Define uma direção de movimento aleatória inicial
        this.setInteractive(); // Permitir interação com o inimigo
        this.isDodge = false;
        this.isAttacking = false;
        this.enemyNoc = false;
        this.reset = true;
        this.key = key;
        this.depth = 3;
        this.setScale(1.5); // Aumenta a escala vertical
        this.isDead = false;
        this.enemyAttack = 40;

        this.chasing = false;


        this.lifeBarEmpty = scene.add.sprite(x, y, 'lifeBarFramelg');
        this.lifeBarEmpty.depth = 3;
        this.lifeBarFull = scene.add.sprite(x, y, 'lifeBarlg');
        this.lifeBarFull.depth = 3;

        this.lifeBarEmpty.setOrigin(0.5, 1);
        this.lifeBarFull.setOrigin(0.5, 1);
        this.roar = false;

        // Adicionar os sprites à cena
        scene.add.existing(this.lifeBarFull);
        scene.add.existing(this.lifeBarEmpty);

        // Definir a escala inicial da barra de vida cheia (0 a 1)
        this.lifeBarFull.scaleX = 1;
        // Crie animações para o inimigo


        this.wolf_roar = this.scene.sound.add('wolf_roar');

        this.specieRoar = {
            minotaur: this.wolf_roar,

        }

        this.specieAnim = {
            minotaur: this.scene.minotaur,

        }

    }
    setRandomDirection() {
        // Escolha aleatoriamente uma direção de movimento (horizontal ou vertical)
        if (this.directionX > 0) {
            this.directionX = -1;
        } else {
            this.directionX = 1;
        }
        this.directionY = 0;
        // Defina uma distância aleatória para se mover antes de mudar de direção
        this.remainingDistanceX = 10000;
        this.remainingDistanceY = 10000;
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

        if (this.body.blocked.left || this.body.blocked.right || this.body.blocked.up || this.body.blocked.down) {
            this.isDodge = true;
            this.setChaseDirection();
            this.scene.time.delayedCall(1000, () => {
                this.isDodge = false;

            })
        }

        const vidaMaxima = 300;
        this.lifeBarFull.x = this.x;
        this.lifeBarFull.y = this.y - 40;

        this.lifeBarEmpty.x = this.x;
        this.lifeBarEmpty.y = this.y - 40;

        if (this.vida > 0) {
            this.lifeBarFull.scaleX = this.vida / vidaMaxima;
        } else {
            this.lifeBarFull.scaleX = 0;
        }

        this.resetVida()

        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.scene.player.sprite.x, this.scene.player.sprite.y
        );

        const distanceToCenter = Phaser.Math.Distance.Between(
            this.scene.player.sprite.x, this.scene.player.sprite.y,
            this.mainSpawn.x + 50, this.mainSpawn.y
        );

        const center = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.mainSpawn.x, this.mainSpawn.y
        );


        if (!this.enemyNoc && !this.isDodge && !this.isDead && !this.isAttacking) {

            // Move o inimigo na direção atual
            this.setVelocityX(this.speed * this.directionX);
            this.setVelocityY(this.speed * this.directionY);

            // Reduz as distâncias restantes
            this.remainingDistanceX -= Math.abs(this.speed);
            this.remainingDistanceY -= Math.abs(this.speed);

            // Se atingir a distância máxima em ambas as direções, mude as direções
            if (this.remainingDistanceX <= 0 || this.remainingDistanceY <= 0) {
                this.setRandomDirection();
            }
            // Verificar colisão com os limites do mundo
            if (this.x < 0 || this.x > this.scene.physics.world.bounds.width) {
                this.directionX *= -1; // Inverter a direção horizontal
            }
            if (this.y < 0 || this.y > this.scene.physics.world.bounds.height) {
                this.directionY *= -1; // Inverter a direção vertical
            }
            // Escolha a animação apropriada com base na direção do movimento



            if (distanceToCenter < 200 || distanceToPlayer < 100) {
                this.animate();
                console.log('Ok')
                this.chase();
                if (!this.roar) {
                    this.rugido();
                }
            } else {
                if(this.chasing){

                    this.reset = false;
                    this.resetPos()
                }
                this.speed = 20;
                this.animate();
            }





        } else if (this.enemyNoc) {
            //para a animação e empurra o boneco para tras
            this.anims.stop;

            this.setVelocityX((this.speed - 30) * this.directionX * -1);
            this.setVelocityY((this.speed - 30) * this.directionY * -1);

            this.speed = 50;

        } else if (this.isDodge) {
            this.speed = 30;

        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.anims.stop;
            this.speed = 0;
        }




    }

    resetPos(){
        console.log('Resetando')
        const deltaX = this.mainSpawn.x - this.x;
        const deltaY = this.mainSpawn.y - this.y;
        const speed = 30; // Ajuste conforme necessário

        if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) {
            this.chasing = false;
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

    resetVida(){
        if(!this.chasing && this.vida < this.vidaMaxima){
            this.vida += 1;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Verifique se o inimigo colidiu com algo (colisores ou limites da tela)

    }

    setChaseDirection(){
        const deltaX = this.scene.player.sprite.x - this.x;
        const deltaY = this.scene.player.sprite.y - this.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {

            this.setVelocityX(0);
            this.directionY = Math.sign(deltaX);
            this.setVelocityY(Math.sign(deltaY) * this.speed);

        } else {

            this.setVelocityX(Math.sign(deltaX) * this.speed);
            this.directionX = Math.sign(deltaX);
            this.setVelocityY(0);
        }
        this.animate();

    }

    chase(distanceToPlayer) {
        this.speed = 50;
        if (!this.isDodge && !this.isDead) {
            this.chasing = true;
            const angleToPlayer = Phaser.Math.Angle.BetweenPoints(this, this.scene.player.sprite);
            // Verifique se o ângulo para o jogador é maior ou menor que o ângulo para o obstáculo
            this.directionAngle = angleToPlayer;
            this.directionX = Math.cos(this.directionAngle);
            this.directionY = Math.sin(this.directionAngle);

            if (distanceToPlayer < 25 && !this.scene.player.isNoc && !this.isAttacking) {

                this.isAttacking = true;
                if (this.directionX !== 0) {
                    this.anims.play(this.key+ '-attack', true);
                    this.setFlipX(this.directionX < 0);
                } else if (this.directionY < 0) {
                    this.anims.play(this.key+ '-attack-up', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                } else if (this.directionY > 0) {
                    this.anims.play(this.key+ '-attack-down', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                }
                this.scene.time.delayedCall(400, () => {
                    if (distanceToPlayer < 25){
                        this.scene.player.takeDamage(this.enemyAttack, this);
                    }
                })


                this.scene.time.delayedCall(1500, () => {
                    this.isAttacking = false;
                })

            }
        }
        // var path = null;
        // this.scene.finder.findPath(Math.floor(this.x / 16), Math.floor(this.x / 16), Math.floor(this.scene.player.sprite.x / 16), Math.floor(this.scene.player.sprite.y / 16), function( path ) {
        //     if (path === null) {
        //         console.warn("Path was not found.");
        //     } else {
        //         console.log(path);
        //         //Game.moveCharacter(path);
        //     }
        //     });
        // this.scene.finder.calculate();

        // // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        // var tweens = [];
        // if(path != null){
        //     for(var i = 0; i < path.length-1; i++){
        //         var ex = path[i+1].x;
        //         var ey = path[i+1].y;
        //         tweens.push({
        //             targets: this,
        //             x: {value: ex*this.scene.map.tileWidth, duration: 200},
        //             y: {value: ey*this.scene.map.tileHeight, duration: 200}
        //         });
        //     }

        //     this.scene.tweens.timeline({
        //         tweens: tweens
        //     });
        // }

    }

    rugido() {
        this.specieRoar[this.key].play({
            volume: .4
        });
        this.roar = true;

        this.scene.time.delayedCall(10000, () => {
            this.roar = false;

        })
    }

    animate() {
        if (this.directionX !== 0) {
            //this.anims.play(this.key+ '-side', true);
            this.anims.play(this.key+ '-side', true);
            this.setFlipX(this.directionX < 0);
        } else if (this.directionY < 0) {
            this.anims.play(this.key+ '-up', true);
            this.setFlipX(false); // Mantém a orientação horizontal original

        } else if (this.directionY > 0) {
            this.anims.play(this.key+ '-down', true);
            this.setFlipX(false); // Mantém a orientação horizontal original

        }
    }

    // Dentro da classe Enemies
    takeDamage(damage) {
        if (!this.isDead) {
            this.vida -= damage; // Reduz a vida do inimigo
            if (this.vida <= 0) {
                this.isDead = true;
                if (this.directionX !== 0) {
                    this.anims.play(this.key+ '-die', true);
                    this.setFlipX(this.directionX > 0);
                } else if (this.directionY < 0) {
                    this.anims.play(this.key+ '-die-up', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                } else if (this.directionY > 0) {
                    this.anims.play(this.key+ '-die-down', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                }
                this.once('animationcomplete', () => {
                    this.scene.addCollectable(this, 4, 'Material')
                })

                this.scene.time.delayedCall(1000, () => {

                    this.lifeBarEmpty.destroy();
                    this.lifeBarFull.destroy();
                    this.destroy();
                });

            } else {
                this.scene.hit_enemy.play({ volume: .5, loop: false });

                this.anims.play(this.key+ '-punch', true);

            }
        }

    }

}
