<?php namespace App\Sencha\Database\Seeds;

use Melisa\Laravel\Database\InstallSeeder;

class ApplicationSeeder extends InstallSeeder
{
    
    public function run()
    {
        
        $this->installApplication('sencha', [
            'name'=>'Sencha',
            'description'=>'Application Sencha',
            'nameSpace'=>'Melisa',
            'typeSecurity'=>'art',
            'version'=>'1.8.2',
        ]);
        
    }
    
}
