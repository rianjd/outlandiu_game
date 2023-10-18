export default class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fireball');

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene.anims.create({
            key: 'fireball-animation',
            frames: scene.anims.generateFrameNumbers('fireball', { start: 0, end: 9 }),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fireball-explode',
            frames: scene.anims.generateFrameNumbers('fireball', { start: 10, end: 14 }),
            frameRate: 6,
            repeat: 0
        });

        this.speed = 200; // Velocidade da bola de fogo
        this.direction = '';
        this.inScene = false;
        this.collided = false;

        this.setScale(1);
        this.setDepth(2);
        this.setRotation(Phaser.Math.DegToRad(0));
    }

    fire(player, x, y, direction) {
        if (!this.inScene) {
            this.inScene = true;
            this.direction = direction;
            this.setPropertiesBasedOnDirection();
            this.scene.isAttacking = true;
            this.scene.fireball_sound.play({volume: .6, loop: false });


            player.sprite.anims.play('punch-' + direction, true);
            this.setupFireball(player, x, y);
            player.takeStamina(50);
        }
    }

    setupFireball(player, x, y) {
        this.enableBody(true, x, y, true, true);
        this.anims.play('fireball-animation', true);

        this.scene.time.delayedCall(300, () => {
            this.moveFireball();
        });
    }

    setPropertiesBasedOnDirection() {
        this.setFlipX(this.direction === 'right');
        this.setRotation(
            this.direction === 'up'
                ? Phaser.Math.DegToRad(90)
                : this.direction === 'down'
                ? Phaser.Math.DegToRad(270)
                : 0
        );
        this.setDepth(
            this.direction === 'up'
                ? 2
                : 4
        );
    }

    moveFireball() {
        if (this.direction === 'left') {
            this.setVelocityX(-this.speed);
        } else if (this.direction === 'right') {
            this.setVelocityX(this.speed);
        } else if (this.direction === 'up') {
            this.setVelocityY(-this.speed);
        } else if (this.direction === 'down') {
            this.setVelocityY(this.speed);
        }

        this.scene.time.delayedCall(1000, () => {
            if(!this.collided){
                this.explodeFireball();
            }
        });
    }

    explodeFireball() {
        this.scene.isAttacking = false;
        this.anims.play('fireball-explode', true);
        this.scene.fireball_sound.stop();
        this.scene.fireball_explosion.play({volume: .3, loop: false });
        this.scene.isAttacking = false;
        this.disableBody();
        this.setDepth(4);

        this.scene.time.delayedCall(5000, () => {
            this.inScene = false;
            this.collided = false;
        });
    }

    update() {
        this.checkCollisionWithEnemies();
    }

    checkCollisionWithEnemies() {
        this.scene.enemies.getChildren().forEach((enemy) => {
            if (this.scene.physics.overlap(this, enemy) && !this.scene.enemyNoc) {
                this.handleCollisionWithEnemy(enemy);
            }
        });
    }

    handleCollisionWithEnemy(enemy) {
        enemy.takeDamage(this.scene.player.attack + this.scene.player.power);
        this.setScale(2);
        this.explodeFireball();
        this.collided = true;

        this.once('animationcomplete', () => {
            this.setActive(false);
            this.setVisible(false);
            this.setScale(1);

        });
    }
}
