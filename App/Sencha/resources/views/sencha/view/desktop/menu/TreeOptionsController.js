Ext.define('Melisa.view.desktop.menu.TreeOptionsController', {
    extend: 'Melisa.view.universal.menu.TreeOptionsController',
    
    alias: 'controller.apppaneltreeoptions',
    
    requires: [
        'Melisa.view.universal.menu.TreeOptionsController'
    ],
    
    onReadyModule: function(module) {
        
        var me = this,
            main = Ext.first('apppanelcenter');
        
        main.add(module);
        me.updateModuleActive(module);        
        module.on('reboot', me.updateModuleActive, me);
        
    },
    
    updateModuleActive: function(module) {
        
        var me = this,
            main = Ext.first('apppanelcenter'),
            moduleModel = module.getViewModel();
        
        main.setActiveItem(module);
        me.getViewModel().set({
            moduleActive: {
                title: moduleModel.get('wrapper.title'),
                nameSpace: Ext.getClassName(module)
            }
        });
        
    },
    
    onRebootModule: function(module) {
        
        console.log('onRebootModule', module);
        
    }
    
});
