export default class Equip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, equip, effect_sword) {
        super(scene, x, y, equip);

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.damage = 10;

        this.speed = 0;
        this.direction = '';
        this.inScene = false;
        this.angle0 = 90;
        this.setScale(.6)
        this.effect = this.scene.physics.add.sprite(x, y, 'effect_sword');
        this.effect.setActive(false).setVisible(false);
        this.effect.setScale(0.5);


    }

    golpe(player, x, y, direction) {
        if (!this.inScene) {

            this.scene.isAttacking = true;

            const offsets = {
                left: { x: 0, y: 48, angle: -180, flipX: true, flipY: false, offset: { x: -5, y: 10 }},
                right: { x: 48, y: 48, angle: 180, flipX: false, flipY: false, offset: { x: 5, y: 10 }},
                up: { x: 0, y: 0, angle: -230, flipY: true, flipX: true, offset: { x: 0, y: -10 }, depth:2},
                down: { x: 0, y: 48, angle: 230, flipY: false, flipX: true, offset: { x: 0, y: 10 }}
            };

            const e_offsets = {
                left: {rotation:0, w: 48, h: 180, x: -6, y: 0, flipX: false, flipY: false, offset: { x: 20, y: 0}},
                right: {rotation:0, w: 48, h: 180, x: 6, y: 0, flipX: true, flipY: false,offset: { x: 60, y: 0}},
                up: {rotation:90, w: 180, h: 48, x: 0, y: -10, flipX: false, flipY: false,offset: { x: -6, y: 60}},
                down: {rotation:-90, w: 180, h: 48, x: 0, y: 15, flipX: false, flipY: true, offset: { x: 0, y: 140 }}
            };
            if (direction in offsets) {
                const offset = offsets[direction];
                const e_offset = e_offsets[direction];

                this.setFlipX(offset.flipX);
                this.setFlipY(offset.flipY);
                this.angle0 = offset.angle;
                this.setDepth(offset.depth || 4);
                this.setOrigin(offset.x / this.width, offset.y / this.height);
                if (offset.offset) {
                    this.setOffset(offset.offset.x, offset.offset.y);
                }
                this.effect.setDepth(2);
                this.effect.setRotation(Phaser.Math.DegToRad(e_offset.rotation))
                this.effect.setSize(e_offset.w,e_offset.h)
                this.effect.setFlipX(e_offset.flipX);
                this.effect.setFlipY(e_offset.flipY);
                if (e_offset.offset) {
                    this.effect.setOffset(e_offset.offset.x, e_offset.offset.y);
                }
                player.sprite.anims.play('sword-' + direction, true);

                this.scene.time.delayedCall(600, () => {
                    this.enableBody(true, x + offset.offset.x, y + offset.offset.y, true, true);
                    this.effect.enableBody(true, x +  (4*e_offset.x), y + e_offset.y, true, true);
                    this.effect.anims.play('effect_sword');
                    this.effect.setDepth(1);

                    this.scene.tweens.add({
                        targets: this,
                        angle: this.angle0,
                        duration: 300,
                        ease: 'Cubic',
                        yoyo: false,
                        onComplete: () => {
                            this.angle = 0;
                            this.setActive(false).setVisible(false).disableBody();
                            this.effect.setActive(false).setVisible(false).disableBody();
                        }
                    });
                });

                this.scene.time.delayedCall(1000, () => {
                    this.inScene = false;
                    this.scene.isAttacking = false;
                });

                player.takeStamina(1);
            }
        }
    }

    update() {
        this.scene.enemies.getChildren().forEach(enemy => {
            this.overlap = this.scene.physics.overlap(this.effect, enemy);
            if (this.overlap && !this.scene.enemyNoc) {
                enemy.takeDamage(this.scene.player.attack);
                this.effect.disableBody();

            }
        });
        this.scene.boss.getChildren().forEach(boss => {
            this.overlap = this.scene.physics.overlap(this.effect, boss);
            if (this.overlap && !this.scene.enemyNoc) {
                boss.takeDamage(this.scene.player.attack);
                this.effect.disableBody();

            }
        });
    }
}
