Ext.define('Melisa.view.phone.menu.Options', {
    extend: 'Ext.Container',
    alias: 'widget.apppaneloptions',
    
    requires: [
        'Melisa.view.universal.menu.TreeOptions'
    ],
    
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
