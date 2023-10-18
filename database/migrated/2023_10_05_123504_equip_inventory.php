<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EquipInventory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equip_inventory', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('player_id');
            $table->integer('equipped_item_1');
            $table->integer('equipped_item_2');
            $table->integer('equipped_item_3');
            $table->integer('equipped_item_4');
            $table->integer('equipped_item_5');

            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equip_inventory');
    }
}
