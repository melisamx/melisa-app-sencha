Ext.define('Melisa.view.desktop.ComboSex', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.combosex',
    
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
                name: 'Masculino'
            },
            {
                id: 0,
                name: 'Femenino'
            }
        ]
    })
    
});
