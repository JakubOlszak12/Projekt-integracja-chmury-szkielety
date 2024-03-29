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
    Route::delete('/delete', [AuthController::class, 'delete']);
    Route::get('/laureates', function (Request $request) {
        $laureates = file_get_contents(storage_path() . "/laureates.json");
        return $laureates;
    });
    Route::patch('/updateLaureate/{id}',[LaureateController::class,'edit']);
    Route::patch('/updatePrize/{id}',[NoblePrizeController::class,'edit']);
    Route::delete('/deleteLaureate/{id}',[LaureateController::class, 'destroy']);
    Route::delete('/deleteNobelPrize/{id}',[NoblePrizeController::class, 'destroy']);
    Route::get('/getPrizeInfo/{id}', [NoblePrizeController::class, 'index']);
    Route::get('/getLaureateInfo/{id}', [LaureateController::class, 'index']);
    Route::get('/laureatesFromDatabase', [LaureateController::class, 'show']);
    Route::post('/addNobelPrize',[NoblePrizeController::class, 'create']);
    Route::post('/addLaureate', [LaureateController::class, 'create']);
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
        $prizesDistinctYear = NobelPrize::orderBy('award_year','asc')->distinct('award_year')->get(['award_year'])->pluck('award_year');

        $prizesAwardedYearCountbyCategory = [];
        foreach ($prizesDistinctYear as $currentYear){
            $category_AmountInCurrentYear = [];
            foreach ($prizesDistinctCategory as $category){
                $category_AmountInCurrentYear[] = NobelPrize::where('award_year', '=', $currentYear)->where('category', '=', $category)->count();
            }
            $prizesAwardedYearCountbyCategory[$currentYear] = $category_AmountInCurrentYear;
        }

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
            'awarded_year_by_category' => $prizesAwardedYearCountbyCategory,
            'prize_category_count' => $prizesDistinctCategoryCount,
            'prize_amount_by_category' => $category_prizeAmount,
            'prize_amount_adjusted_by_category' => $category_prizeAmountAdjusted,
        ];
        return $chartsData;
    });
    Route::get('/getCountries', function (Request $request) {
     $countries = Laureate::select('country')->distinct()->get();
     $array = [];

     foreach($countries as $country){
        $row = [];
        $row['label'] = $country['country'];
        $row['value'] = $country['country'];
        array_push($array,$row);
     }
     return $array;
    });

    Route::get('/getLaureateName', function (Request $request) {
        $laureates = Laureate::select('firstname', 'lastname', 'id')->get();
        $array = [];

        foreach($laureates as $laureate){
           $row = [];
           $row['label'] = $laureate['firstname']." ".$laureate['lastname'];
           $row['value'] = $laureate['id'];
           array_push($array,$row);
        }
        return $array;
       });

       Route::get('/getCategories', function (Request $request) {
        $categories = NobelPrize::select('category')->distinct()->get();
        $array = [];

        foreach($categories as $category){
           $row = [];
           $row['label'] = $category['category'];
           $row['value'] =  $category['category'];
           array_push($array,$row);
        }
        return $array;
       });
});



