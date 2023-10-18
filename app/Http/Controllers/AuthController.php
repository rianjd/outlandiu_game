<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Player;
use App\Models\Inventory;
use App\Models\Country;
use App\Models\Inheritance;
use App\Models\User;


class AuthController extends Controller
{

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();


        return redirect('/login');
    }

    public function showLoginForm()
    {
        if(!Auth::check()){

            return view('login');
        }else{
            return redirect('/game');

        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            // Autenticação bem-sucedida, redirecionar para a página do jogo ou página inicial
            return redirect('/game');
        } else {
            // Autenticação falhou, redirecionar de volta para o formulário de login com mensagem de erro
            return redirect()->back()->withErrors(['error' => 'Credenciais inválidas.']);
        }
    }


    public function showRegistrationForm()
    {
        return view('register');
    }

    public function register(Request $request)
    {

        // Defina as porcentagens para cada raridade do nível de poder
        $rarities = [
            500 => 1,
            0 => 19,
            100 => 80,
            10 => 200,
            40 => 300,
            20 => 400,
        ];

        // Gere um número aleatório de 0 a 100
        $randomNumber = mt_rand(0, 1000);

        // Inicialize as raridades cumulativas e defina a raridade inicial do nível de poder como "Fraco"
        $cumulativeRarity = 0;
        $powerRarity = 10;

        // Calcule a raridade do nível de poder com base nas porcentagens definidas
        foreach ($rarities as $rarity => $percentage) {
            $cumulativeRarity += $percentage;
            if ($randomNumber <= $cumulativeRarity) {
                $powerRarity = $rarity;
                break;
            }
        }
        $speciesVariations = ['human', 'elf', 'anao', 'goblin', 'semi-human'];
        // Obtenha um país aleatório
        $randomCountry = Country::inRandomOrder()->first();

        if($randomCountry->default == 'mist' or $randomCountry->default == 'unknow'){
            // Gere as características aleatórias para o jogador
            $species = $speciesVariations[array_rand($speciesVariations)];
        } else{
            $species = $randomCountry->default;
        }

        // Verifique se a espécie é uma das espécies permitidas para ter características de elemento
        if (in_array($species, ['human', 'elf', 'dragon', 'fairy', 'elemental'])) {
            $elementVariations = ['Fogo', 'Água', 'Terra', 'Ar', 'Raio', 'Gelo', 'Luz', 'Trevas', 'Sagrado', 'Arcano'];
            $element = $elementVariations[array_rand($elementVariations)];
        } else {
            $element = 'Nenhum'; // Se a espécie não estiver na lista, defina o elemento como "Nenhum".
        }

        // Crie o novo jogador no banco de dados com as características geradas


        $credentials = $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
        ]);
        $user = User::create([
            'username' => $credentials['username'],
            'password' => bcrypt($credentials['password']),
        ]);

        $player = new Player([
            'name' => $credentials['username'],
            'element' => $element,
            'species' => $species,
            'power' => $powerRarity,
            'country_id' => $randomCountry->id,
            'users_id' => $user->id,
        ]);
        $player->save();

        $potion = new Inventory([
            'id' => 15,
            'quantity' => 1,
            'player_id' => $player->id,

        ]);



        // Crie um novo usuário no banco de dados


        // Autentique o usuário recém-criado
        Auth::login($user);

        // Redirecione o usuário para a página do jogo ou página inicial após o cadastro
        return redirect('/');
    }
}
