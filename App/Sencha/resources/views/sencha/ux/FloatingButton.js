Ext.define('Melisa.ux.FloatingButton', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.floatingbutton',
    
    config: {
        configButton: {},
        align: 'tr-br',
        offset: [ -40, -85],
        button: null
    },
    
    init: function(component) {
        
        var me = this;
        
        component.on({
            render: me.onRender, 
            resize: me.showByButton,
            scope: me
        });
        
    },
    
    showByButton: function() {
        
        var me = this,
            cmp = me.getCmp(),
            align = me.getAlign(),
            offset = me.getOffset(),
            button = me.getButton();
    
        if( !button) {
            return;
        }
        
        button.showBy(cmp, align, offset);
        
    },
    
    onRender: function() {
        
        var me = this;
        
        /* necesary or not render correct */
        Ext.defer(me.onRenderFake, 1, me);
        
    },
    
    onRenderFake: function() {
        
        var me = this,
            cmp = me.getCmp(),
            configButton = me.getConfigButton();
        
        me.setButton(cmp.add(me.createButton(configButton)));
        me.showByButton();
        
    },
    
    createButton: function(config) {
        return Ext.applyIf(config, {
            xtype: 'button',
            cls: 'floating-button',
            scale: 'large',
            floating: true,
            shadow: false
        });
    }
    
});
