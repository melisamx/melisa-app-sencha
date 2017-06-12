Ext.define('Melisa.view.desktop.default.WindowReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.melisaDefaultWindowReport',
    
    requires: [
        'Melisa.ux.Iframe'
    ],
    
    width: '80%',
    height: '100%',
    closeAction: 'hide',
    layout: 'fit',
    maskClickAction: 'hide',
    modal: true,
    draggable: false,
    bodyPadding: 0,
    viewModel: {},
    bind: {
        title: '{title}'
    },
    items: [
        {
            xtype: 'uxiframe',
            bind: {
                src: '{url}{id}'
            }
        }
    ],
    tbar: [
        '->',
        {
            iconCls: 'x-fa fa-print',
            text: 'Imprimir',
            handler: 'onClickPrintReport'
        }
    ],
    controller: {
        onClickPrintReport: function(button) {
            button.up('panel').down('uxiframe').print();
        }
    }
});
