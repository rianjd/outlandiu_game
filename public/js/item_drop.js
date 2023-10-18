export default class CollectableItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, id, type,texture) {
        super(scene, x, y,texture);

        this.id = id;
        this.type = type;
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setScale(0.7); // Defina a escala do objeto coletável
    }
}
