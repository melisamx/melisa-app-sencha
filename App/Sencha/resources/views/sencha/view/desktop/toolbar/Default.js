Ext.define('Melisa.view.desktop.toolbar.Default', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbardefault',
    
    items: [
        '->',
        {
            bind: {
                text: '{i18n.btnSave ? i18n.btnSave : "Guardar"}'
            },
            scale: 'large',
            iconCls: 'x-fa fa-save',
            listeners: {
                click: 'save'
            }
        }
    ]
});
