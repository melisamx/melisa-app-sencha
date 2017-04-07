Ext.define('Melisa.core.module.Assets', {
    singleton: true,
    
    config: {
        queue: null,
        loading: false,
        callback: null
    },
    
    load: function(assets, callback) {
        
        var me = this,
            items = [];
        
        Ext.each(assets, function(asset) {
            if( asset.idAssetType === 2) {
                Ext.util.CSS.swapStyleSheet(asset.id, asset.url);
            } else {
                items.push(asset);
            }
        });
        
        if( Ext.isFunction(callback)) {
            me.setCallback(callback);
        }
        
        if( Ext.isEmpty(items)) {
            return me.callCallback();
        }
        
        me.createQueue().addAll(items);
        
    },
    
    callCallback: function() {
        
        var me = this,
            callback = me.getCallback();
    
        if( !callback) {
            return;
        }
        
        Ext.callback(callback);
        
    },
    
    createQueue: function() {
        
        var me = this,
            queue = me.getQueue();
    
        if( queue) {
            return queue;            
        }
        
        queue = Ext.create('Ext.util.MixedCollection', {
            listeners: {
                add: me.onAddItemQueue,
                scope: me
            }
        });
        
        me.setQueue(queue);
        return queue;
        
    },
    
    onAddItemQueue: function() {
        
        var me = this;
        
        if( me.getLoading()) {
            console.log('ignore load item queue');
            return;
        }
        
        me.setLoading(true);
        me.nextLoadAsset();
        
    },
    
    nextLoadAsset: function() {
        
        var me = this,
            queue = me.getQueue(),
            first = queue.first();
        
        if( !first) {
            me.callCallback();
            return;
        }
        
        Ext.Loader.loadScript({
            url: first.url,
            onLoad: me.onLoadScript,
            scope: me
        });
        
    },
    
    onLoadScript: function(result) {
        
        var me = this,
            queue = me.getQueue();
    
        queue.removeAt(0);
        me.setLoading(false);
        me.nextLoadAsset();
        
    }
    
});
