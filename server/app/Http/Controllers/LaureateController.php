<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SoapBox\Formatter\Formatter;
use App\Models\Laureate;
use DB;
class LaureateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */



    public function index()
    {
        $laureates = json_decode(file_get_contents(storage_path() . "/laureates.json"),true);

        $formatter = Formatter::make(file_get_contents(storage_path() . "/laureates.json"), Formatter::JSON);
        $xml = $formatter->toXML();

        dd($xml);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
    public function destroy()
    {
        DB::statement("SET foreign_key_checks=0");
        Laureate::truncate();
        DB::statement("SET foreign_key_checks=1");
    }
}
