Ext.define('Melisa.core.Menus', {
    
    requires: [
        'Melisa.core.Base'
    ],
    
    mixins: [
        'Melisa.core.Base'
    ],
    
    config: {
        sourceChildren: 'items',
        propertyChildren: 'items'
    },
    
    build: function(options, configMenu) {
        
        return this.createStructMenu(options, configMenu);
        
    },    
    
    getOptionDefault: function(configMenu) {
        
        return Ext.applyIf(configMenu || {}, {});
        
    },    
    
    createStructMenu: function(options, configMenu) {
        
        var me = this,
            menuStruct = [],
            sourceChildren = me.getSourceChildren(),
            propertyChildren = me.getPropertyChildren();
    
        if( !Array.isArray(options)) {
            
            options = [ options ];
            
        }
    
        me.log('before create struct menu', options);
        
        Ext.each(options, function(option) {
            
            if( typeof option[sourceChildren] !== 'undefined' && option[sourceChildren].length > 0) {
                
                me.createStructOption(option, configMenu);
                option[propertyChildren] = me.createStructMenu(option[sourceChildren], configMenu);
                
                if( propertyChildren !== sourceChildren) {
                    
                    delete option[sourceChildren];
                    
                }
                
                menuStruct.push(option);
                return true;
                
            }
            
            me.createStructOption(option, configMenu);
            
            if( typeof option.module!== 'undefined' && !option.module.allowed) {
                me.log('ignore option is not allowed', option);
                return true;
            }
            
            menuStruct.push(option);
            
        });
        
        me.log('created struct menu', menuStruct);
        
        return menuStruct;
        
    },
    
    createStructOption: function(option, configMenu) {
        
        
    }
    
});
