Ext.define('Melisa.core.module.Manager', {
    singleton: true,
    
    requires: [
        'Melisa.core.Base'
    ],
    
    mixins: [
        'Melisa.core.Base'
    ],
    
    modules: {},
    
    unRegister: function(nameSpace) {
        
        var me = this,
            module = me.modules[nameSpace],
            result;
        console.log(module);
        if( !module) {
            
            me.log('no exist module', me.modules);
            return;
            
        }
        
        result = module.fireEvent('beforeclosemodule');
        
        if( result === false) {
            
            me.log('cancel un unregister');
            return false;
            
        }
        
        me.log('module delete', nameSpace);
        delete me.modules[nameSpace];
        module.destroy();
        me.log('module destroy', me.modules);
        return true;
        
    },
    
    get: function(nameSpace) {
        
        var me = this,
            module = me.modules[nameSpace];
        
        if( !module) {
            
            return false;
            
        }
        
        return module;
        
    },
    
    register: function(moduleConfig, callback) {
        
        var me = this,
            module = me.modules[moduleConfig.nameSpace];
        
        if( module) {
            
            me.log('exist module return module', module);
            return module;
            
        }
        
        if( !Ext.ClassManager.get(moduleConfig.nameSpace)) {
            
            me.log('no exist class, require', moduleConfig.nameSpace);
            
            Ext.require(moduleConfig.nameSpace, function() {
                
                me.log('class loaded', moduleConfig.nameSpace);
                
                me.register(moduleConfig, callback);
                
            }, me);
            
            return;
            
        }
        
        me.log('register module', moduleConfig);
        
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
            
            me.log('class is loading', moduleConfig.nameSpace);
            return;
            
        }
        
        me.log('module exist', module);
        
        /* permit launch class downloaded */
        if( !module.getIsReady()) {
            
            me.log('module not is ready');
            return;
            
        }
        
        me.log('module reboot');
        module.fireEvent('reboot', module);
        
        return module;
        
    }   
    
});