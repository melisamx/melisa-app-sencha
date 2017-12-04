Ext.define('Melisa.override.Button', {
    override: 'Ext.Button',
    
    config: {
        melisa: null,
        record: null
    },
    
    publishes: [
        'melisa',
        'record'
    ]
    
});
