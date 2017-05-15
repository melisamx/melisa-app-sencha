Ext.define('Melisa.override.field.Number', {
    override: 'Ext.field.Number',
    
    getValue: function() {
        var value = parseFloat(this.callParent(), 10);
        return (isNaN(value)) ? '' : value;
    }
    
});
