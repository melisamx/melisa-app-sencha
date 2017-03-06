Ext.define('Melisa.controller.Submit', {
    
    getViewForm: function() {
        
        var me = this,
            view = me.getView(),
            form = typeof view.getForm === 'function' ? view.getForm() : null;
    
        if( form) {
            return view;
        }
        
        return view.down('form');
        
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            model = me.getViewModel();
        
        me.submitForm(me.getViewForm(), model, extraParams, params);
        
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
            success: Ext.bind(me.onSuccessSubmit, me),
            failure: Ext.bind(me.onErrorSubmit, me),
            waitMsg: model.get('i18n.saving'),
            
            /* necesary laravel csrf */
            headers: {
                'X-CSRF-TOKEN': model.get('token')
            },
            params: extraParams === true ? params : null
        });
        
    },
    
    onSuccessSubmit: function(response, action) {
        
        var me = this,
            view = me.getView(),
            form = me.getViewForm(),
            event = {
                autoClose: true
            };
        console.log('onSuccessSubmit');    
        if(typeof view.getAutoClose === 'function') {
            autoClose = view.getAutoClose();
        }
        
        form.reset();
        view.fireEvent('successsubmit', event, response, action);
        
        if( event.autoClose) {
            view.close();
        }
        
    },
    
    onErrorSubmit: function(form, action) {        
        console.log('onErrorSubmit', arguments);        
        var me = this,
            view = me.getView();
             
        view.fireEvent('errorsubmit', form, action);
        
    }
    
});
