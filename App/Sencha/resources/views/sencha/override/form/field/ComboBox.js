Ext.define('Melisa.override.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',
    
    config: {
        melisa: null,
        displayField: 'name',
        valueField: 'id',
        pageSize: 25,
        minChars: 1
    },
    publishes: [
        'melisa'
    ],
    
    constructor: function (config) {
        
        var me = this;
        
        me.listConfig = Ext.applyIf(config.listConfig, {
            cls: 'x-grid-empty',
            emptyText: 'Dato no encontrado'
        });
        
        me.callParent(arguments);
        
    }
});
