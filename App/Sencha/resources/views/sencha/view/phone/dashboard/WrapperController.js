Ext.define('Melisa.view.phone.dashboard.WrapperController', {
    extend: 'Melisa.view.universal.dashboard.WrapperController',
    
    requires: [
        'Melisa.view.universal.dashboard.WrapperController',
        'Melisa.view.phone.menu.Modal',
        'Melisa.core.module.Manager'
    ],
    
    routes: {
        home: 'onRouteShowHome'
    },
    
    onGlobalActivateModule: function(options, module) {
        
        var me = this,
            activeModule = Ext.Viewport.getActiveItem();
        
        me.log('on activate module', module);
        
        if( !module) {            
            me.redirectTo('home');
            return;            
        }
        
        Ext.Viewport.setActiveItem(module);
        
        if( typeof activeModule.getCloseDestroy !== 'undefined' 
                && activeModule.getCloseDestroy() && 
                /* necesary or not activate extern module */
                typeof activeModule.getClosingModule !== 'undefined' && 
                activeModule.getClosingModule()) {
            
            /* better performance */
            try {
                Melisa.core.module.Manager.unRegister(Ext.getClassName(activeModule));
            } catch (e) {

            }
            
        }       
        
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
        console.log('onChangeHistory');
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
        console.log('onRouteShowHome');
        Ext.Viewport.setActiveItem(me.getView());
        me.navigateCard('apppanelbody');
        
    },
    
    navigateCard: function(component) {
        console.log('navigateCard');
        var me = this,
            view = me.getView(),
            cmp = me.lookupReference(component);
        
        view.setActiveItem(cmp);
        return cmp;
        
    }
    
});
