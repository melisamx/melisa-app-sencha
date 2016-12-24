Ext.define('Melisa.core.module.Create', {
    
    save: function() {
        
        var me = this,
            view = me.getView(),
            model = me.getViewModel(),
            form = view.down('form');
        
        if( !form.isValid()) {
            
            return false;
            
        }
        
        view.setLoading(model.get('i18n.frmMessageLoading'));
        
        form.submit({
            url: model.get('urlSubmit'),
            success: me.onSuccessSubmit,
            failure: me.onErrorSubmit,
            scope: me
        });
        
    },
    
    onSuccessSubmit: function() {},
    
    onErrorSubmit: function() {
        
        var me = this,
            view = me.getView();
        
        view.setLoading(false);
                
    }
    
});
