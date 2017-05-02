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
    
    config: {
        handlersClass: [
            'Ext.Button',
            'Ext.button.Button',
            'Ext.form.field.Text',
            'Ext.form.field.ComboBox',
            'Melisa.view.desktop.ComboDefault'
        ]
    },
    
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
    
    activateMainModule: function(component) {
        
        var me = this,
            view = me.getView(),
            lastModule = view.getLastModule(),
            event = {
                cancel: false,
                lastModule: lastModule
            };
    
        me.log('activateMainModule', component, lastModule);
        
        if( !lastModule) {
            console.log('no last module');
            return;            
        }
        
        if( view.fireEvent('beforeactivatelastmodule', event) === false || event.cancel) {
            me.log('cancel activate module');
            return;
        }
        
        Ext.GlobalEvents.fireEvent('activatemodule', {}, lastModule);
        return;
        view.setLastModule(null);
        /* necesary change url */
        lastModule.redirectToModule();
        
    },
    
    activateModule: function(module) {
        
        Ext.GlobalEvents.fireEvent('activatemodule', {}, module);
        
    },
    
    closeModule: function(component) {
        
        var me = this;
        
        me.getView().setClosingModule(true);
        me.activateMainModule(component);
        
    },
    
    moduleRun: function(config, callbackOnReady, callbackOnReboot, params, scope) {
        
        var me = this,
            classHandlers = me.getHandlersClass(),
            options = {
                single: true
            },
            className = Ext.getClassName(config),
            launcher;
        
        if( classHandlers.indexOf(className) !== -1) {
            launcher = config;
            config = config.getMelisa();
        } else if( typeof config.getMelisa !== 'undefined') {
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
        console.log('onLaunchModuleReboot', module);
        me.fireModuleLoaded(options, module);
        me.onActivateModule(options, module);
        
    },
    
    onLaunchModuleReady: function(options, module) {
        
        var me = this;
        console.log('onLaunchModuleReady', module);
        me.fireModuleLoaded(options, module);
        me.onActivateModule(options, module);
        
    },
    
    fireModuleLoaded: function(options, module) {
        
        var me = this,
            classHandlers = me.getHandlersClass(),
            className = Ext.getClassName(options.launcher);
    
        me.log('fire module loaded', {
            options: options, 
            module: module, 
            classHandlers: classHandlers, 
            className: className,
            view: me.getView()
        });
    
        module.setLastModule(me.getView());
        
        if( Ext.isFunction(options.callbackOnReady)) {
            Ext.callback(options.callbackOnReady, me, [ module, options ]);
        }
        
        if( classHandlers.indexOf(className) !== -1) {
            options.launcher.fireEvent('loaded', module, options);
        } else if(typeof options.launcher.getMelisa !== 'undefined') {
            options.launcher.fireEvent('loaded', module, options);
        }
        
    },
    
    onActivateModule: function(options, module) {
        
        var me = this;
        
        me.log('onActivateModule', arguments);
        
        if( !me.fireEvent('beforeactivatemodule', options, module)) {
            me.log('cancel activate module', options, module);
            return;
        }
        
        if( module.getIsAutoShow()) {
            Ext.GlobalEvents.fireEvent('activatemodule', options, module);
        } else {
            me.log('no auto show module', options, module);
        }
        
    }
        
});
