Ext.define('Melisa.controller.ResetButtonField', {
    
    resetButtonsField: function() {
        
        var me = this,
            view = me.getView();
            
        Ext.each(view.query('buttonfield'), function(button) {
            button.reset();
        }); 
        
    }
    
});
