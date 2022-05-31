<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Laureate;
use DB;
class LaureateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $laureates = json_decode(file_get_contents(storage_path() . "/laureates.json"),true);

        $data = [];
        foreach($laureates['laureates'] as $person){
            if(isset($person['birth']['place']['country']['en'])
            && isset($person['familyName']['en'])
            && isset($person['givenName']['en'])
            && isset($person['gender'])
            && isset($person['birth']['date'])
            && isset($person['wikipedia']['english'])){
            $record = [];
            $record['id'] = $person['id'];
            $record['firstname'] = $person['givenName']['en'];
            $record['lastname'] = $person['familyName']['en'];
            $record['gender'] = $person['gender'];
            $record['birth_date'] = $person['birth']['date'];
            $record['country'] = $person['birth']['place']['country']['en'];
            $record['wikipedia_address'] = $person['wikipedia']['english'];
            array_push($data, $record);
            }
         }

         Laureate::insert($data);
    }
}
