Ext.define('Melisa.view.universal.menu.TreeOptionsController', {
    extend: 'Ext.app.ViewController',
   
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
                
                module.on('ready', me.onReadyModule, me, {
                    single: true
                });
                
            }
            
        });
        
    },
    
    onRebootModule: function(module) {
        
        var main = Ext.first('apppanelmain');
        
        Ext.first('apppanelmenumodal').hide();
        main.setActiveItem(module);
        
    },
    
    onReadyModule: function(module) {
        
        var main = Ext.first('apppanelmain');
        
        Ext.first('apppanelmenumodal').hide();
        main.setActiveItem(module);
        
    }
    
});
