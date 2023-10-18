import World from './world.js';
import Carregamento from './load.js';

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    parent: 'rpg',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // Defina como true para visualizar as colisões

        }
    },
    scene: [
        Carregamento,
        World,

    ],

};


const game = new Phaser.Game(config);
window.onerror = function (message, source, lineno, colno, error) {
    console.error(error);
    game.destroy(true); // O segundo parâmetro (true) indica que o jogo será removido completamente
    // Aqui você pode implementar a lógica para mostrar uma mensagem de erro ou tela de falha
};

let paused = false;
let inventory_o = false;
let html = '';

$('.pause-game').on('click', function(){
    if(inventory_o){
        $('.inventory').removeClass('active');
        $('.inventory_equip').removeClass('active');
        $('.back-menu').removeClass('active');
        inventory_o = false;
        html = '';
    }
    else if (paused ){
        game.scene.scenes[1].scene.resume();
        paused = false;
        $('.pause-menu').removeClass('active');
        $('#save').removeClass('saved');
        $('.back-menu').removeClass('active');
    }else{
        game.scene.scenes[1].scene.pause();
        paused = true;
        $('.pause-menu').addClass('active');
        $('.back-menu').addClass('active');

    }
})

var _token = $('meta[name="csrf_token"]').attr('content');

$('#save').on('click', function(){

    var data = {
        'playerX' : game.scene.scenes[1].player.sprite.x,
        'playerY' : game.scene.scenes[1].player.sprite.y,
        'health' : game.scene.scenes[1].player.healthPercentage,
        'inventory': game.scene.scenes[1].player.inventory,
        '_token': _token
    }

    $.post("/game/save_game", data,
        (result) => {
            if(result = 'success'){
                $('#save').addClass('saved')
            }
        }
    );
})


$(document).on('keydown', function(event) {
    if (event.key === 't' || event.key === 'T') {
        if (paused ){
            game.scene.scenes[1].scene.resume();
            paused = false;
            $('.pause-menu').removeClass('active');
            $('#save').removeClass('saved');
            $('.back-menu').removeClass('active');
        }
        if(inventory_o ){
            $('.inventory').removeClass('active');
            $('.inventory_equip').removeClass('active');
            $('.back-menu').removeClass('active');
            inventory_o = false;
            html = '';

            console.log(game.scene.scenes[1].player.inventory)
        }else{
            $('.inventory').addClass('active');
            $('.back-menu').addClass('active');
            inventory_o = true;
            for (const key in game.scene.scenes[1].player.inventory) {
                if(key != 15){
                   const value = game.scene.scenes[1].player.inventory[key].quantity;
                    html += `<div class="item" id="${key}"><img src="/images/item_64x/item${key}.png"><span>${value}</span></div>`;
                }

            };
            $('.inventory .row').html(html); // Insira todo o HTML acumulado na div


        }

    }
});

$('.prox').on('click', function() {

        $('.inventory_equip').addClass('active');
        $('.inventory').removeClass('active');
        $('.inventory').html();

        inventory_o = true;
        html = '';
        for (const key in game.scene.scenes[1].player.equip[0]) {
            const value = game.scene.scenes[1].player.equip[0][key];
            console.log(value)
            if(value != null){
                html = `<img src="/images/item_64x/item${value}.png">`
                $(`#${key}`).html(html); // Insira todo o HTML acumulado na div
            }
        };


});

$('.ant').on('click', function() {
    console.log('teste')
    $('.inventory_equip').removeClass('active');
    $('.inventory').addClass('active');
    $('.back-menu').addClass('active');
    for (const key in game.scene.scenes[1].player.inventory) {
        if(key != 15){
            const value = game.scene.scenes[1].player.inventory[key].quantity;
            html += `<div class="item" id="${key}"><img src="/images/item_64x/item${key}.png"><span>${value}</span></div>`;
        }

    };
    $('.inventory .row').html(html); // Insira todo o HTML acumulado na div


});
