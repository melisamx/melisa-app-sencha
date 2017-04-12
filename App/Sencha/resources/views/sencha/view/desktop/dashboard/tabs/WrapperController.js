Ext.define('Melisa.view.desktop.dashboard.tabs.WrapperController', {
    extend: 'Melisa.view.desktop.dashboard.WrapperController',
        
    requires: [
        'Melisa.view.desktop.dashboard.WrapperController'
    ],
    
    config: {
        windowAccount: null
    },
    
    onClickBtnUser: function(button) {
        
        var me = this,
            windowAccount = me.getWindowAccount();
    
        if( !windowAccount) {
            me.setWindowAccount(windowAccount = me.createWindowAccount());
        }
        
        windowAccount.showBy(button, 'tr-br?');
        
    },
    
    createWindowAccount: function() {
        
        var me = this;
    
        return Ext.create('widget.tooltip', {
            layout: 'anchor',
            cls: 'window-account',
            ui: 'white',
            width: 355,
            height: 200,
            maxHeight: 500,
            minHeight: 82,
            autoHide: false,
            shadow: false,
            autoScroll: true,
            floating: true,
            items: [
                {
                    xtype: 'container',
                    padding: '14 12',
                    margin: '0 0 5',
                    cls: 'identity-container',
                    height: 130,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    }
                }
            ],
            bbar: [
                '->',
                {
                    text: 'Cerrar sessión',
                    handler: me.closeSession,
                    scope: me
                }
            ]
        });
            
    },
    
    onCloseModule: function(module) {
        
        Melisa.core.module.Manager.unRegister(Ext.getClassName(module));
        
    },
    
    onActivateModule: function(options, module) {
        
        var me = this,
            main = Ext.first('apppanelcenter'),
            moduleModel = module.getViewModel();
        
        /* necesary if not added in panel center */
        if( !main.down(module)) {
            module.setTitle(module.getViewModel().get('wrapper.title'));
            module.setClosable(true);
            module.on('close', me.onCloseModule, me, {
                single: true
            });
            
            if(typeof module.isWindow === 'undefined') {
                main.add(module);
            }
            
        }
        
        if( typeof module.isWindow !== 'undefined') {
            module.show();
        } else {
            main.setActiveItem(module);
        }
        
        me.getViewModel().set({
            moduleActive: {
                title: moduleModel.get('wrapper.title'),
                nameSpace: Ext.getClassName(module)
            }
        });
        
    }
    
});