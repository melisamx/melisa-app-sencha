Ext.define('Melisa.controller.Submit', {
    
    getForm: function() {
        
        if( Ext.platformTags.modern) {
            return this.getView();
        } else {
            return this.getView().down('form');
        }
        
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            view = me.getView(),
            model = me.getViewModel();
        
        if( typeof view.isWindow !== 'undefined' && view.isWindow) {
            view = view.down('form');
        }
        
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
    
    onSuccessSubmit: function(response) {
        
        var me = this,
            view = me.getView(),
            event = {
                autoClose: true
            };
        console.log('onSuccessSubmit');    
        if(typeof view.getAutoClose === 'function') {
            autoClose = view.getAutoClose();
        }
        
        if( typeof view.isWindow !== 'undefined' && view.isWindow) {
            view = view.down('form');
        }
        
        view.reset();
        view.fireEvent('successsubmit', event, response);
        
        if( event.autoClose) {
            me.getView().close();
        }
        
    },
    
    onErrorSubmit: function(form, action) {        
        console.log('onErrorSubmit', arguments);        
        var me = this,
            view = me.getView();
             
        view.fireEvent('errorsubmit', form, action);
        
    }
    
});
