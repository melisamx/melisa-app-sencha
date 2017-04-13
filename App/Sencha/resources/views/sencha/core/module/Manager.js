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
            module;
    
        if( !moduleConfig) {            
            me.log('invalid config module');
            return false;            
        }
    
        if(typeof moduleConfig.nameSpace === 'undefined') {            
            me.log('no specific namespace module', moduleConfig);
            return false;            
        }
        
        module = me.modules[moduleConfig.nameSpace];
        
        if( module) {            
            me.log('exist module return module', module);
            return module;            
        }
        
        if( Ext.platformTags.modern) {            
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Abriendo módulo'
            });            
        } else {
            Ext.Msg.wait('Abriendo módulo');            
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
        
        if( Ext.isFunction(callback)) {            
            callback(module);            
        }
        
        if( Ext.platformTags.modern) {            
            Ext.Viewport.setMasked(false);            
        }
        
        module.initModule();
        
        return module;
        
    },
    
    launch: function(moduleConfig, callback) {
        
        var me = this,
            module = me.register(moduleConfig, callback);
    
        if( !module) {            
            me.log('class is loading or invalid', moduleConfig);
            return;            
        }
        
        me.log('module exist', module);
        
        /* permit launch class downloaded */
        if( !module.getIsReady()) {            
            me.log('module not is ready');
            return;            
        }
        
        if( Ext.isFunction(callback)) {            
            callback(module);            
        }
        
        me.log('module reboot');
        module.fireEvent('reboot', module);
        
        return module;
        
    }   
    
});
