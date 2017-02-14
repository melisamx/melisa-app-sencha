Ext.define('Melisa.view.desktop.toolbar.Default', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.toolbardefault',
    
    items: [
        '->',
        {
            text: 'Guardar',
            scale: 'large',
            iconCls: 'x-fa fa-save',
            listeners: {
                click: 'save'
            }
        }
    ]
});
