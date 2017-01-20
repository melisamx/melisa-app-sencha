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
        console.log(Ext.getClassName(view.superclass));
        view.on(renderEvent, me.onRender, me, {
            single: true
        });
        
    },
    
    onRender: function() {},
    
    showError: function(title, message, callback, scope) {
        
        Ext.Msg.alert(title, message, callback, scope);
        
    },
    
    activateMainModule: function() {
        
        var me = this,
            view = me.getView(),
            lastModule = view.getLastModule();
        
        me.activateModule(lastModule);
        
        if( !lastModule) {
            
            return;
            
        }
        
        view.setLastModule(null);
        /* necesary change url */
        lastModule.redirectToModule();
        
    },
    
    activateModule: function(module) {
        
        Ext.GlobalEvents.fireEvent('activatemodule', module);
        
    },
    
    moduleRun: function(config, callbackOnReady, callbackOnReboot, params, scope) {
        
        var me = this,
            options = {
                single: true
            },
            className = Ext.getClassName(config),
            launcher;
        
        if( className === 'Ext.Button' || className === 'Ext.button.Button') {
            launcher = config;
            config = config.getMelisa();
        }
        
        if( params) {
            options.args = Ext.isArray(params) ? params : [ params ];            
        }
        
        Melisa.core.module.Manager.launch(config, Ext.bind(me.onLaunchModule, me, [{
            launcher: launcher,
            params: params,
            scope: scope,
            callbackOnReady: Ext.isFunction(callbackOnReady) ? callbackOnReady : Ext.emptyFn,
            callbackOnReboot: Ext.isFunction(callbackOnReboot) ? callbackOnReboot : Ext.emptyFn
        }], 0));
        
    },
    
    onLaunchModule: function(options, module) {
        
        var me = this;
        
        if( module.getIsReady()) {
            module.on('reboot', Ext.bind(me.onLaunchModuleReboot, me, [ options ], 0), me, {
                single: true
            });
        } else {
            module.on('ready', Ext.bind(me.onLaunchModuleReady, me, [ options ], 0), me, {
                single: true
            });
        }
        
    },
    
    onLaunchModuleReboot: function(options, module) {
        
        var me = this;
        
        me.fireModuleLoaded(options, module);
        me.onActivateModule(options, module);
        
    },
    
    onLaunchModuleReady: function(options, module) {
        
        var me = this;
        
        me.fireModuleLoaded(options, module);
        me.onActivateModule(options, module);
        
    },
    
    fireModuleLoaded: function(options, module) {
        
        var me = this,
            className = Ext.getClassName(options.launcher);
    
        module.setLastModule(me.getView());
        
        if( Ext.isFunction(options.callbackOnReady)) {
            Ext.callback(options.callbackOnReady, me, [ module, options ]);
        }
        
        if( className === 'Ext.Button' || className === 'Ext.button.Button') {
            options.launcher.fireEvent('loaded', module, options);
        }
        
    },
    
    onActivateModule: function(options, module) {
        
        var me = this;
        
        me.log('onActivateModule', arguments);
        
        if( !me.fireEvent('beforeactivatemodule', module)) {
            console.log('cancel activate module');
            return;
        }
        
        if( module.getIsAutoShow()) {
            Ext.GlobalEvents.fireEvent('activatemodule', module);
        }
        
    }
        
});
