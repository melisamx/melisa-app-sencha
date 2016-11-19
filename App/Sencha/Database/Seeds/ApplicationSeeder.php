<?php namespace App\Sencha\Database\Seeds;

use Illuminate\Database\Seeder;
use Melisa\Laravel\Database\FirstOrCreate;

class ApplicationSeeder extends Seeder
{
    
    use FirstOrCreate;
    
    public function run()
    {
        
        $this->firstOrCreate('App\Core\Models\Applications', [
            [
                'find'=>[
                    'key'=>'sencha',
                ],
                'values'=>[
                    'name'=>'Sencha',
                    'description'=>'Application Sencha',
                    'nameSpace'=>'Melisa',
                    'typeSecurity'=>'art'
                ]
            ]
        ]);
        
    }
    
}
