<?php namespace App\Sencha\Database\Seeds;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
                
        $this->call(ApplicationSeeder::class);
        
    }
    
}
