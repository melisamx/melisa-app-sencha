Ext.define('Melisa.core.module.Manager', {
    singleton: true,
    
    modules: {},
    
    unRegister: function(nameSpace) {
        
        var me = this,
            module = me.modules[nameSpace];
        
        if( !module) {
            
            console.log('no exist module');
            return;
            
        }
        
        if( !module.fireEvent('beforeclosemodule')) {
            
            return false;
                        
        }
        
        delete me.modules[nameSpace];
        module.destroy();
        return true;
        
    },
    
    register: function(moduleConfig, callback) {
        
        var me = this,
            module = me.modules[moduleConfig.nameSpace];
        
        if( module) {
            
            return module;
            
        }
        
        if( !Ext.ClassManager.get(moduleConfig.nameSpace)) {
            
            Ext.require(moduleConfig.nameSpace, function() {
                
                me.register(moduleConfig, callback);
                
            }, me);
            
            return;
            
        }
        
        module = me.modules[moduleConfig.nameSpace] = Ext.create(moduleConfig.nameSpace);
        module.setConfigModule(moduleConfig);
        callback(module);
        module.initModule();
        
        return module;
        
    },
    
    launch: function(moduleConfig, callback) {
        
        var me = this,
            module = me.register(moduleConfig, callback);
    
        if( !module) {
            console.log('module no exist');
            return;
            
        }
        
        console.log('module exist', module);
        
        /* permit launch class downloaded */
        if( !module.getIsReady()) {
            console.log('module no is ready');
            return;
            
        }
        
        console.log('module reboot');
        module.fireEvent('reboot');
        
        return module;
        
    }   
    
});