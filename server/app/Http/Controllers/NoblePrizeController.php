<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NobelPrize;
use App\Models\Laureate;
class NoblePrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $prizes = json_decode(file_get_contents(storage_path() . "/nobelPrizes.json"),true);
        $data = [];
        $laureates = Laureate::where('id' ,'>' ,0)->pluck('id')->toArray();

        foreach($prizes['nobelPrizes'] as $prize){
            if(isset($prize['awardYear'])
            && isset($prize['category']['en'])
            && isset($prize['prizeAmount'])
            && isset($prize['prizeAmountAdjusted'])
            && isset($prize['laureates']))
            {
            $record = [];
            $record['award_year'] = $prize['awardYear'];
            $record['category'] = $prize['category']['en'];
            $record['prize'] = $prize['prizeAmount'];
            $record['prize_adjusted'] = $prize['prizeAmountAdjusted'];
           foreach($prize['laureates'] as $laurate){
                if(isset($laurate['id'])
                && isset($laurate['motivation']['en'])){
                    if(in_array($laurate['id'],$laureates)){
                        $record['laureate_id'] = $laurate['id'];
                    }
                    else continue;
                    $record['motivation'] = $laurate['motivation']['en'];

                    array_push($data, $record);
                }
            }
        }
    }

    NobelPrize::insert($data);
}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
