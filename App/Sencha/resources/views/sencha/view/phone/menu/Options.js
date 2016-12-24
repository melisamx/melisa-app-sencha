Ext.define('Melisa.view.phone.menu.Options', {
    extend: 'Ext.Container',
    
    requires: [
        'Melisa.view.universal.menu.TreeOptions'
    ],
    
    alias: 'widget.apppaneloptions',
    items: [
        {
            xtype: 'apppaneltreeoptions',
            userCls: 'core-menu',
            height: '100%',
            bind: {
                store: '{menuMain}'
            }
        }
    ]
    
});
