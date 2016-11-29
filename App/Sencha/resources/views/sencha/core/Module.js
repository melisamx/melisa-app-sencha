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
        
        me.on('reboot', me.onReboot, me);
        me.getViewModel().setData(config.data); 
        me.setIsReady(true);
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
    
    onReboot: function() {
        
        console.log('reboot', arguments);
        /* necesary or never show */
        this.getEl().removeCls('x-hidden-offsets');
        this.show();
        
    }
    
});
