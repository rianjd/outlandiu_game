<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Player extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('element');
            $table->string('species');
            $table->integer('level', 11);
            $table->integer('xp', 11);
            $table->integer('money', 11);
            $table->integer('health')->default(100);
            $table->integer('max_health')->default(100);
            $table->integer('attack')->default(4);
            $table->integer('defense')->default(0);
            $table->string('spawn');
            $table->string('last_pos');
            $table->integer('attack_spd')->default(800);
            $table->integer('speed')->default(40);
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
