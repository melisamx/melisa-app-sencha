Ext.define('Melisa.override.form.field.Time', {
    override: 'Ext.form.field.Time',
    
    config: {
        submitFormat: 'H:i',
        format: 'H:i'
    },
    
    listeners: {
        /* fix error field */
        select : function(field, record) {
            field.setValue(record.get('disp'));
        }
    }
});
