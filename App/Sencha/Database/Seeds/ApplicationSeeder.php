<?php

namespace App\Sencha\Database\Seeds;

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
            'version'=>'1.21.0',
            'comments'=>'Se agrego clase para cancelar comportamiento normal del navegador al presionar F5'
        ]);        
    }
    
}
