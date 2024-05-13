export default class Carregamento extends Phaser.Scene{
    constructor(){
        super({
            key:'carregamento'
        })
    }
    preload (){
        console.log("Carregando recursos...");

        if(playerSpecie == 'dragon'){
            this.load.spritesheet(`${playerSpecie}`, `/assets/images/player/${playerSpecie}.png`,{ frameWidth: 96, frameHeight: 48 });
            this.load.spritesheet(`${playerSpecie}-fight`, `/assets/images/player/${playerSpecie}-fight.png`,{ frameWidth: 96, frameHeight: 48 });
            this.load.spritesheet(`${playerSpecie}-atack`, `/assets/images/player/${playerSpecie}-atack.png`,{ frameWidth: 112, frameHeight: 56 });

        }else if(playerSpecie == 'dude'){
            this.load.spritesheet(`${playerSpecie}`, `/assets/images/player/${playerSpecie}.png`,{ frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet(`${playerSpecie}-fight`, `/assets/images/player/${playerSpecie}-fight.png`,{ frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet(`${playerSpecie}-atack`, `/assets/images/player/${playerSpecie}-atack.png`,{ frameWidth: 48, frameHeight: 48 });
        }
        else{
            this.load.spritesheet(`${playerSpecie}`, `/assets/images/player/${playerSpecie}.png`,{ frameWidth: 48, frameHeight: 48 });
            this.load.spritesheet(`${playerSpecie}-fight`, `/assets/images/player/${playerSpecie}-fight.png`,{ frameWidth: 48, frameHeight: 48 });
            this.load.spritesheet(`${playerSpecie}-atack`, `/assets/images/player/${playerSpecie}-atack.png`,{ frameWidth: 64, frameHeight: 64 });
        }

        this.load.spritesheet('bear', '/assets/images/bear.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ogre', '/assets/images/enemies/ogre.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('minotaur', '/assets/images/boss/minotaur.png',{ frameWidth: 96, frameHeight: 96 });

        this.load.spritesheet('wolf', '/assets/images/enemies/wolf.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('fireball', '/assets/images/fireball.png',{ frameWidth: 64, frameHeight: 24 });
        this.load.spritesheet('farmer', '/assets/images/npc/farmer.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fisherman', '/assets/images/npc/fisherman.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('nomade', '/assets/images/npc/nomade.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('nomade-girl', '/assets/images/npc/nomade-girl.png',{ frameWidth: 32, frameHeight: 32 });

        this.load.image('collectable_1_texture', '/assets/images/collectable_arvore_texture.png');
        this.load.image('collectable_4_texture', '/assets/images/collectable_leather_texture.png');
        this.load.image('collectable_5_texture', '/assets/images/collectable_trigo_texture.png');

        this.load.spritesheet('particleGround', '/assets/images/particleGround.png',{ frameWidth: 12, frameHeight: 12 });

        this.load.image('sword_wooden', '/assets/images/sword_wooden.png');
        this.load.spritesheet('effect_sword', '/assets/images/effect_sword.png',{ frameWidth: 128, frameHeight: 256 });
        this.load.spritesheet('healing', '/assets/images/healing.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('dash_smoke', '/assets/images/dash_smoke.png',{ frameWidth: 48, frameHeight: 32 });
        this.load.spritesheet('dash_smoke_top', '/assets/images/dash_smoke_top.png',{ frameWidth: 48, frameHeight: 32 });

        this.load.image('lifeBarFull', '/assets/images/gui/lifeBarFull.png');
        this.load.image('lifeBarEmpty', '/assets/images/gui/lifeBarEmpty.png');
        this.load.image('lifeBarFrame', '/assets/images/gui/lifeBarFrame.png');
        this.load.image('lifeBarlg', '/assets/images/gui/lifeBarlg.png');
        this.load.image('lifeBarFramelg', '/assets/images/gui/lifeBarFramelg.png');
        this.load.image('background', '/assets/images/background_load.png');
        this.load.image('mask', '/assets/images/mask1.png');

        this.load.image('farm-tile1', '/assets/images/farm/farm-tile1.png');
        this.load.image('farm-tile2', '/assets/images/farm/farm-tile2.png');
        this.load.image('farm-tile3', '/assets/images/farm/farm-tile3.png');
        this.load.image('grow-tile1', '/assets/images/farm/grow-tile1.png');
        this.load.image('grow-tile2', '/assets/images/farm/grow-tile2.png');
        this.load.image('grow-tile3', '/assets/images/farm/grow-tile3.png');
        this.load.image('last-tile1', '/assets/images/farm/last-tile1.png');
        this.load.image('last-tile2', '/assets/images/farm/last-tile2.png');
        this.load.image('last-tile3', '/assets/images/farm/last-tile3.png');
        this.load.image('door', '/assets/images/door.png');

        this.load.tilemapTiledJSON('map', '/assets/images/TilesetGrass/map1.json');
        this.load.image('tileset', '/assets/images/TilesetGrass/magecity.png');
        this.load.image('snow_houses', '/assets/images/snow_houses.png');

        this.load.image('terrain', '/assets/images/terrain.png');
        this.load.image('tiletree', '/assets/images/tiletree.png');

        this.load.image('tile_grass', '/assets/images/TilesetGrass/grass.png');
        this.load.image('dungeontileset', '/assets/images/dungeontileset.png');
        this.load.image('tree', '/assets/images/tree.png');
        this.load.image('house_lay', '/assets/images/house.png');
        this.load.image('arvore', '/assets/images/tree1.png');
        this.load.spritesheet('choop', '/assets/images/choop.png', { frameWidth: 36, frameHeight: 44 });
        this.load.spritesheet('rechoop', '/assets/images/rechoop.png', { frameWidth: 36, frameHeight: 44 });
        this.load.spritesheet('tree_hit', '/assets/images/tree_hit.png', { frameWidth: 46, frameHeight: 58 });

        this.load.audio('song', 'assets/audio/ambient/song.mp3');
        this.load.audio('night', 'assets/audio/ambient/night-ambience.mp3');
        this.load.audio('health', 'assets/audio/world/health.wav');
        this.load.audio('error', 'assets/audio/world/error.wav');

        this.load.audio('ambient', 'assets/audio/ambient/ambient.wav');
        this.load.audio('footsteps_grass', 'assets/audio/world/footsteps_grass.wav');
        this.load.audio('footsteps_rock', 'assets/audio/world/footsteps_rock.wav');
        this.load.audio('chop', 'assets/audio/world/chop.wav');
        this.load.audio('collectable_item', 'assets/audio/world/collectable_item.wav');

        this.load.audio('sword_kill', 'assets/audio/fight/sword_kill.wav');
        this.load.audio('sword_handle', 'assets/audio/fight/sword_handle.wav');
        this.load.audio('sword_sound', 'assets/audio/fight/sword_swoosh.mp3');
        this.load.audio('knife_swoosh', 'assets/audio/fight/knife_swoosh.wav');
        this.load.audio('knife_hit', 'assets/audio/fight/knife_hit.wav');
        this.load.audio('fireball_sound', 'assets/audio/fight/fireball_sound.mp3');
        this.load.audio('fireball_explosion', 'assets/audio/fight/fireball_explosion.mp3');
        this.load.audio('hit_enemy', 'assets/audio/fight/hit_damage.mp3');
        this.load.audio('hit_player', 'assets/audio/player/hit_player.mp3');

        this.load.audio('wolf_roar', 'assets/audio/enemies/wolf_roar.wav');
        this.load.audio('ogre_roar', 'assets/audio/enemies/ogre_roar.mp3');

        console.log("Carregando tilemap...");

        let loading = $('#loading-page')
        let gui = $('#gyui')


        this.load.on('complete', () => {
            console.log("carregou")
            loading.css('opacity','0')
            gui.css('opacity','1')
            this.scene.start('world'); // Inicia a cena principal após o fade-out
        })
    }

    create (){

    }
    update(){

    }

}
