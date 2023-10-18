<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $table = 'players';

    protected $fillable = [
        'name','element', 'species', 'power', 'country_id', 'inheritance_id',
        "level",
        "xp",
        "money",
        "health" ,
        "max_health" ,
        "attack" ,
        "defense" ,
        "spawn" ,
        "last_pos"  ,
        "attack_spd" ,
        "speed" ,
        'users_id',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function inheritance()
    {
        return $this->belongsTo(Inheritance::class);
    }
}
