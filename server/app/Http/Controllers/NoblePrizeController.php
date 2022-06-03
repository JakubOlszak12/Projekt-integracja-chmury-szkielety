<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NobelPrize;
use App\Models\Laureate;
use DB;
use Validator;
use Illuminate\Support\Facades\Storage;
use SoapBox\Formatter\Formatter;
use Spatie\ArrayToXml\ArrayToXml;
use Symfony\Component\HttpFoundation\Response;
class NoblePrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $prizeinfo =  NobelPrize::select('id','award_year','category','prize','prize_adjusted','motivation','laureate_id')->where('id',$id)->get();
        $prize = json_encode($prizeinfo);
        $prize = json_decode($prize);
        if(empty($prize)){
            return "error";
        }else{
            return $prizeinfo;
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $credentials = $request->only('award_year','category', 'prize', 'prize_adjusted', 'motivation','laureate_id');

            $validator = Validator::make($credentials, [
                'award_year' => 'required|integer|min:1900|max:2099',
                'category' => 'required|string|min:3',
                'prize' => 'required|integer|min:1',
                'prize_adjusted' => 'required|integer|min:1',
                'motivation' => 'required|string|min:3|max:500',
                'laureate_id' => 'required|integer|min:1'
            ]);
            if($validator->fails()){
                return response()->json([
                	'success' => false,
                	'message' => 'Wrong data passed while trying to add Nobel Prize',
                ], 400);
            }
        NobelPrize::create([
            'award_year' => $request->award_year,
            'category' => $request->category,
            'prize' => $request->prize,
            'prize_adjusted' => $request->prize_adjusted,
            'motivation' => $request->motivation,
            'laureate_id' => $request->laureate_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laureate added successfully',
            'data' => $credentials
        ], Response::HTTP_OK);
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
    public function edit($id, Request $request)
    {
        $credentials = $request->only('award_year','category', 'prize', 'prize_adjusted', 'motivation','laureate_id');

            $validator = Validator::make($credentials, [
                'award_year' => 'required|integer|min:1900|max:2099',
                'category' => 'required|string|min:3',
                'prize' => 'required|integer|min:1',
                'prize_adjusted' => 'required|integer|min:1',
                'motivation' => 'required|string|min:3|max:500',
                'laureate_id' => 'required|integer|min:1'
            ]);
            if($validator->fails()){
                return response()->json([
                	'success' => false,
                	'message' => 'Wrong data passed while updating Nobel Prize',
                ], 400);
            }

        $prize = NobelPrize::find($id);
        try{
            $prize->award_year = $request->award_year;
            $prize->category = $request->category;
            $prize->prize = $request->prize;
            $prize->prize_adjusted = $request->prize_adjusted;
            $prize->motivation = $request->motivation;
            $prize->laureate_id = $request->laureate_id;
            $prize->save();
        } catch (error $e){
            return response()->json([
                'error' => $e,
                'success' => false,
                'message' => 'Something went wrong while updating',
            ], 200);
        }


        return response()->json([
            'success' => true,
            'message' => 'Laureate updated successfully',
            'data' => $credentials
        ], Response::HTTP_OK);
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
        try{
            DB::table('nobel_prizes')->where('id',$id)->delete();
          }  catch (error $e){
              return response()->json([
                  'error' => $e,
                  'message' => "someting went wrong"
              ], 300);
          }
          return response()->json([
            'message' => "successfully deleted record!"
          ]);
    }
}
