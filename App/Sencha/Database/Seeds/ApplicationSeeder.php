<?php namespace App\Sencha\Database\Seeds;

use Illuminate\Database\Seeder;
use Melisa\Laravel\Database\InstallApplication;

class ApplicationSeeder extends Seeder
{    
    use InstallApplication;
    
    public function run()
    {
        
        $this->installApplication('sencha', [
            'name'=>'Sencha',
            'description'=>'Application Sencha',
            'nameSpace'=>'Melisa',
            'typeSecurity'=>'art',
            'version'=>'1.0.2',
        ]);
        
    }
    
}
