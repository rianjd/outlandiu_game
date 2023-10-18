import CollectableItem from "./item_drop.js";

export default class Enemies extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, `${key}`);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.vida = 25;
        this.setSize(32, 32); // Defina a largura e altura da hitbox (em pixels)
        this.initialX = x;
        this.speed = 20; // Velocidade do movimento
        this.setRandomDirection(); // Define uma direção de movimento aleatória inicial
        this.setInteractive(); // Permitir interação com o inimigo
        this.isDodge = false;
        this.isAttacking = false;
        this.enemyNoc = false;

        this.key = key;
        this.depth = 3;
        this.setScale(1.5); // Aumenta a escala vertical
        this.isDead = false;
        this.enemyAttack = 10;

        this.lifeBarEmpty = scene.add.sprite(x, y - 20, 'lifeBarEmpty');
        this.lifeBarEmpty.depth = 3;
        this.lifeBarFull = scene.add.sprite(x, y - 20, 'lifeBarFull');
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
        this.ogre_roar = this.scene.sound.add('ogre_roar');

        this.specieRoar = {
            wolf: this.wolf_roar,
            ogre: this.ogre_roar,

        }

        this.specieAnim = {
            wolf: this.scene.wolf,
            ogre: this.scene.ogre,

        }

    }
    setRandomDirection() {
        // Escolha aleatoriamente uma direção de movimento (horizontal ou vertical)
        if (Math.random() < 0.5) {
            this.directionX = Math.random() < 0.5 ? -1 : 1;
            this.directionY = 0;
        } else {
            this.directionX = 0;
            this.directionY = Math.random() < 0.5 ? -1 : 1;
        }
        // Defina uma distância aleatória para se mover antes de mudar de direção
        this.remainingDistanceX = Phaser.Math.Between(8000, 10000);
        this.remainingDistanceY = Phaser.Math.Between(8000, 10000);
    }
    update() {
        const vidaMaxima = 25;
        this.lifeBarFull.x = this.x;
        this.lifeBarFull.y = this.y - 20;

        this.lifeBarEmpty.x = this.x;
        this.lifeBarEmpty.y = this.y - 20;

        if (this.vida > 0) {
            this.lifeBarFull.scaleX = this.vida / vidaMaxima;
        } else {
            this.lifeBarFull.scaleX = 0;
        }

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

        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.scene.player.sprite.x, this.scene.player.sprite.y
        );

        if (!this.enemyNoc && !this.isDead && !this.isAttacking) {
            if (distanceToPlayer < 200) {
                this.animate();
                this.chase(distanceToPlayer);
                if (!this.roar) {
                    this.rugido();
                }
            } else {
                this.speed = 20;
                this.animate();
            }
        } else if (this.enemyNoc) {
            //para a animação e empurra o boneco para tras
            this.anims.stop;

            this.setVelocityX((this.speed - 30) * this.directionX * -1);
            this.setVelocityY((this.speed - 30) * this.directionY * -1);

            this.speed = 50;
        } else {
            this.anims.stop;
            this.speed = 0;
        }




    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Verifique se o inimigo colidiu com algo (colisores ou limites da tela)
        if (this.body.blocked.left || this.body.blocked.right || this.body.blocked.up || this.body.blocked.down) {
            this.isDodge = true;
            this.setRandomDirection();
            this.scene.time.delayedCall(800, () => {
                this.isDodge = false;

            })
        }
    }

    chase(distanceToPlayer) {
        this.speed = 50;
        if (!this.isDodge && !this.isDead) {
            const angleToPlayer = Phaser.Math.Angle.BetweenPoints(this, this.scene.player.sprite);
            // Verifique se o ângulo para o jogador é maior ou menor que o ângulo para o obstáculo
            this.directionAngle = angleToPlayer;
            this.directionX = Math.cos(this.directionAngle);
            this.directionY = Math.sin(this.directionAngle);

            if (distanceToPlayer < 28 && !this.scene.player.isNoc && !this.isAttacking) {

                this.isAttacking = true;
                if (this.directionX !== 0) {
                    this.anims.play(this.key+ '-attack', true);
                    this.setFlipX(this.directionX > 0);
                } else if (this.directionY < 0) {
                    this.anims.play(this.key+ '-attack-up', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                } else if (this.directionY > 0) {
                    this.anims.play(this.key+ '-attack-down', true);
                    this.setFlipX(false); // Mantém a orientação horizontal original

                }
                this.scene.time.delayedCall(400, () => {

                    this.scene.player.takeDamage(this.enemyAttack, this);
                })


                this.scene.time.delayedCall(1000, () => {
                    this.isAttacking = false;
                })

            }
        }
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
            this.setFlipX(this.directionX > 0);
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
        if (!this.scene.enemyNoc && !this.isDead) {
            this.vida -= damage; // Reduz a vida do inimigo
            if (this.vida <= 0) {
                this.isDead = true;
                this.scene.spawnEnemy();
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

                // Aplique um impulso para trás no inimigo
                this.enemyNoc = true;
                this.scene.time.delayedCall(400, () => {
                    this.enemyNoc = false;

                }, null, this);


            }
        }

    }

}
