Ext.define('Melisa.view.desktop.wrapper.window.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.wrapperWindowAdd',
    
    requires: [
        'Melisa.core.Module'
    ],
    
    mixins: [
        'Melisa.core.Module'
    ],
    
    layout: 'fit',
    bodyPadding: 0,
    modal: true,
    bbar: {
        xtype: 'toolbardefault'
    }
});
