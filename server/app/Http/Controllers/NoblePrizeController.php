<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NobelPrize;
use App\Models\Laureate;
use DB;
use Illuminate\Support\Facades\Storage;
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


        $prizes = NobelPrize::all();

        foreach($prizes as $prize){
            $laureate = Laureate::where('id', $prize['laureate_id'])->first();
            $record['id'] = strval($prize['id']);
            $record['award_year'] = strval($prize['award_year']);
            $record['category'] = strval($prize['category']);
            $record['prize'] = strval($prize['prize']);
            $record['prize_adjusted'] = strval($prize['prize_adjusted']);
            $record['motivation'] = trim(preg_replace('/\s+/', ' ', strval($prize['motivation'])));
            $record['laureate_name'] = $laureate['firstname']." ".$laureate['lastname'];
            $record['wikipedia'] = $laureate['wikipedia_address'];
            array_push($array,$record);

        }
        $json = json_encode($array,true);
        $formatter = Formatter::make($json,Formatter::JSON);
        $xml = $formatter->toXml();
        return $xml;
        //return $response;


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
