Ext.define('Melisa.view.phone.menu.Avatars', {
    extend: 'Ext.Container',
    
    requires: [
        'Melisa.view.phone.menu.Avatar'
    ],
    
    alias: 'widget.apppanelavatars',
    cls: 'core-avatars',    
    items: [
        {
            xtype: 'toolbar',
            height: '75%',
            items: [
                {
                    xtype: 'apppanelavatar',
                    data: {
                        url: '/assets/images/powerby.png'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    cls: 'close-session',
                    text: 'Cerrar sesión',
                    iconCls: 'fa x-fa fa-sign-out',
                    handler: function() {
                        
                        window.location = '/panel.php/logout';
                        
                    }
                }
            ]
        },
        {
            xtype: 'button',
            height: '25%',
            scale: 'large',
            width: '100%',
            bind: {
                text: '{user.name}<br><small>{urese.email}</smal>'
            },
            iconAlign: 'right',
            iconCls: 'fa fa-caret-down',
            textAlign: 'left',
            cls: 'avatar-selected'
        }
    ]
    
});
