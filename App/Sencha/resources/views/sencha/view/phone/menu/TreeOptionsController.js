Ext.define('Melisa.view.phone.menu.TreeOptionsController', {
    extend: 'Melisa.view.universal.menu.TreeOptionsController',
    
    onSelectionChange: function() {
        
        this.callParent(arguments);
        
        Ext.first('apppanelmenumodal').hide();
        
    }
    
});
