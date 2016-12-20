Ext.define('Melisa.core.ViewController', {
    extend: 'Ext.app.ViewController',
    
    requires: [
        'Melisa.core.module.Manager'
    ],
    
    mixins: !Ext.platformTags.classic ? [
        'Melisa.core.Base',
        'Melisa.ux.Navigate'
    ] : [
        'Melisa.core.Base'
    ],
    
    init: function() {
        
        var me = this,
            view = me.getView(),
            renderEvent = Ext.platformTags.modern ? 'painted' : 'render';
    
        view.on(renderEvent, me.onRender, me, {
            single: true
        });
        
    },
    
    onRender: function() {},
    
    showError: function(title, message, callback, scope) {
        
        Ext.Msg.alert(title, message, callback, scope);
        
    },
    
    activateMainModule: function() {
        
        this.activateModule();
        
    },
    
    activateModule: function(module) {
        
        Ext.GlobalEvents.fireEvent('activatemodule', module);
        
    },
    
    moduleRun: function(config, callbackOnReady, callbackOnReboot, params, scope) {
        
        var me = this,
            options = {
                single: true
            };
        
        if( !Ext.isFunction(callbackOnReady)) {
            
            callbackOnReady = Ext.emptyFn;
            
        }
        
        if( !Ext.isFunction(callbackOnReboot)) {
            
            callbackOnReboot = Ext.emptyFn;
            
        }
        
        if( params) {
            
            options.args = Ext.isArray(params) ? params : [ params ];
            
        }
                
        Melisa.core.module.Manager.launch(config, function(module) {
            
            if( module.getIsReady()) {
                
                module.on('reboot', callbackOnReady, scope | me, options);
                
            } else {
                
                module.on('ready', callbackOnReboot, scope | me, options);
                
            }
            
        });
        
    }
        
});
