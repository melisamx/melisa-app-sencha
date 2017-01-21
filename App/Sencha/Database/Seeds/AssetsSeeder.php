<?php namespace App\Sencha\Database\Seeds;

use Melisa\Laravel\Database\InstallSeeder;

/**
 * 
 *
 * @author Luis Josafat Heredia Contreras
 */
class AssetsSeeder extends InstallSeeder
{
    
    public function run()
    {
        
        $this->installAssetJs('app.sencha.classic', [
            'name'=>'Classic Toolkit',
            'path'=>'/sencha/js/melisa-sencha-classic.min.js',
        ]);
        
        $this->installAssetJs('app.sencha.modern', [
            'name'=>'Modern Toolkit',
            'path'=>'/sencha/js/melisa-sencha-modern.min.js',
        ]);
        
    }
    
}
