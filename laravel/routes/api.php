<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\EventController;
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
Route::get('/auth', [UserController::class, 'redirectToAuth']);
Route::get('/auth/callback', [UserController::class, 'handleAuthCallback']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::put('/completeInfo', [UserController::class, 'completeInfo']);
});

Route::group(['prefix'=>'apps'],function(){
    Route::post('/register', [UserController::class, 'registerWithSpotify']);
});

Route::get('/getTrack', [SpotifyController::class, 'getTrack']);

Route::group(['prefix' => 'events'], function () {
    Route::get('/', [EventController::class, 'index']);
});
