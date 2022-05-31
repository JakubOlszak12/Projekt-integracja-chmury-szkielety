<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NobelPrize;
use App\Models\Laureate;
use DB;
use SoapBox\Formatter\Formatter;
use Spatie\ArrayToXml\ArrayToXml;
class NoblePrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Responsephp
     */
    public function store(Request $request)
    {
        $array = [];
        $formatter = Formatter::make($array, Formatter::ARR);
        $arrayofarrays = [];
        $prizes = NobelPrize::all();
        $laureates = json_decode(file_get_contents(storage_path() . "/laureates.json"),true);
        return print_r($laureates);
        foreach($prizes as $prize){
            $laureate = Laureate::where('id', $prize['laureate_id'])->first();
            $record['Prize']['id'] = strval($prize['id']);
            $record['Prize']['award_year'] = "_".strval($prize['award_year']);
            $record['Prize']['category'] = strval($prize['category']);
            $record['Prize']['prize'] = "_".strval($prize['prize']);
            $record['Prize']['prize_adjusted'] = "_".strval($prize['prize_adjusted']);
            $record['Prize']['motivation'] = trim(preg_replace('/\s+/', ' ', strval($prize['motivation'])));
            $record['Prize']['laureate_name'] = $laureate['firstname']." ".$laureate['lastname'];
            $record['Prize']['wikipedia'] = $laureate['wikipedia_address'];
            array_push($array,$record);

        }
        return print_r(array_values($array));
        return ArrayToXml::convert(array_values($array));
        array_push($arrayofarrays,$array);
        return $arrayofarrays;

        //return json_encode($array);
        //$array = ["id" => "_1"];
        //return $array;


    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $record = [];
        $prizes = NobelPrize::all();
        foreach($prizes as $prize){
            $laureate = Laureate::where('id', $prize['laureate_id'])->first();
            $prize['laureate_name'] = $laureate['firstname']." ".$laureate['lastname'];
            $prize['wikipedia'] = $laureate['wikipedia_address'];
            unset($prize['laureate_id']);
        }
        return $prizes;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        DB::statement("SET foreign_key_checks=0");
        NobelPrize::truncate();
        DB::statement("SET foreign_key_checks=1");
    }
}
