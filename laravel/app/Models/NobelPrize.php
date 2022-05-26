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
        'motivation'
    ];



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'award_year' => 'integer',
        'prize' => 'integer',
        'prize_adjusted' => 'integer'
    ];

    public function laureate(){
        return $this->belongsTo(Laureate::class);
    }
}
