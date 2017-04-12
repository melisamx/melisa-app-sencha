Ext.define('Melisa.view.desktop.dashboard.WrapperController', {
    extend: 'Melisa.view.universal.dashboard.WrapperController',
    
    requires: [
        'Melisa.view.universal.dashboard.WrapperController',
        'Melisa.view.desktop.menu.Modal'
    ],
    
    showMainMenu: function() {
        
        var me = this,
            menu = me.getMenu();
        
        menu.showAt(0, 0);
        
    }
    
});