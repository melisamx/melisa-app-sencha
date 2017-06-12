Ext.define('Melisa.controller.Submit', {
    
    getViewForm: function() {
        
        var me = this,
            view = me.getView(),
            form = typeof view.getForm === 'function' ? view.getForm() : null;
        
        if( form) {
            return view;
        }
        
        /* modern platform */
        if( Ext.platformTags.modern && typeof view.getUrl !== 'undefined') {
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
            vm = me.getViewModel(),
            event = {
                autoShowMessageSuccess: true,
                autoEventSuccess: true,
                autoClose: true
            };
        
        me.log('onSuccessSubmit', arguments);
        
        if(typeof view.getAutoClose === 'function') {
            autoClose = view.getAutoClose();
        }
        
        form.reset();
        view.fireEvent('successsubmit', event, response, action);
        
        if( me.eventSuccess && event.autoEventSuccess) {
            Ext.GlobalEvents.fireEvent(me.eventSuccess, action.result);
        }
        
        if( event.autoShowMessageSuccess && vm.get('i18n.success')) {
            Ext.toast({
                header: false,
                html: '<i class="x-fa fa-check"></i> ' + vm.get('i18n.success'),
                align: 'tr',
                bodyPadding: '15px 10px'
            });
        }
        
        /* in modern platform cause error navigation */
        if( event.autoClose && Ext.platformTags.classic) {
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
