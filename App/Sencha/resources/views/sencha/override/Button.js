Ext.define('Melisa.override.Button', {
    override: 'Ext.Button',
    
    config: {
        melisa: null
    },
    
    publishes: [
        'melisa'
    ]
    
});
