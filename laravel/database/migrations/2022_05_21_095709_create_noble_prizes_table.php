<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('noble_prizes', function (Blueprint $table) {
            $table->id();
            $table->integer("award_year");
            $table->string("category");
            $table->integer("prize");
            $table->integer("prize_adjusted");
            $table->string("motivation");
            $table->unsignedBigInteger('laureate_id');
            $table->foreign('laureate_id')
            ->references('id')
            ->on('laureates')
            ->onUpdate('cascade')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('noble_prizes');
    }
};
