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
            $table->id()->unique();
            $table->string('name');
            $table->unsignedBigInteger('users_id');
            $table->string('element');
            $table->string('species');
            $table->integer('level');
            $table->integer('xp');
            $table->integer('money');
            $table->integer('health')->default(100);
            $table->integer('max_health')->default(100);
            $table->integer('attack')->default(4);
            $table->integer('defense')->default(0);
            $table->string('spawn');
            $table->string('last_pos');
            $table->integer('attack_spd')->default(800);
            $table->integer('speed')->default(40);
            $table->integer('power')->default(0);
            $table->integer('country_id');

            $table->dateTime('created_at')->nullable()->default(new DateTime());
            $table->dateTime('updated_at')->nullable()->default(new DateTime());

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
