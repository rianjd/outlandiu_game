<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf_token" content="{{ csrf_token() }}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha512-U6K1YLIFUWcvuw5ucmMtT9HH4t0uz3M366qrF5y4vnyH6dgDzndlcGvH/Lz5k8NFh80SN95aJ5rqGZEdaQZ7ZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap">
    <link rel="stylesheet" href="{{URL::asset('css/game.css')}}">

    <script>

        const playerX = {{ $playerX }};
        const playerY = {{ $playerY }};
        const playerSpecie = '{{ $player["species"] }}';
        const playerSpeed = {{ $player['speed'] }};
        //const playerSpeed = 400;
        const playerHealth = {{ $player['health'] }};
        const playerMaxHealth = {{ $player['max_health'] }};
        const playerAttack = {{ $player['attack'] }};
        const playerAttackSpeed = {{ $player['attack_spd'] }};
        const playerDefense = {{ $player['defense'] }};
        const playerLevel = {{ $player['level'] }};
        const playerMoney = {{ $player['money'] }};
        const playerXp = {{ $player['xp'] }};
        const playerPower = {{ $player['power'] }};

        const inventoryGet = {!! json_encode($inventory) !!};
        let inventoryCache = [];
        inventoryGet.forEach(element => {
            inventoryCache[`${element.item_id}`] = {quantity : element.quantity, type: element.type};
        });
        console.log(inventoryCache);
        const equipGet = {!! json_encode($equip) !!};
        const invEquip = {!! json_encode($inventory_equip) !!};


    </script>
    <title>Jogo</title>
</head>

<body style="background: #161927;">
    <div class="borda-ouro">
        <div id="effect"></div>
        <div class="menu pause-menu">
            <ul>
                <li id="options">
                    Options
                </li>
                <li id="menu">
                    Menu
                </li>
                <li id="save">
                    Save
                </li>
                <li class="pause-game" id="resume">
                    Resume
                </li>
            </ul>
        </div>
        <div class="inventory">
            <div class="stats">
                <div class="stats_row">
                    <img src="images/gui/coin.png" alt="">
                    <div id="moneyValue">
                        0
                    </div>
                </div>
                <div class="stats_row">
                    <img src="images/gui/life_potion.png" alt="">
                    <div id="potionValue">
                        0
                    </div>
                </div>
                <div class="stats_row">
                    <img src="images/gui/rubi.png" alt="">
                    <div id="gemsValue">
                        0
                    </div>
                </div>

            </div>
            <div class="prox">
                <img src="images/gui/seta.png" alt="">
            </div>
            <div class="row" style="margin: 83px 29px 10px 29px">

            </div>
        </div>
        <div class="inventory_equip">
            <div class="stats_equip">
                <div class="stats_row">
                    <div id="">
                        0
                    </div>
                </div>
                <div class="stats_row">
                    <div id="">
                        0
                    </div>
                </div>
                <div class="stats_row">-
                    <div id="">
                        0
                    </div>
                </div>

            </div>
            <div class="ant">
                <img src="images/gui/wheat.png" alt="">
            </div><div class="row_equip"  style="margin: 153px 29px 10px 29px">
            </div>
            <div class="row_single" style="margin: 83px 0px 10px 0px"></div>
            <div class="row_double"  style="margin: 83px 0px 10px 0px">
            </div>





        </div>
        <div id="rpg">
            <div class="back-menu pause-game">
            </div>
            <img class="moldura_life" src="images/life.png" width="150" alt="">
            <img class="pause pause-game"  src="images/gui/pause.png" alt="">
            <div class="row">
                <div class="gui-bar" id="food">
                    <div id="hungryValue" class="gui-value"></div>
                </div>
                <div class="gui-bar" id="life">
                    <div id="healthValue" class="gui-value"></div>
                </div>
                <div class="gui-bar" id="stamina">
                    <div id="staminaValue" class="gui-value"></div>
                </div>
                <div class="money" id="moneyValue">

                </div>
            </div>
            <div id="item_drop">

            </div>
            <div id="keydown">
                <h5 style="margin-right: 1em" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                    </svg>
                </h5>
                <img src="/images/space_key.gif" width="60" height="30" alt="">
            </div>
        </div>

    </div>

<script type="module" src="js/main.js"></script>



</body>

</html>
