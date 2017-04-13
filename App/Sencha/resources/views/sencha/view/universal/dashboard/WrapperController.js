Ext.define('Melisa.view.universal.dashboard.WrapperController', {
    extend: 'Melisa.core.ViewController',
    
    requires: [
        'Melisa.core.ViewController',
        'Melisa.ux.Loader',
        'Melisa.core.menus.Tree',
        'Melisa.core.module.Manager',
        'Melisa.ux.avatar.LocalStorage'
    ],
    
    listen: {
        global: {
            activatemodule: 'onGlobalActivateModule'
        }
    },
    
    onRender: function() {
        
        var me = this,
            vm = me.getViewModel(),
            menuMain = vm.getStore('menuMain'),
            config = Ext.manifest.melisa,
            options;
    
        if( !Ext.isEmpty(config.menu)) {
            options = Melisa.core.menus.Tree.build(config.menu);
            menuMain.getRoot().appendChild(options);
        }
        
        vm.set(config);
        
    },
    
    closeSession: function() {
        window.location = 'logout';
    },
    
    showMainMenu: function() {
        
        var me = this,
            menu = me.getMenu();
        
        me.log('show main menu');
        menu.show();
        
    },
    
    getMenu: function() {
        
        var me = this;
        
        if( !me.menu) {
            
            me.menu = Ext.create('widget.apppanelmenumodal', {
                viewModel: me.getViewModel()
            });
            me.menu.down('apppaneltreeoptions').on({
                selectionchange: me.onSelectionChange,
                scope: me
            });
            
            me.log('menu created', me.menu);
            me.addMenuToViewport(me.menu);
            
        }
        
        return me.menu;
        
    },
    
    addMenuToViewport: function() {
        console.log('addMenuToViewport rewrite method');
    },
    
    onSelectionChange: function(tree, node) {
        
        var me = this;
        
        if( !node) {            
            return;
        }
        
        if( !node.data.module) {            
            return;            
        }
        
        tree.setMelisa(node.data.module);
        tree.setSelection(null);
        Ext.first('apppanelmenumodal').hide();
        me.moduleRun(tree);
        
    }    
    
});