<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('main');
    //return redirect('/login');
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/game', [GameController::class, 'showPlayer']);
    Route::post('/game/save_game', [GameController::class, 'save_game'])->name('save_game');

});
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');

Route::get('/login', function () {
    return view('re_login');
})->name('relogin');
Route::post('/auth', [AuthController::class, 'login']);
Route::post('/register_user', [AuthController::class, 'register']);
