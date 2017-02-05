Ext.define('Melisa.override.form.field.Text', {
    override: 'Ext.form.field.Text',
    
    labelAlign: 'top',
    
    config: {
        melisa: null
    },
    
    publishes: [
        'melisa'
    ]
});
