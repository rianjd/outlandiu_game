<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equip extends Model
{
    use HasFactory;
    protected $table = 'equip_inventory';
    public $timestamps = false;

    protected $fillable = [
        'player_id','equipped_item_1', 'equipped_item_2','equipped_item_3', 'equipped_item_4','equipped_item_5'
    ];

}
