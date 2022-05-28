<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Laureate extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'firstname',
        'lastname',
        'gender',
        'birth_date',
        'country',
        'wikipedia_address',
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'string'
    ];

    public function nobelPrize(){
        return $this->hasMany(NobelPrize::class);
    }

}
