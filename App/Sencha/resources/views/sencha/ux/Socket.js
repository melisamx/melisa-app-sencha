Ext.define('Melisa.ux.Socket', {
    
    requires: [
        'Melisa.core.Base'
    ],
    
    mixins: [
        'Ext.mixin.Observable',
        'Melisa.core.Base'
    ],
    
    config: {
        socket: null,
        isConnected: false
    },
    
    constructor: function() {
        
        this.mixins.observable.constructor.call(this, arguments);
        
    },
    
    connect: function(url) {
        
        var me = this,
            socket;
        
        if( typeof io === 'undefined') {
            
            return false;
            
        }
        
        socket = io(url || Ext.manifest.melisa.urls.realtime);
        
        me.setSocket(socket);
        me.setIsConnected(true);
        
        socket.on('disconnect', me.onDisconnect.bind(me));
        socket.on('reconnect', me.onReconnect.bind(me));
        
        return me;
        
    },
    
    onDisconnect: function() {
        
        var me = this;
        
        me.log('onDisconnect');
        me.setIsConnected(false);
        me.fireEvent('disconnect', me.getSocket());
        
    },
    
    onReconnect: function() {
        
        var me = this;
        
        me.log('onReconnect');
        me.setIsConnected(true);
        me.fireEvent('reconnect', me.getSocket());
        
    },
    
    emit: function(event, data) {
        
        var me = this;
        
        if( !me.getIsConnected()) {
            
            me.log('no connected ignore send message');
            return false;
            
        }
        
        me.getSocket().emit(event, data);
        
    }    
    
});
