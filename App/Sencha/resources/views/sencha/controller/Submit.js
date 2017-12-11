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
        
        if( !Ext.platformTags.modern && !view.isValid()) {
            console.log('formulario invalido sera');
            me.higlightError(view);
            return false;
        }
        
        view.submit({
            url: Ext.platformTags.modern ? view.getUrl() : view.getForm().url,
            /* necesary use bind, scope use me.setMasked */
            success: Ext.bind(me.onSuccessSubmit, me),
            failure: Ext.bind(me.onErrorSubmit, me),
            waitMsg: model.get('i18n.saving'),
            timeout: 9999,
            
            /* necesary laravel csrf */
            headers: {
                'X-CSRF-TOKEN': model.get('token')
            },
            params: extraParams === true ? params : null
        });
        
    },
    
    higlightError: function(form) {
        var invalidFields = form.query('field{isValid()==false}');
    
        if( Ext.isEmpty(invalidFields)) {
            console.log('no invalid fields');
            return;
        }
        
        Ext.Msg.alert('Formulario invalido', [
            'El campo ',
            '<b>',
            invalidFields[0].fieldLabel,
            '</b>',
            invalidFields[0].activeError
        ].join(''), function() {
            invalidFields[0].focus();
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
            view = me.getView(),
            result;
             
        if( !view.fireEvent('errorsubmit', form, action)) {
            console.log('cancel logic error sumit');
            return;
        }
        
        result = Ext.decode(action.response.responseText, true);
        
        if( !result) {
            console.log('invalid josn');
            return;
        }
        
        me.processErrors(result.errors);
    },
    
    processErrors: function(errors) {
        var me = this,
            message = [];
        Ext.each(errors, function(error) {
            message.push(error.message);
        });
        
        me.showError('Imposible completar acción', message.join('<br>'));
    }
    
});
