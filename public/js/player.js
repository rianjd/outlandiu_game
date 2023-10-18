export default class Jogador {
    constructor(cena) {
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(playerX, playerY, playerSpecie);
        this.sprite.setCollideWorldBounds(true);

        this.playerMaxHealth = playerMaxHealth;
        this.healthPercentage = playerHealth;
        this.attack = playerAttack;
        this.defense = playerDefense;
        this.power = playerPower;
        this.attackSpeed = playerAttackSpeed;
        this.inventory = inventoryCache;
        this.equip = equipGet;
        this.repeat = 0;

        this.healthPotions = inventoryCache[15];
        this.playerMoney = playerMoney;
        this.playerLevel = playerLevel;
        this.playerXp = playerXp;
        this.hungerDecayRate = 1;
        this.hungryPercentage = 100;
        this.staminaPercentage = 100;

        this.startHungerDecay();

        if(playerSpecie == 'dragon' || playerSpecie == 'fairy'){
            this.sprite.setSize(32, 20);
            this.sprite.setOffset(32, 20);
            this.repeat = -1;
        }
        else if(playerSpecie == 'dude'){
            this.sprite.setSize(24, 16);
            this.sprite.setOffset(4, 16);
            this.sprite.setScale(1);
        }
        else{
            this.sprite.setSize(24, 24);
            this.sprite.setOffset(12, 24);
            this.sprite.setScale(.7);
        }


        // Distância mínima para quebrar a árvore (ajuste conforme necessário)
        this.distanciaQuebra = 32;
        this.isNoc = false;
        this.isMoving = false;
        this.realLand = '';
        this.isDodge = false;
        this.overlaping = false;


        cena.anims.create({
            key: 'left',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 3, end: 5 }),
            frameRate: 6,
            repeat: this.repeat
        });

        cena.anims.create({
            key: 'up',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 9, end: 11 }),
            frameRate: 6,
            repeat: this.repeat
        });

        cena.anims.create({
            key: 'down',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 0, end: 2 }),
            frameRate: 6,
            repeat: this.repeat
        });

        cena.anims.create({
            key: 'turn',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 0, end:0}),
            frameRate: 6,
            repeat: this.repeat
        });

        cena.anims.create({
            key: 'fly',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 0, end:2}),
            frameRate: 6,
            repeat: this.repeat
        });

        cena.anims.create({
            key: 'right',
            frames: cena.anims.generateFrameNumbers(playerSpecie, { start: 6, end: 8 }),
            frameRate: 6,
            repeat: this.repeat
        });
        cena.anims.create({
            key: 'punch-left',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 0, end: 6 }),
            frameRate: 6 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'punch-right',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 7, end: 13 }),
            frameRate: 6 ,
            repeat: 0,
        });
        cena.anims.create({
            key: 'sword-left',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 29, end: 34 }),
            frameRate: 6 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'sword-right',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 35, end: 41 }),
            frameRate: 6 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'range-left',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 0, end: 6 }),
            frameRate: 10 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'range-right',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 7, end: 13 }),
            frameRate: 10 ,
            repeat: 0,
            flipX: true   ,
        });

        cena.anims.create({
            key: 'golpe-left',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-atack', { start: 0, end: 5 }),
            frameRate: 8 ,
            repeat: 0
        });

        cena.anims.create({
            key: 'golpe-right',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-atack', { start: 6, end: 11 }),
            frameRate: 8 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'golpe-up',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-atack', { start: 18, end: 23 }),
            frameRate: 8 ,
            repeat: 0
        });

        cena.anims.create({
            key: 'golpe-down',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-atack', { start: 12, end: 17 }),
            frameRate: 8 ,
            repeat: 0
        });

        cena.anims.create({
            key: 'noc-right',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 21, end: 22 }),
            frameRate: 10 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'noc-left',
            frames: cena.anims.generateFrameNumbers(playerSpecie +'-fight', { start: 28, end: 29 }),
            frameRate: 10 ,
            repeat: 0
        });

        cena.anims.create({
            key: 'effect_healing',
            frames: cena.anims.generateFrameNumbers('healing', { start: 0, end: 10 }),
            frameRate: 15 ,
            repeat: 0
        });

        cena.anims.create({
            key: 'effect_dash',
            frames: cena.anims.generateFrameNumbers('dash_smoke', { start: 0, end: 8 }),
            frameRate: 10 ,
            repeat: 0
        });
        cena.anims.create({
            key: 'effect_dash_top',
            frames: cena.anims.generateFrameNumbers('dash_smoke_top', { start: 0, end: 8 }),
            frameRate: 10 ,
            repeat: 0
        });

        this.soundMappings = {
            grass: this.cena.footsteps_grass,
            rock: this.cena.footsteps_rock,
            // Adicione mais mapeamentos de som conforme necessário
        };

    }


    update(cursors){
        const player = this.sprite;
        const tileX = Math.floor(player.x / 16);
        const tileY = Math.floor(player.y / 16);

        if(!this.cena.isAttacking && !this.isNoc){

            let velocityX = 0;
            let velocityY = 0;
            let animDirection = this.cena.direction;

            if (cursors.left.isDown) {
                velocityX = -playerSpeed;
                this.cena.direction = 'left';
            } else if (cursors.right.isDown) {
                velocityX = playerSpeed;
                this.cena.direction = 'right';
            } else if (cursors.up.isDown) {
                velocityY = -playerSpeed;
                this.cena.direction = 'up';
            } else if (cursors.down.isDown) {
                velocityY = playerSpeed;
                this.cena.direction = 'down';
            } else {

                this.isMoving = false;
                this.stopAllFootstepSounds()
                player.setVelocityX(0);
                player.setVelocityY(0);
                animDirection = '';
            }

            player.setVelocityX(velocityX);
            player.setVelocityY(velocityY);

            if (animDirection !== '') {

                //this.cena.walkEmitter.start();
                this.hungerDecayRate = 3;
                const playerTile = this.cena.groundLayer.getTileAt(tileX, tileY).properties.type;
                this.direction = this.cena.direction;
                player.anims.play(this.cena.direction, true);
                this.moving(playerTile);
            } else {
                //this.cena.walkEmitter.stop();
                this.hungerDecayRate = 1;
                player.setVelocityX(0);
                player.setVelocityY(0);
            }

            const qKey = this.cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
            if (Phaser.Input.Keyboard.JustDown(qKey) && this.staminaPercentage >= 50) {
                player.anims.stop;
                this.cena.fireball.fire(this,player.x, player.y, this.cena.direction);
            }
            const  eKey = this.cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            if (Phaser.Input.Keyboard.JustDown(eKey) && this.staminaPercentage >= 10) {
                player.anims.stop;
                this.cena.time.delayedCall(250, () => {

                    this.cena.sword_sound.play({volume: .2, loop: false });
                });
                this.cena.equip.golpe(this,player.x, player.y, this.cena.direction);
            }
            const cKey = this.cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
            if (Phaser.Input.Keyboard.JustDown(cKey)) {
                player.anims.stop;
                this.curePlayer('max');
            }

            const shiftKey = this.cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            if (Phaser.Input.Keyboard.JustDown(shiftKey)) {
                player.anims.stop;
                this.playerDash(velocityX,velocityY);
            }


        }else {
            this.hungerDecayRate = 1;
            player.anims.stop;
            this.stopAllFootstepSounds()
            player.setVelocityX(0);
            player.setVelocityY(0);
        }
    }

    moving(playerTile){
        if (this.realLand != playerTile) {
            this.isMoving = false;
            this.realLand = playerTile;
        }
        if(playerTile == 'grass' && !this.isMoving){
            this.isMoving = true;
            this.soundMappings['rock'].stop();
            this.soundMappings[playerTile].play({volume: .1, loop: true });
        }
        else if(playerTile == 'rock' && !this.isMoving){
            this.isMoving = true;
            this.soundMappings['grass'].stop();
            this.soundMappings[playerTile].play({volume: .1, loop: true });
        }
    }

    stopAllFootstepSounds() {
        for (const sound of Object.values(this.soundMappings)) {
            sound.stop();
        }
    }

    regen(){
        this.health += 2 * Math.floor((this._maxHealth - this.health
            ) / 4 );

    }

    playerDash(vx,vy){
        if (!this.isDodge) {
            this.cena.cameras.main.stopFollow();
            this.directionDash(vx,vy);

            this.isDodge = true;
            this.sprite.setVelocityX(vx * 15);
            this.sprite.setVelocityY(vy * 15);


            setTimeout(() => {
                this.moveCameraSmoothly();
                this.sprite.setVelocityX(vx);
                this.sprite.setVelocityY(vy);

            }, 500);

            setTimeout(() => {
                this.isDodge = false;
            }, 3000);
        }

    }

    directionDash(vx,vy){
        if(vx != 0){
            this.dash = this.cena.physics.add.sprite(this.sprite.x, this.sprite.y, 'dash_smoke');
            this.dash.setFlipX(false);
            this.dash.setFlipY(false);
            if(vx < 0){
                this.dash.setFlipX(true);
            }
            this.dash.anims.play('effect_dash', true);
            setTimeout(() => {
                this.dash.destroy();
            }, 500);

        }else if(vy != 0){
            this.dash_top = this.cena.physics.add.sprite(this.sprite.x, this.sprite.y, 'dash_smoke_top');
            this.dash_top.setFlipX(false);
            this.dash_top.setFlipY(false);

            if(vy < 0){
              this.dash_top.setFlipY(true);
            }
            this.dash_top.anims.play('effect_dash_top', true);
            setTimeout(() => {
                this.dash_top.destroy();
            }, 500);
        }



    }

    moveCameraSmoothly() {
        const duration = 400; // Duração da transição em milissegundos
        const endX = this.sprite.x - this.cena.cameras.main.width / 2;
        const endY = this.sprite.y - this.cena.cameras.main.height / 2;

        this.cena.tweens.add({
            targets: this.cena.cameras.main,
            scrollX: endX,
            scrollY: endY,
            duration: duration,
            ease: Phaser.Math.Easing.SmoothStep,
            onComplete: () => {
                const newX = this.sprite.x - this.cena.cameras.main.width / 2;
                const newY = this.sprite.y - this.cena.cameras.main.height / 2;
                const distance = Phaser.Math.Distance.Between(newX, newY, endX, endY);
                if (distance > 10) {
                    this.moveCameraSmoothly();
                } else {
                    this.moveCamera();
                }
            }
        });
    }

    moveCamera() {
        this.cena.cameras.main.startFollow(this.sprite);
    }

    curePlayer(cure){
        if(this.healthPotions > 0){
            this.cena.health.play({volume: .6, loop: false });

            this.healthPotions --
            this.isNoc = true;
            this.healing = this.cena.physics.add.sprite(this.sprite.x, this.sprite.y -10, 'healing');
            this.healing.setDepth(4);
            this.healing.setScale(1.3);
            this.healing.anims.play('effect_healing');
            this.cena.time.delayedCall(700, () => {
                this.isNoc = false;
                this.healing.destroy();
                if(cure == "max"){
                    this.healthPercentage = this.playerMaxHealth;
                }else{
                    this.healthPercentage += cure;
                }
            })
        }else{
            this.cena.error.play({volume: .6, loop: false });
        }

    }

    combate(player, enemy){

        let attackDuration = this.attackSpeed;
        if (!this.cena.isAttacking )  {
            this.cena.isAttacking = true;
            enemy.takeDamage(this.attack);
            this.cena.time.delayedCall(attackDuration, () => {
                player.anims.play(this.cena.direction);
                this.cena.isAttacking = false;
                this.isMoving = false;
            }, null, this);
            this.takeStamina(3);
        }
    }

    takeStamina(qnt){
        this.staminaPercentage -= qnt;
        const recarga = this.staminaPercentage;
        this.cena.time.delayedCall(10000, () => {
            if(recarga == this.staminaPercentage){
                this.staminaPercentage = 100;
            }
        })

    }

    takeDamage(damage, enemy){
       if(!enemy.enemyNoc && !this.cena.isAttacking){
            this.healthPercentage -= damage - (this.defense / 10);
            if(this.healthPercentage <= 0){
                this.die() ;
            }
            this.isNoc = true;
            this.cena.hit_player.play({volume: 1, loop: false });
            this.sprite.anims.play('noc-'+this.cena.direction,true);
            this.sprite.once('animationcomplete', () => {
                this.sprite.anims.play('turn',true);
            })

            document.getElementById('effect').style.opacity = 1;

            this.cena.time.delayedCall(200, () => {
                this.isNoc = false;
                document.getElementById('effect').style.opacity = 0;

            })
       }


    }

    startHungerDecay() {
        setInterval(() => {
            this.decreaseHunger(this.hungerDecayRate);
        }, 10000); // A cada segundo
    }

    decreaseHunger(amount) {
        this.hungryPercentage -= amount;
        if (this.hungryPercentage < 0) {
            this.hungryPercentage = 0;
        }
        }

    die(){
        //TODO: Adicionar animação de morte e resetar o personagem para

    }
}
