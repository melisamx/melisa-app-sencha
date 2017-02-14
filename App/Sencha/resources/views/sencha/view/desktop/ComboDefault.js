Ext.define('Melisa.view.desktop.ComboDefault', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.combodefault',
    
    displayField: 'name',
    minChars: 1,
    pageSize: null,
    forceSelection: true,
    typeAhead: true,
    store: Ext.create('Ext.data.Store', {
        fields: [ 'id', 'name' ],
        proxy: {
            type: 'memory'
        }
    })
    
});
