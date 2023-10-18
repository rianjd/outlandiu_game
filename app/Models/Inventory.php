<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $table = 'user_inventory';
    public $timestamps = false;

    protected $fillable = [
        'player_id','item_id', 'quantity'
    ];

}
