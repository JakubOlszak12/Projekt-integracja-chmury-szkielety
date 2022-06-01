<?php

use App\Models\Laureate;
use App\Models\NobelPrize;
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
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('/laureates', function (Request $request) {
        $laureates = file_get_contents(storage_path() . "/laureates.json");
        return $laureates;
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::get('/PrizesFromDatabase', [NoblePrizeController::class, 'show']);
    Route::get('/prizesExportToXML', [NoblePrizeController::class, 'store']);
    Route::get('/laureatesToJSON', [LaureateController::class, 'store']);
    Route::get('/charts', function () {
        $chartsData = [];
        //Liczba kobiet i mężczyzn
        $laureatesMaleCount = Laureate::where('gender', 'male')->get()->count();
        $laureatesFemaleCount = Laureate::where('gender', 'female')->get()->count();

        //Liczba laureatow z danego kraju
        $laureatesDistinctCountry = Laureate::all()->countBy('country');

        $prizesAwardedYearCount = NobelPrize::all()->countBy('award_year');

        $prizesDistinctCategoryCount = NobelPrize::all()->countBy('category');

        //Liczba takich samych imion i nazwisk (limit 10)
        $laureatesMostLastNames = Laureate::all()->countBy('lastname')->sortDesc()->splice(0, 8);
        $laureatesMostFirstNames = Laureate::all()->countBy('firstname')->sortDesc()->splice(0, 8);

        //$prizesDistinctCategory = NobelPrize::orderBy('category','asc')->distinct('category')->get(['category']);
        $prizesDistinctCategory = NobelPrize::orderBy('category','asc')->distinct('category')->get(['category'])->pluck('category');
        $category_prizeAmount = [];
        $category_prizeAmountAdjusted = [];
        foreach ($prizesDistinctCategory as $category){
                $category_prizeAmount[$category] = NobelPrize::where('category', '=', $category)->sum('prize');
                $category_prizeAmountAdjusted[$category] = NobelPrize::where('category', '=', $category)->sum('prize_adjusted');
        }

        $chartsData[] = [
            'male_count' => $laureatesMaleCount, 'female_count' => $laureatesFemaleCount,
            'country_count' => $laureatesDistinctCountry,
            'most_last_names' => $laureatesMostLastNames,
            'most_first_names' => $laureatesMostFirstNames,
            'awarded_year' => $prizesAwardedYearCount,
            'prize_category_count' => $prizesDistinctCategoryCount,
            'prize_amount_by_category' => $category_prizeAmount,
            'prize_amount_adjusted_by_category' => $category_prizeAmountAdjusted,
        ];
        return $chartsData;
    });

    #TODO
    Route::patch('/updateProfileData', function (Request $request) {
        return get_user();
    });
});



