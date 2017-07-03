Ext.define('Melisa.view.desktop.wrapper.window.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.wrapperWindowAdd',
    
    requires: [
        'Melisa.core.Module'
    ],
    
    mixins: [
        'Melisa.core.Module'
    ],
    
    width: '70%',
    height: '100%',
    minWidth: 600,
    modal: true,
    bbar: {
        xtype: 'toolbardefault'
    }
});
