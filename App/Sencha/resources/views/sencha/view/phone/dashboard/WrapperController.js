Ext.define('Melisa.view.phone.dashboard.WrapperController', {
    extend: 'Melisa.view.universal.dashboard.WrapperController',
    
    requires: [
        'Melisa.view.universal.dashboard.WrapperController',
        'Melisa.view.phone.menu.Modal'
    ],
    
    routes: {
        home: 'onRouteShowHome'
    },
    
    onActivateModule: function(options, module) {
        
        var me = this;
        
        me.log('on activate module', module);
        
        if( !module) {            
            me.redirectTo('home');
            return;            
        }
        
        Ext.Viewport.setActiveItem(module);
        
    },
    
    addMenuToViewport: function(menu) {
        Ext.Viewport.add(menu);
    },
    
    onRender: function() {
        
        var me = this,
            config = Ext.manifest.melisa;
        
        me.callParent();
        
        Ext.History.on('change', me.onChangeHistory, me);
        Ext.GlobalEvents.on('showcard', me.onGlobalShowCard, me);
        Ext.Loader.loadScript(config.urls.realtime);
        
    },
    
    onChangeHistory: function(route) {
        
        var me = this;
        
        if( route) {            
            return;            
        }
        
        /* con esto evitamos botón retroceso de android */
        me.redirectTo('home');
        return false;
        
    },
    
    onGlobalShowCard: function(card) {        
        this.navigateCard(card);        
    },
    
    onRouteShowHome: function() {
        
        var me = this;
        
        Ext.Viewport.setActiveItem(me.getView());
        me.navigateCard('apppanelbody');
        
    },
    
    navigateCard: function(component) {
        
        var me = this,
            view = me.getView(),
            cmp = me.lookupReference(component);
        
        view.setActiveItem(cmp);
        return cmp;
        
    }
    
});
