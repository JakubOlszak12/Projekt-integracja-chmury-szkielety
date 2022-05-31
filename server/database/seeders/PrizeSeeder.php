<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Laureate;
use App\Models\NobelPrize;
use DB;
class PrizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $laureates = Laureate::where('id' ,'>' ,0)->pluck('id')->toArray();
        $xmldata = simplexml_load_file(storage_path() ."/nobelPrizes.xml");
        $data = [];
        foreach($xmldata->children() as $prize){
            if(isset($prize->awardYear) &&
            isset($prize->category->en) &&
            isset($prize->prizeAmount) &&
            isset($prize->prizeAmountAdjusted) &&
            isset($prize->laureates)
            )
            $record = [];
             $record['award_year'] = strval($prize->awardYear);
             $record['category'] = strval($prize->category->en);
             $record['prize'] = strval($prize->prizeAmount);
             $record['prize_adjusted'] = strval($prize->prizeAmountAdjusted);
             foreach($prize->laureates as $laureate){
                 if(isset($laureate->id) &&
                    isset($laureate->motivation->en)
                 ){
                     if(in_array($laureate->id,$laureates)){
                         $record['laureate_id'] = strval($laureate->id);
                     } else continue;
                     $record['motivation'] = strval($prize->laureates->motivation->en);
                 }
                 array_push($data,$record);
             }



    }
    NobelPrize::insert($data);
    }
}
