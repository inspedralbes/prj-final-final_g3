<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\EventController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/login', [SpotifyController::class, 'login']);
Route::get('/callback', [SpotifyController::class, 'callback']);
Route::get('/getTrack', [SpotifyController::class, 'getTrack']);

Route::group(['prefix' => 'events'], function () {
    // Route::get('/fetch', [EventController::class, 'fetchFromTicketMaster']);
    Route::get('/', [EventController::class, 'index']);
});
