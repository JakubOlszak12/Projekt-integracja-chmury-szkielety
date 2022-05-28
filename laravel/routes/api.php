<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaureateController;
use App\Http\Controllers\NoblePrizeController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);


});

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/laureates', function (Request $request){
        $laureates = file_get_contents(storage_path() . "/laureates.json");
        return $laureates;
 });
 Route::get('/prizes', function (Request $request){
    $laureates = file_get_contents(storage_path() . "/nobelPrizes.json");
    return $laureates;
});
Route::post('/prizesToDatabase',[NoblePrizeController::class, 'store']);
Route::post('/jsonToDatabase',[LaureateController::class, 'store']);
});


