/**
 * Clase que carga gran parte del core
 * 
 */
Ext.define('Melisa.core.Application', {
    alternateClassName: [
        'Melisa.App'
    ],
    
    requires: [
        'Melisa.core.Instanciador',
        'Melisa.core.Loader',
        'Melisa.core.ViewController',
        'Melisa.core.ProfileDesktop',
        'Melisa.core.ProfilePhone'
    ],
    
    singleton: true
    
});
