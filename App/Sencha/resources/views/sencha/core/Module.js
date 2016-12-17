Ext.define('Melisa.core.Module', {
    
    requires: [
        'Melisa.core.Base',
        'Melisa.core.module.Manager'
    ],
    
    mixins: [
        'Melisa.core.Base'
    ],
    
    config: {
        initialized: false,
        isReady: false,
        configModule: {}
    },
    
    initModule: function() {
        
        var me = this,
            config = me.getConfigModule();
    
        me.log('init module', config);
        
        if(me.getInitialized()) {
            
            console.log('module initialized');
            return;
            
        }
        
        me.setInitialized(true);
        me.on('ready', me.onReady, me);
        
        if( typeof config.url === 'undefined' || Ext.isEmpty(config.url)) {
            
            me.log('disabled get remote config but no specific url config');
            me.moduleRemoteConfig = false;
            
        }
        
        if( typeof me.moduleRemoteConfig !== 'undefined' && !me.moduleRemoteConfig) {
            
            me.log('disabled get remote config');
            me.setIsReady(true);
            me.on('reboot', me.onReboot, me);
            me.fireEvent('ready', me, config);
            return;
            
        }
        
        Ext.Ajax.request({
            url: config.url,
            method: 'GET',
            success: me.onSuccessGetConfigModule,
            failure: me.onFailureGetConfigModule,
            scope: me
        });
        
    },
    
    onSuccessGetConfigModule: function(request) {        
        
        var me = this,
            config = Ext.decode(request.responseText, true);
        
        if( !config || typeof config.data === 'undefined') {
            
            me.fireEvent('errorgetconfig', request);
            return;
            
        }
        
        if( Ext.isArray(config.assets)) {
            
            me.loadAsset(config.assets);
            
        }
        
        me.getViewModel().setData(config.data);
        me.setIsReady(true);
        me.on('reboot', me.onReboot, me);
        me.fireEvent('ready', me, config);
        
    },
    
    loadAsset: function(assets) {
        
        Ext.each(assets, function(asset) {
            
            if(asset.idAssetType === 2) Ext.util.CSS.swapStyleSheet(asset.id, asset.url);
            else Ext.Loader.loadScript(asset.url);
            
        });
        
    },
    
    onFailureGetConfigModule: function() {
        
        console.log('onFailureGetConfigModule', arguments);
        
    },
    
    onReady: function() {
        
        this.redirectToModule();
        
    },
    
    redirectToModule: function() {
        
        var me = this,
            model = me.getViewModel(),
            route = model.get('route'),
            controller = me.getController(),
            isCurrent,
            token = Ext.ClassManager.getName(me);
    
        if( route) {
            
            me.redirectTo(route);
            return;
            
        }
        
        if( controller) {
            
            controller.redirectTo(token);
            return;
            
        }
        
        /* 
         * extract to
         * http://docs.sencha.com/extjs/6.2.0/modern/src/BaseController.js.html#Ext.app.BaseController-method-redirectTo
         * 
         */
        
        isCurrent = Ext.util.History.getToken() === token;
        
        if( !isCurrent) {
            
            Ext.util.History.add(token);
            
        } else {
            
            Ext.app.route.Router.onStateChange(token);
            
        }
        
    },
    
    onReboot: function() {
        
        var me = this;
        
        console.log('reboot', arguments);
        
        if( Ext.platformTags.classic) {
            
            /* necesary or never show */
            me.getEl().removeCls('x-hidden-offsets');
            me.show();
            
        }
        
        me.redirectToModule();
        
    }
    
});
