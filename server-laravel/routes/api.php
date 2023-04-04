<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
], function () {
    Route::get('/', function () {
        return ['info' => 'v. 1'];
    });
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/question', [AuthController::class, 'question']);

});
