Ext.define('Melisa.override.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    
    labelAlign: 'top',
    uncheckedValue: 0,
    
    config: {
        melisa: null
    },
    
    publishes: [
        'melisa'
    ]
});
