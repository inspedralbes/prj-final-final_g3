<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

Route::get('/loginSpotify', [SpotifyController::class, 'login']);
Route::get('/spotifyCallback', [SpotifyController::class, 'callback']);

Route::get('auth', [UserController::class, 'redirectToAuth']);
Route::get('auth/callback', [UserController::class, 'handleAuthCallback']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::put('/completeInfo', [UserController::class, 'completeInfo']);
});
Route::get('/getTrack', [SpotifyController::class, 'getTrack']);
