<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $table = 'countries';

    protected $fillable = [
        'name', 'qualidade_de_vida', 'riqueza', 'populacao', 'especie_padrao', 'is_rich',
    ];

    public function players()
    {
        return $this->hasMany(Player::class);
    }
}
