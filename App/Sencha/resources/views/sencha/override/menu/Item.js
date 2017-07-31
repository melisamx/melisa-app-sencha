Ext.define('Melisa.override.menu.Item', {
    override: 'Ext.menu.Item',
    
    config: {
        melisa: null
    },
    
    publishes: [
        'melisa'
    ]
    
});
