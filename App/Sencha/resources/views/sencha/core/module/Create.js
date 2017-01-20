Ext.define('Melisa.core.module.Create', {
    
    save: function(extraParams, params) {
        
        var me = this,
            view = me.getView(),
            model = me.getViewModel();
        
        me.submitForm(view, model, extraParams, params);
        
    },
    
    submitForm: function(view, model, extraParams, params) {
        
        var me = this;
        
        if( !Ext.platformTags.modern &&  !view.isValid()) {
            console.log('formulario invalido');
            return false;
        }
        
        view.submit({
            url: Ext.platformTags.modern ? view.getUrl() : view.getForm().url,
            /* necesary use bind, scope use me.setMasked */
            success: me.onSuccessSubmit.bind(me),
            failure: me.onErrorSubmit.bind(me),
            waitMsg: model.get('i18n.saving'),
            
            /* necesary laravel csrf */
            headers: {
                'X-CSRF-TOKEN': model.get('token')
            },
            params: extraParams === true ? params : null
        });
        
    },
    
    onSuccessSubmit: function(response) {
        console.log('onSuccessSubmit');
        var me = this,
            view = me.getView();
        
        view.reset();
        view.fireEvent('successsubmit', response);
        
    },
    
    onErrorSubmit: function(form, action) {
        
        console.log('onErrorSubmit', arguments);
        
        var me = this,
            view = me.getView();
             
        view.fireEvent('errorsubmit', form, action);
        
    }
    
});
