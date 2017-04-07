Ext.define('Melisa.view.desktop.ComboBoolean', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboboolean',
    
    displayField: 'name',
    minChars: 1,
    pageSize: null,
    forceSelection: true,
    typeAhead: true,
    store: Ext.create('Ext.data.Store', {
        fields: [ 'id', 'name' ],
        proxy: {
            type: 'memory'
        },
        data: [
            {
                id: 1,
                name: 'Si'
            },
            {
                id: 0,
                name: 'No'
            }
        ]
    })
    
});
