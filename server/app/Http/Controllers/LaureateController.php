<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Laureate;
use DB;
use Symfony\Component\HttpFoundation\Response;
class LaureateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */



    public function index($id)
    {
        $laureateinfo = Laureate::where('id',$id)->get();
        $laureate = json_encode($laureateinfo);
        $laureate = json_decode($laureateinfo);
        if(empty($laureate)){
            return "error";
        }
        return $laureateinfo;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $credentials = $request->only('firstname','lastname', 'gender', 'birth_date', 'wikipedia_address','country');

            $validator = Validator::make($credentials, [
                'firstname' => 'required|string|min:3|max:50',
                'lastname' => 'required|string|min:3|max:50',
                'gender' => 'required|string|min:3|max:7',
                'birth_date' => 'required|date_format:Y-m-d',
                'wikipedia_address' => 'required|string',
                'country' => 'required|min:3|max:50'
            ]);
            if($validator->fails()){
                return response()->json([
                	'success' => false,
                	'message' => 'Wrong data passed',
                ], 400);
            }

        Laureate::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'wikipedia_address' => $request->wikipedia_address,
            'country' => $request->country
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $laureates = Laureate::all();
        $laureates = json_encode($laureates,true);
        return $laureates;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return  $laureates = Laureate::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        $credentials = $request->only('firstname','lastname', 'gender', 'birth_date', 'wikipedia_address','country');

            $validator = Validator::make($credentials, [
                'firstname' => 'required|string|min:3|max:50',
                'lastname' => 'required|string|min:3|max:50',
                'gender' => 'required|string|min:3|max:7',
                'birth_date' => 'required|date_format:Y-m-d',
                'wikipedia_address' => 'required|string',
                'country' => 'required|min:3|max:50'
            ]);
            if($validator->fails()){
                return response()->json([
                	'success' => false,
                	'message' => 'Wrong data passed',
                ], 400);
            }

            $laureate = Laureate::find($id);
            try{
                $laureate->firstname = $request->firstname;
                $laureate->lastname = $request->lastname;
                $laureate->gender = $request->gender;
                $laureate->birth_date = $request->birth_date;
                $laureate->wikipedia_address = $request->wikipedia_address;
                $laureate->country = $request->country;
                $laureate->save();
            }catch (error $e){
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
            DB::table('nobel_prizes')->where('laureate_id',$id)->delete();
            DB::table('laureates')->where('id',$id)->delete();

          }  catch (error $e){
              return response()->json([
                  'error' => $e,
                  'message' => "someting went wrong"
              ], 300);
          }
          return response()->json([
            'message' => "successfully deleted laureate!"
          ]);
    }
}
