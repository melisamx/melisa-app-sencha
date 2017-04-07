Ext.define('Melisa.view.desktop.window.Modal', {
    extend: 'Ext.window.Window',
    
    config: {
        isAutoShow: false
    },
    
    width: '70%',
    height: '80%',
    closeAction: 'hide',
    layout: 'fit',
    modal: true
});
