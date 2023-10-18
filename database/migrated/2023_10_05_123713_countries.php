<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Countries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('qualidade_de_vida');
            $table->string('riqueza');
            $table->integer('populacao');
            $table->string('especie_padrao')->nullable();
            $table->boolean('is_rich')->nullable()->default(false);

            $table->foreign('inheritance_id')->references('id')->on('inheritance')->onDelete('cascade');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
