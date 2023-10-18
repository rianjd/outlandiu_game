import Jogador from "./player.js";
import Enemies from "./enemies.js";
import Ogre from "./enemies/ogre.js";
import Wolf from "./enemies/wolf.js";
import Fireball from "./fireball.js";
import CollectableItem from "./item_drop.js";
import Equip from "./equip.js";
import Npc from "./npc.js";
import Farmer from "./npc/farmer.js";
import Fisherman from "./npc/fisherman.js";
import Nomade from "./npc/nomade.js";

export default class World extends Phaser.Scene {
    constructor() {
        super({
            key: 'world'
        })
        this.treeLayer;
        this.distanciaMaximaQuebra = 50; // Defina a distância máxima para quebrar a árvore (ajuste conforme necessário)
        this.direction = 'left';
        this.canHitTree = true;
        this.isAttacking = false;
        this.enemyNoc = false;
        this.showItem = [];
        this.spawnDistance = 1800;
        this.wait = false;
        this.canFarm = true;
        this.isDay = true;

    }

    create() {
        // Crie um sprite de fundo preto para o fade-out
        let blackScreen = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        blackScreen.setDepth(6);
        blackScreen.setScale(2); // Ajuste a escala conforme necessário
        blackScreen.setAlpha(1); // Defina a opacidade total para começar
        // Efeito de fade-out
        this.tweens.add({
            targets: blackScreen,
            alpha: 0, // Opacidade final após o fade-out
            duration: 1000, // Duração do fade-out em milissegundos
            onComplete: () => {
                // Após o fade-out, destrua o sprite de fundo preto
                blackScreen.destroy();
            }
        });

        this.footsteps_grass = this.sound.add('footsteps_grass');
        this.footsteps_rock = this.sound.add('footsteps_rock');
        this.sword_sound = this.sound.add('sword_sound');
        this.sword_kill = this.sound.add('sword_kill');
        this.sword_handle = this.sound.add('sword_handle');
        this.fireball_sound = this.sound.add('fireball_sound');
        this.fireball_explosion = this.sound.add('fireball_explosion');
        this.hit_enemy = this.sound.add('hit_enemy');
        this.hit_player = this.sound.add('hit_player');
        this.health = this.sound.add('health');
        this.error = this.sound.add('error');

        this.chop = this.sound.add('chop');
        this.collectable_item = this.sound.add('collectable_item');

        this.ambient = this.sound.add('ambient');
        this.night = this.sound.add('night');

        this.meuAudio = this.sound.add('song');

        this.meuAudio.play({
            volume: 0.02,
            loop: true // Repetir o áudio
        });

        this.ambient.play({
            volume: .4, // Definir volume (0 a 1)
            loop: true // Repetir o áudio
        });

        this.arvores = this.physics.add.group(); // Grupo para rastrear as árvores
        this.things = this.physics.add.group(); // Grupo para rastrear as árvores
        this.collectableItens = this.physics.add.group(); // Grupo para rastrear as árvores



        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('magecity', 'tileset', 16, 16, 0, 0);
        const snow_houses = map.addTilesetImage('snow_houses', 'snow_houses', 16, 16, 0, 0);
        const tile_grass = map.addTilesetImage('grass', 'tile_grass', 16, 16, 0, 0);
        const tree = map.addTilesetImage('tree_lay', 'tree', 16, 16, 0, 0);
        const house = map.addTilesetImage('houses', 'house_lay', 16, 16, 0, 0);
        const terrain = map.addTilesetImage('terrain', 'terrain', 16, 16, 0, 0);
        const tiletree = map.addTilesetImage('tiletree', 'tiletree', 16, 16, 0, 0);
        const dungeontileset = map.addTilesetImage('dungeontileset', 'dungeontileset', 16, 16, 0, 0);

        // Crie as camadas do tilemap
        const groundLayer = map.createDynamicLayer('Kachelebene 1', [tileset, tile_grass, tiletree],0 ,0 );
        this.groundLayer = groundLayer;
        this.ilumination = map.createDynamicLayer('Ilumination', [dungeontileset],0 ,0 );
        //const npcLayer = map.createDynamicLayer('Npc Things', [tile_grass, tileset],0 ,0 );
        const obstaclesLayer = map.createStaticLayer('Tile Layer 2', [tileset, tile_grass, tree, house, tiletree, snow_houses]);
        this.obstaclesLayer = obstaclesLayer;

        const decorLayer = map.createStaticLayer('Extra', [tileset, tile_grass, snow_houses]);
        const floorLayer = map.createStaticLayer('Floor Thing', [tileset, tile_grass, tree,  house, terrain, tiletree, snow_houses]);
        this.treeLayer = map.createStaticLayer('Tree Layer', [tree, tiletree]);

        // Defina a colisão com as camadas do tilemap
        decorLayer.setCollisionByProperty({ collides: true });
        obstaclesLayer.setCollisionByProperty({ collides: true });
        groundLayer.setCollisionByProperty({ collides: true });
        floorLayer.setCollisionByProperty({ collides: true });
        this.treeLayer.setCollisionByProperty({ collides: true });

        // Redimensione o tamanho da tela do jogo para corresponder ao tamanho do mapa redimensionado
        this.cameras.main.setBounds(0, 0, 8000 , 8000);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.npc = this.physics.add.group();
        this.farmer  = new Farmer(this, 'farmer');
        this.fisherman  = new Fisherman(this, 'fisherman');
        this.nomade  = new Nomade(this, 'nomade');
        this.nomade_g  = new Nomade(this, 'nomade-girl');
        this.player = new Jogador(this);

        const npcLayerWork = map.getObjectLayer('Trabalho');
        const npcLayerSpawn = map.getObjectLayer('Spawn');

        const npcSpawn = npcLayerSpawn.objects.filter(objeto => objeto.type === 'spawn');
        const npcWorks = npcLayerWork.objects.filter(objeto => objeto.type === 'work');

        npcWorks.forEach(obj => {
            let sprite;
            if(obj.name === 'farm'){
                let prp = obj.properties.find(prop => prop.name === 'index');
                sprite = this.things.create(obj.x, obj.y, 'farm-tile'+prp.value);
                sprite.setSize(obj.width, obj.height);
                sprite.setOffset(obj.width/2, obj.height/2);
                sprite.index = prp.value;
                sprite.grow = 0;

            }else{
                sprite =  this.add.rectangle(obj.x +obj.width/2 , obj.y + obj.height/2, obj.width, obj.height, 0x000000, 0);
            }
            sprite.timeout = 0;
            this.things.add(sprite);
        });

        npcSpawn.forEach(obj => {
            const npc = new Npc(this, obj.x, obj.y, obj.name);
            if(obj.name == 'farmer'){
                npc.setScale(.9);
            }
            npc.mainHouse = {x: obj.x, y: obj.y, 'name': obj.name};
            const thing = this.add.rectangle(obj.x +obj.width/2 , obj.y + obj.height/2, obj.width, obj.height, 0x000000, 0);
            thing.npc = npc;
            thing.name = obj.name;
            this.npc.add(npc);
            this.things.add(thing)
        });


        this.enemies = this.physics.add.group();

        this.ogre  = new Ogre(this, 'ogre');
        this.wolf  = new Wolf(this, 'wolf');

        this.enemies.add(new Enemies(this, 1020, 400, 'ogre'));



        floorLayer.depth = 2;
        this.player.sprite.depth = 3;
        obstaclesLayer.depth = 4;
        decorLayer.depth = 5;
        this.ilumination.depth = 3;

        // Inicie a câmera e centralize-a no jogador
        this.cameras.main.startFollow(this.player.sprite);


        this.fireballs = this.physics.add.group({
            classType: Fireball,
            maxSize: 20,
            runChildUpdate: true
        });


        this.physics.add.collider(this.enemies, groundLayer);
        this.physics.add.collider(this.enemies, floorLayer);
        this.physics.add.collider(this.enemies, obstaclesLayer);
        this.physics.add.collider(this.enemies, this.treeLayer);

        this.physics.add.collider(this.npc, groundLayer);
        this.physics.add.collider(this.npc, floorLayer);
        this.physics.add.collider(this.npc, obstaclesLayer);
        this.physics.add.collider(this.npc, this.treeLayer);

        this.physics.add.collider(this.player.sprite, decorLayer);
        this.physics.add.collider(this.player.sprite, obstaclesLayer);
        this.physics.add.collider(this.player.sprite, groundLayer);
        this.physics.add.collider(this.player.sprite, floorLayer);
        this.physics.add.collider(this.player.sprite, this.treeLayer);


        // Substitua os troncos de árvores por sprites de árvores e adicione-os ao grupo de árvores
        this.treeLayer.forEachTile(tile => {
            if (tile.index === 3025) { // Substitua 1697 pelo ID correto do tile das árvores
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                const arvore = this.arvores.create(x, y, 'arvore'); // Substitua 'arvore' pelo nome da imagem das árvores

                arvore.vida = 3; // Defina a vida da árvore para 3 hits
                this.arvores.add(arvore); // Adicione a árvore ao grupo
            }
        });


        // Dentro do método create da cena
        this.walkParticles = this.add.particles('particleGround');
        this.walkEmitter = this.walkParticles.createEmitter({
            speed: { min: 0, max: 20 },
            lifespan: 600,
            scale: { start: 2, end: 0 },
            frequency: 1,
            follow: this.player.sprite,
            followOffset: { x: 0, y: 10 },
            blendMode: 'NORMAL',
            maxParticles:0,
        });
        this.walkEmitter.stop();


    //     this.overlay = this.add.graphics();

    //     this.overlay.fillStyle(0x0C1E42, .8).fillRect(-450, -350, 1800, 1400);

    //     this.maskGraphics = this.make.graphics();
    //     this.maskGraphics.fillStyle(0x3B3BA9).fillCircle(0,0, 100);
    //     this.maskGraphics2 = this.add.image(200, 200, 'mask').setDisplaySize(400,400).setTintFill(0x3B3BA9, 0.6);// 0.8 é a opacidade da cor

    //    // this.maskGraphics = this.add.image(0, 0, 'mask').setDisplaySize(400,400);// 0.8 é a opacidade da cor

    //     this.mask = new Phaser.Display.Masks.BitmapMask(this, this.maskGraphics);
    //     this.mask2 = new Phaser.Display.Masks.BitmapMask(this, this.maskGraphics2);

    //     this.mask.invertAlpha = true;
    //     this.mask2.invertAlpha = true;
    //     this.overlay.setMask(this.mask);
    //     this.overlay.setMask(this.mask2);
    //     this.overlay.setDepth(5);


        this.anims.create({
            key: 'corteArvore',
            frames: this.anims.generateFrameNumbers('choop', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: 0 // Defina como 0 para reproduzir a animação apenas uma vez
        });
        this.anims.create({
            key: 'hit_arvore',
            frames: this.anims.generateFrameNumbers('tree_hit', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: 0 // Defina como 0 para reproduzir a animação apenas uma vez
        });
        this.anims.create({
            key: 'effect_sword',
            frames: this.anims.generateFrameNumbers('effect_sword', { start: 0, end: 9}),
            frameRate: 18,
            repeat: 0 // Defina como 0 para reproduzir a animação apenas uma vez
        });

        this.anims.create({
            key: 'restaurarArvore',
            frames: this.anims.generateFrameNumbers('rechoop', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: 0 // Defina como 0 para reproduzir a animação apenas uma vez
        });



        this.physics.add.overlap(this.player.sprite, this.arvores, this.quebrarArvore, null, this);
        this.physics.add.overlap(this.player.sprite, this.things, this.plantar, null, this);
        this.physics.add.overlap(this.player.sprite, this.collectableItens, this.coletarItem, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-TAB', function(event) {
            console.log('Tecla TAB pressionada no jogo');
        });

        this.fireball = new Fireball(this, 0, 0, 'fireball');
        this.fireball.setActive(false).setVisible(false);

        this.equip = new Equip(this, 0, 0, 'sword_wooden', 'effect_sword');
        this.equip.setActive(false).setVisible(false);

        this.rt = this.make.renderTexture({
            width: 1800,
            height: 1400
        }, true)
        // fill it with black
        this.rt.fill(0x0C1E42, .7)
        this.rt.setTint(0x0a2948)

        this.lights_mask = this.make.container(0, 0);

        // Aplique o filtro de cor à sua máscara

        this.vision = this.make.image({
            x: this.player.sprite.x,
            y: this.player.sprite.y,
            key: 'mask',
            add: false
        })

        this.ilumination.forEachTile(obj => {
            const vision = this.make.image({
                x: obj.getCenterX(),
                y: obj.getCenterY(),
                key: 'mask',
                add: false
            })
            if(obj.index === 21173 ){
                vision.y += 50
                this.lights_mask.add(vision);
            }
            if(obj.index === 21174 ){
                vision.y -= 50
                this.lights_mask.add(vision);
            }


        });
        this.vision.scale = 3
        this.vision.setDepth(5);
        this.lights_mask.setDepth(2);

        this.lights_mask.add( this.vision);
        this.lights_mask.setVisible(false);

        this.rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.lights_mask)
        this.rt.mask.invertAlpha = true

        this.rt.setDepth(5);

        this.time.addEvent({
            delay: 60000,
            callback: this.toggleDayNight,
            callbackScope: this,
            loop: true // Isso fará com que o temporizador continue indefinidamente
        });
        this.rt.setAlpha(0);

    }
    regenerarArvores(arvore) {
        arvore.play('corteArvore');
        this.time.delayedCall(800, () => {
            const rearvore = this.arvores.create(arvore.x, arvore.y, 'arvore');
            rearvore.vida = 3;
            rearvore.setInteractive(); // Torna a árvore interativa
            rearvore.play('restaurarArvore');
            this.arvores.add(rearvore);
        })
    }



    update() {
        // Atualize todos os inimigos na cena
        this.enemies.getChildren().forEach(enemies => {
            enemies.update();
        });

        this.npc.getChildren().forEach(npc => {
            npc.update();
        });

        this.player.update(this.cursors);
        this.fireball.update()
        this.equip.update()
        this.groundLayer.update();
        this.entityController();
        this.removeKey(this.player.sprite, this.things, this.arvores);

        document.getElementById('hungryValue').style.width = this.player.hungryPercentage + '%';
        document.getElementById('healthValue').style.width = ((this.player.healthPercentage * 100) / this.player.playerMaxHealth) + '%';
        document.getElementById('staminaValue').style.width = this.player.staminaPercentage + '%';
        document.getElementById('moneyValue').innerHTML = `${this.player.playerMoney}`;
        document.getElementById('potionValue').innerHTML = `${this.player.healthPotions.quantity}`;
        // // Atualize a posição da máscara para seguir o personagem
        // this.maskGraphics.setPosition(this.player.sprite.x , this.player.sprite.y)
        // this.overlay.setPosition(this.player.sprite.x , this.player.sprite.y)

        if (this.vision)
        {
            this.vision.x = this.player.sprite.x
            this.vision.y = this.player.sprite.y
            if(this.player.sprite.x >= this.cameras.main.width/2){
                this.rt.x = this.cameras.main.scrollX
            }
            if(this.player.sprite.y >= this.cameras.main.height/2){
                this.rt.y = this.cameras.main.scrollY
            }
        }


    }


    toggleDayNight(){
        console.log('chamou')
        if(!this.isDay){
            this.fadeOut(this.night, 10000);

            this.fadeIn(this.ambient, 30000, .4)

            this.isDay = true;
            this.tweens.add({
                targets: this.rt,
                alpha: 0,
                duration: 30000,
                onComplete: this.fadeIn(this.meuAudio, 30000, .02),
                onCompleteScope: this
            });
        }
        else{
            this.fadeOut(this.ambient, 10000);
            this.fadeOut(this.meuAudio, 10000);
            this.fadeIn(this.night, 30000, .4)

            this.isDay = false;
            this.tweens.add({
                targets: this.rt,
                alpha: 1,
                duration: 30000,
                onCompleteScope: this
            });
        }

    }

    fadeOut(element, time){
        this.tweens.add({
            targets: element,
            volume: 0,
            duration: time, // Tempo em milissegundos para o fade-out
            onComplete: function () {
                element.stop(); // Pare o áudio após o fade-out
            },
            onCompleteScope: this
        });

    }

    fadeIn(element, time ,volume){
        element.play({
            volume:0,
            loop: true
        });
        this.tweens.add({
            targets: element,
            volume: volume,
            duration: time,
            onCompleteScope: this
        });
    }


    addCollectable(element,id, type){
        const collectable = new CollectableItem(this, element.x +10, element.y+13, id, type ,`collectable_${id}_texture`);
        this.collectableItens.add(collectable);
    }

    coletarItem( player,collectableItem) {
        var id = collectableItem.id;
        var type = collectableItem.type;
        if(this.player.inventory[id] == null){
            this.player.inventory[id] = {
                'quantity' : 1,
                'type': type,
            };
        }else{
           this.player.inventory[id].quantity ++;
        }
        this.collectable_item.play({
            volume: .8, // Definir volume (0 a 1)
            loop: false // Repetir o áudio
        });
        collectableItem.destroy();
        this.html(id);
        console.log(collectableItem);

    }

    html(id){
        const existingIndex  = this.showItem.findIndex(item => item.item_id === id);
        const existingItem = this.showItem[existingIndex];

        const itemTimeout = setTimeout(() => {
            const afterIndex = this.showItem.findIndex(item => item.item_id === id);
            this.showItem.splice(afterIndex, 1);
            this.removeItem(id);
        }, 4000);


        if (existingIndex !== -1) {
            existingItem.qnt += 1;
            clearTimeout(existingItem.timer);
            this.updateItemQnt(existingItem);
            existingItem.timer = itemTimeout;

        } else {
            const newItem = { item_id: id, qnt: 1, timer: itemTimeout };
            this.showItem.push(newItem);
            if (this.showItem.length > 3) {
                this.showItem.shift();
            }
            this.updateItemDisplay(id);

        }
    }

    removeItem(id){
        const itemRemove = document.getElementById('item'+id);
        itemRemove.remove();
    }

    updateItemDisplay(id) {
        const itemDropContainer = document.getElementById('item_drop');

        const newItemElement = document.createElement('div');
        newItemElement.classList.add('item_div');
        newItemElement.id = 'item'+id;
        newItemElement.innerHTML = `<img class="item_show" src="images/item_64x/item${id}.png" /><p class="item-text" id="text${id}"> x 1</p>`;
        itemDropContainer.appendChild(newItemElement);

    }

    updateItemQnt(index) {
        const itemElement = document.getElementById(`item${index.item_id}`);
        itemElement.classList.remove('item_div');
        void itemElement.offsetWidth;
        itemElement.classList.add('item_div');
        const itemDropQnt = document.getElementById('text'+index.item_id);
        itemDropQnt.innerHTML = ' x ' + index.qnt;
    }
    plantar(player,index){
        if(this.cursors.space.isDown && this.canFarm ){
            if (index.grow === 2 )  {
                if(this.player.inventory[5] == null){
                    this.player.inventory[5] = {
                        'quantity' : 1,
                        'type': 'Material',
                    };

                }else{
                   this.player.inventory[5].quantity ++;
                }
                this.collectable_item.play({
                    volume: .8,
                    loop: false
                });
                index.grow = 0;
                index.setTexture('farm-tile'+index.index);
                this.html(5);

            }else{
                console.log('Too early');
            }
            this.canFarm = false;
            this.time.delayedCall(300, () => {
                this.canFarm = true;

            })
        }
        if(!this.player.overlaping){
            this.player.overlaping = true;
            const keyDiv = document.getElementById('keydown');
            keyDiv.classList.add('key_show');
        }


    }

    removeKey(player, things, arvores){
        if (this.player.overlaping ) {
            if(!this.physics.overlap(player, things) &&  !this.physics.overlap(player, arvores) ){
                const keyDiv = document.getElementById('keydown');
                keyDiv.classList.remove('key_show');
                this.player.overlaping = false;
            }
        }

    }
    // Crie a função para quebrar a árvore:
    quebrarArvore(player, arvore) {
        let socoDelay = 1000;
        const distancia = Phaser.Math.Distance.Between(player.x, player.y, arvore.x  , arvore.y);
        let isSocoAnimPlaying = false;
        if(!this.player.overlaping){
            this.player.overlaping = true;
            const keyDiv = document.getElementById('keydown');
            keyDiv.classList.add('key_show');
        }
        if (distancia <= this.distanciaMaximaQuebra && this.cursors.space.isDown && this.canHitTree)  {

            this.canHitTree = false;
            isSocoAnimPlaying = true;
            this.isAttacking = true;
            this.chop.play({
                volume: .4, // Definir volume (0 a 1)
                loop: false // Repetir o áudio
            });
            player.anims.play('punch-' + this.direction, true);
            arvore.anims.play('hit_arvore', true);


            arvore.vida -= 10;

            if (arvore.vida <= 0) {
                arvore.play('corteArvore');

                arvore.once('animationcomplete', () => {
                    this.addCollectable(arvore,1,'Material');
                })

                this.time.delayedCall(socoDelay, () => {
                    isSocoAnimPlaying = false;
                    arvore.body.enable = false;
                    arvore.setAlpha(0);
                    this.canHitTree = true;
                    this.isAttacking = false;

                    // Adicione a chamada para regenerar as árvores após 10 segundos
                    this.time.addEvent({
                        delay: 1000 * 60,
                        callback: this.regenerarArvores,
                        args: [arvore],
                        callbackScope: this
                    });

                }, null, this);
            } else {

                this.time.delayedCall(socoDelay, () => {
                    isSocoAnimPlaying = false;
                    this.canHitTree = true;
                    this.isAttacking = false;
                }, null, this);
            }

        }

    }

    entityController(){
        this.enemies.getChildren().forEach(enemy => {
            const distanceToPlayer = Phaser.Math.Distance.Between(
                enemy.x, enemy.y,
                this.player.sprite.x, this.player.sprite.y
            );
            if (distanceToPlayer > 2000) {
                enemy.destroy();
                enemy.lifeBarEmpty.destroy();
                enemy.lifeBarFull.destroy();
                this.spawnEnemy();
            }
        });
        this.things.getChildren().forEach(obj => {
            if(obj.npc){
                const distanceToPlayer = Phaser.Math.Distance.Between(
                obj.npc.x, obj.npc.y,
                this.player.sprite.x, this.player.sprite.y
                );
                if (distanceToPlayer > 1500) {
                    if(obj.npc.isActive == true){
                        obj.npc.isActive = false;
                        obj.npc.destroy();
                        console.log('Destruiu NPC')
                    }

                }
                if (distanceToPlayer < 1200) {
                    if(obj.npc.isActive == false){
                        let thing =  new Npc(this, obj.x, obj.y, obj.name);
                        thing.mainHouse = {x: obj.x, y: obj.y, 'name': obj.name};
                        this.npc.add(thing);
                        console.log('Criou NPC')
                        obj.npc.isActive = true;
                    }


                }
            }

        });
    }

    positionEnemy(){
        let spawnX = this.player.sprite.x + Phaser.Math.Between(-this.spawnDistance, this.spawnDistance);
        let spawnY = this.player.sprite.y + Phaser.Math.Between(-this.spawnDistance, this.spawnDistance);
        if(spawnX < 0){
            spawnX *= -1;
        }
        if(spawnY < 0){
            spawnY *= -1;
        }
        let tileX = Math.floor(spawnX / 16);
        let tileY = Math.floor(spawnY / 16);
        let tile = this.groundLayer.getTileAt(tileX, tileY);

        return tile;


    }

    spawnEnemy() {
       let tile = this.positionEnemy();
       if(tile != null){
            while(tile.properties.type != 'grass' && tile.properties.type != 'snow'){
                tile = this.positionEnemy();

            }

            if (this.enemies.getLength() < 6) {
                if(tile.properties.type == 'grass'){
                    this.enemies.add(new Enemies(this, tile.pixelX, tile.pixelY, 'ogre'));
                }
                if(tile.properties.type == 'snow'){
                    this.enemies.add(new Enemies(this, tile.pixelX, tile.pixelY, 'wolf'));
                }
            }
       }

    }


}
