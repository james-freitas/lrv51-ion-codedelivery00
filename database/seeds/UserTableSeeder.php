<?php

use CodeDelivery\Models\Client;
use Illuminate\Database\Seeder;

use CodeDelivery\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 10)->create()->each(function($u) {
            $u->client()->save(factory(Client::class)->make());
        });
    }
}
