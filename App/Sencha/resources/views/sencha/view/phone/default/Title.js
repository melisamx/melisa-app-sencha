Ext.define('Melisa.view.phone.default.Title', {
    extend: 'Ext.Toolbar',
    alias: 'widget.defaulttitle',
    
    requires: [
        'Melisa.ux.field.Search'
    ],    
    
    hideAnimation: 'fadeOut',
    docked: 'top',
    layout: 'hbox',
    showAnimation: 'fadeIn',
    publishes: [
        'hidden'
    ],
    
    constructor: function(config) {
        
        var me = this;
        
        me.callParent(arguments);
        
        me.addBtnReturn(config);
        
    },
    
    addBtnReturn: function(config) {
        
        if( !config.buttonReturn) {
            config.buttonReturn = {
                text: config.text
            };
        }
        
        this.add(Ext.applyIf(config.buttonReturn, {
            iconCls: 'x-fa fa fa-chevron-left',
            itemId: 'btnReturn'
        }));
        
    }
    
});
