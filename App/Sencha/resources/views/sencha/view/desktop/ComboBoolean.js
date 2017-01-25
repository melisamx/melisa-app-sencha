Ext.define('Melisa.view.desktop.ComboBoolean', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboboolean',
    
    displayField: 'name',
    pageSize: null,
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
