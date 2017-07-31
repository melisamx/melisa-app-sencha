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
    
    constructor: function () {        
        var me = this;
        
        me.callParent(arguments);
        
        me.listConfig = Ext.applyIf(me.listConfig || {
            cls: 'x-grid-empty'
        }, {
            cls: 'x-grid-empty',
            emptyText: 'Dato no encontrado'
        });
    }
});
