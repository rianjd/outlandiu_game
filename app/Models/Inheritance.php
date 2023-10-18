<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inheritance extends Model
{
    use HasFactory;
    protected $table = 'inheritance';

    protected $fillable = [
        'variation',
    ];

    public function players()
    {
        return $this->hasMany(Player::class);
    }
}
