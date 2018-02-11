Ext.define('Melisa.view.phone.default.WindowReport', {
    extend: 'Ext.Container',
    alias: 'widget.melisaDefaultWindowReport',
    
    requires: [
        'Melisa.view.phone.Iframe'
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
