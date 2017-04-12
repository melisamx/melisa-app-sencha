Ext.define('Melisa.view.desktop.menu.Modal', {
    extend: 'Ext.window.Window',
    alias: 'widget.apppanelmenumodal',
    
    requires: [
        'Melisa.view.phone.menu.Avatars',
        'Melisa.view.phone.menu.Options'
    ],
    
    closeAction: 'hide',
    cls: 'core-modal',
    scrollable: 'vertical',
    height: '100%',
    maskClickAction: 'hide',
    modal: true,
    title: false,
    closable: true,
    draggable: false,
    showAnimation: {
        type: 'slide',
        direction: 'right'
    },
    items: [
        {
            xtype: 'apppanelavatars',
            height: '30%',
            minHeight: 220
        },
        {
            xtype: 'apppaneloptions',
            height: '70%'
        }
    ]
    
});