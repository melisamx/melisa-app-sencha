Ext.define('Melisa.view.universal.menu.TreeOptionsController', {
    extend: 'Ext.app.ViewController',
    
    requires: [
        'Melisa.core.module.Manager'
    ],
   
    alias: 'controller.apppaneltreeoptions',
   
    init: function(view) {
        
        var me = this;

        view.on({
            selectionchange: me.onSelectionChange,
            scope: me
        });
        
    },
    
    onSelectionChange: function(cmp, node) {
        
        var me = this;
        
        if( !node) {            
            return;            
        }
        
        if( !node.data.module) {            
            return;            
        }
        
        me.alternativeNameSpace(node.data.module);
        
    },
    
    alternativeNameSpace: function(module) {
        
        var me = this;
        
        Melisa.core.module.Manager.launch(module, function(module) {
            
            me.getView().setSelection(null);
            
            if( module.getIsReady()) {
                
                module.on('reboot', me.onRebootModule, me, {
                    single: true
                });
                
            } else {
                
                module.on('ready', me.onRebootModule, me, {
                    single: true
                });
                
            }
            
        });
        
    },
    
    onRebootModule: function(module) {
        
        Ext.first('apppanelmenumodal').hide();
//        this.activateMainModule();
//        Ext.GlobalEvents.fireEvent('activatemodule', {}, module);
        
    }
    
});
