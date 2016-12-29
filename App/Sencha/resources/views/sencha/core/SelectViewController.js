Ext.define('Melisa.core.SelectViewController', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.selectcontroller',
    
    requires: [
        'Melisa.core.module.Select'
    ],
    
    mixins: [
        'Melisa.core.module.Select'
    ]
        
});
