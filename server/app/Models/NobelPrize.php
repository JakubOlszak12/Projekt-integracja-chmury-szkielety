<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NobelPrize extends Model
{
       /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'award_year',
        'category',
        'prize',
        'prize_adjusted',
        'motivation',
        'laureate_id',
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'prize' => 'integer',
        'prize_adjusted' => 'integer',
        'laureate_id' => 'BigInteger'
    ];

    public function laureate(){
        return $this->belongsTo(Laureate::class);
    }
}
