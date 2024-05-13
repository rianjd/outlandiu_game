<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha512-U6K1YLIFUWcvuw5ucmMtT9HH4t0uz3M366qrF5y4vnyH6dgDzndlcGvH/Lz5k8NFh80SN95aJ5rqGZEdaQZ7ZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://kit.fontawesome.com/5a04192bbd.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/main.css">

    <title>Document</title>

</head>
<body>

    <div class="title">
        <span>Welcome to</span>
        <h1>Outlandiu</h1>
        <div class="item item-scroll hidden-item" >
            <span class="muted">Scroll down</span>
            <i class="	fas fa-angle-down to-bottom"></i>

        </div>
    </div>


    <div id="hero">
        <div class="layer layer-bg" data-type="parallax" data-depth= "0.10">

        </div>
        <div class="layer layer-01" data-type="parallax" data-depth= "0.20">

        </div>
        <div  class="layer layer-02" data-type="parallax" data-depth= "0.50">

        </div>
        <div  class="layer layer-03" data-type="parallax" data-depth= "0.80">

        </div>
        <div  class="layer layer-overlay" data-type="parallax" data-depth= "0.85">
        </div>
        <div  class="layer layer-04" data-type="parallax" data-depth= "1.00">
        </div>
    </div>
    <div id="hero-mobile">

    </div>

    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2>Welcome</h2>
                    <p>Unveil the mysteries of a world unbound in "Outlandiu" , where exploration knows no limits. You are the chronicler of your own tale, the master of your own choices. Traverse a sprawling landscape teeming with secrets, embark on quests that define your legacy, and immerse yourself in a world alive with possibility.</p>
                    <p>
                        The game is centered around a classic RPG, but you don't get to choose your character. You're born with a species, a power level, and a hometown, all randomly assigned. As you explore the world, you'll encounter other species, cities, and abilities. You're completely free - live your Roleplay in whatever way you wish.
                    </p>
                    @if (!Auth::check())
                        <button class="btn " data-bs-toggle="modal" data-bs-target="#modalLogin" type="button" >JOGAR<i class="fa fa-play " style="margin-left: 1em;"></i></button>

                    @else
                        <a class="btn " href="/game"  type="button" >JOGAR<i class="fa fa-play " style="margin-left: 1em;"></i></a>
                    @endif
                </div>
                <div class="col text-right" >
                    <img  src="images/imagem-site.jpeg" width="500" alt="">
                </div>
            </div>
        </div>

    </div>


   <!-- Modal Body -->
   <div class="modal fade" id="modalLogin" tabindex="-1"  role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal" role="document">
        <div class="modal-content">
            @include('login')

        </div>
    </div>
   </div>
    <!-- Modal Body -->
    <div class="modal fade" id="modalRegister" tabindex="-1"  role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal" role="document">
        <div class="modal-content">
            @include('register')

        </div>
    </div>
    </div>



</body>
<script>
   window.addEventListener('scroll', function(event) {
        var topDistance = window.pageYOffset;
        var layers = document.querySelectorAll("[data-type='parallax']");

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var depth = layer.getAttribute('data-depth');
            var movement = -(topDistance * depth);
            var translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style['-webkit-transform'] = translate3d;
            layer.style['-moz-transform'] = translate3d;
            layer.style['-ms-transform'] = translate3d;
            layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;
        }
    });
</script>
<script>
    $(document).ready(function () {
      const urlParams = new URLSearchParams(window.location.search);
        let data = urlParams.get('data');

        var timeout = setTimeout(function() {
            $('.item').removeClass('hidden-item');
            $('.item').addClass('item-scroll');

        }, 3000);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 20) {
            $('.item').addClass('hidden-item');
            clearTimeout(timeout);
            }
        });
    });

</script>
</html>
