Ext.define('Melisa.core.module.Create', {
    
    save: function() {
        
        var me = this,
            view = me.getView(),
            model = me.getViewModel();
        
        view.submit({
            /* necesary use bind, scope use me.setMasked */
            success: me.onSuccessSubmit.bind(me),
            failure: me.onErrorSubmit.bind(me),
            waitMsg: model.get('i18n.saving'),
            
            /* necesary laravel csrf */
            headers: {
                'X-CSRF-TOKEN': model.get('token')
            }
        });
        
    },
    
    onSuccessSubmit: function() {
        console.log('onSuccessSubmit');
        var me = this,
            view = me.getView();
        
        view.reset();
        
    },
    
    onErrorSubmit: function() {
        
        console.log('onErrorSubmit', arguments);
        
        var me = this,
            view = me.getView();
             
    }
    
});
