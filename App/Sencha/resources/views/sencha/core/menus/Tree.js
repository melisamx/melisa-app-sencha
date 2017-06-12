Ext.define('Melisa.core.menus.Tree', {
    extend: 'Melisa.core.Menus',
    
    requires: [
        'Melisa.core.Menus'
    ],
    
    singleton: true,
    
    config: {
        propertyChildren: 'children',
        autoExpandChildrens: true,
        iconScale: 'small'
    },
    
    /*
     * necesary for singleton class
 */
    constructor: function() {
        this.initConfig(arguments);
    },
    
    createStructOption: function(option, configMenu) {
        
        var me = this,
            sourceChildren = me.getSourceChildren(),
            autoExpandChildrens = me.getAutoExpandChildrens(),
            iconScale = me.getIconScale();
        
        if( typeof option[sourceChildren] !== 'undefined' && option[sourceChildren].length > 0) {
            
            option.expanded = autoExpandChildrens;
            
        } else {
            
            option.leaf = true;
            
        }
        
        option.iconCls = option.icon[iconScale];
        option.qtip = option.name;
        
        delete option.icon;
        
    }
    
});
