Ext.define('Melisa.ux.gmd.list.Cards', {
    extend: 'Melisa.core.Menus',
    
    requires: [
        'Melisa.core.Menus'
    ],
    
    singleton: true,
    
    /*
     * necesary for singleton class
 */
    constructor: function() {
        this.initConfig(arguments);
    },
    
    createStructOption: function(option, configMenu) {
        
        var me = this,
            actions = option.actions || [];
        
        option = {
            xtype: 'gmdcard',
            items: [
                {
                    xtype: 'gmdcardactions',
                    defaults: {
                        align: 'right',
                        xtype: 'gmdbuttonaction'
                    },
                    items: actions
                }
            ]
        };
        
    }
    
});
