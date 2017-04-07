Ext.define('Melisa.view.desktop.default.toolbar.Select', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.defaultoolbarselect',
    
    items: [
        '->',
        {
            text: 'Seleccionar',
            scale: 'large',
            iconCls: 'x-fa fa-hand-o-up',
            listeners: {
                click: 'select'
            }
        }
    ]
});
