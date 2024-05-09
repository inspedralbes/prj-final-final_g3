<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\MessageController;

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
    Route::put('/updateInfo', [UserController::class, 'updateInfo']);
    Route::group(['prefix' => 'users'], function () {
        Route::post('/{userId}/follow', [FollowersController::class, 'followUser']);
        Route::delete('/{userId}/unfollow', [FollowersController::class, 'unfollowUser']);
        Route::get('/{userId}/followers', [FollowersController::class, 'getUserFollowers']);
        Route::get('/{userId}/followed', [FollowersController::class, 'getUserFollowed']);
    });
});

Route::group(['prefix'=>'apps'],function(){
    Route::post('/register', [UserController::class, 'registerWithApps']);
    Route::get('/checkEmail', [UserController::class, 'checkEmail']);
});


Route::get('/getTrack', [SpotifyController::class, 'getTrack']);

Route::group(['prefix' => 'events'], function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/{id}', [EventController::class, 'show']);
    // Route::post('/', [EventController::class, 'store']);
    // Route::put('/{id}', [EventController::class, 'update']);
    // Route::delete('/{id}', [EventController::class, 'destroy']);
});

Route::group(['prefix' => 'messages'], function () {
    Route::post('/', [MessageController::class, 'saveMessage']);
    // Route::get('/', [MessageController::class, 'getAllMessages']);
});
