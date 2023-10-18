<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\Inventory;
use App\Models\Country;
use App\Models\Equip;
use App\Models\Items;

use Illuminate\Support\Facades\DB;

use App\Models\Inheritance;
use Illuminate\Support\Facades\Auth;


class GameController extends Controller{
    public function showPlayer()
    {
        $player = Player::where('players.users_id', Auth::user()->id)->first();

            $inventory = Inventory::join('items', 'items.id','=','user_inventory.item_id')
            ->where('user_inventory.player_id', $player['id'])
            ->select('user_inventory.item_id', 'user_inventory.quantity','items.type')
            ->get()
            ->toArray();

        $inventory_equip = Inventory::join('items', 'items.id','=','user_inventory.item_id')
            ->where('user_inventory.player_id',  $player['id'])
            ->where('items.type','Weapon')
            ->orWhere('items.type','Equip')
            ->select('user_inventory.item_id', 'user_inventory.quantity','items.type')
            ->get()
            ->toArray();

        $equip = Equip::where('player_id',  $player['id'])
            ->get()
            ->toArray();

        if($player['last_pos'] != null){
            $playerX = explode(',',$player['last_pos'])[0];
            $playerY = explode(',',$player['last_pos'])[1];
        }else{
            $playerX = explode(',',$player['spawn'])[0];
            $playerY = explode(',',$player['spawn'])[1];
        }


        return view('welcome', compact('player', 'playerX', 'playerY','inventory','equip','inventory_equip'));
    }

    public function save_game(Request $request){
        $player = Player::where('users_id',Auth::user()->id)->first();
        $player_update  = clone $player ;
        $player_update =  $player_update->where('users_id',Auth::user()->id)->update(['last_pos' => $request['playerX'].','.$request['playerY'],  'health' =>  $request['health'], 'updated_at' => date('Y-m-d H:i:s')]);

        foreach ($request['inventory'] as $key => $qnt){
            if($qnt != null){
                $inventory = Inventory::where(["player_id" => $player->id, "item_id"   =>$key]);
                if ($inventory->first() == null){
                    $newInventory = Inventory::create(
                        [
                            "player_id" => $player->id,
                            "item_id"   =>$key,
                            'quantity' => $qnt['quantity'],
                        ]);
                }
                else{
                    $inventory->update(['quantity' => $qnt['quantity']]);
                }
            }

        }

        return 'success';
    }
}
