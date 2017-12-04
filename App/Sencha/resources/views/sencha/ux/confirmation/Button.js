Ext.define('Melisa.ux.confirmation.Button', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.buttonconfirmation',
    
    requires: [
        'Melisa.core.Error'
    ],
    
    config: {
        url: null,
        titleConfirmation: 'Confirmación requerida',
        titleError: 'Atención',
        titleWait: null,
        messageConfirmation: '¿Realmente desea eliminar?',
        messageWait: 'Espere un momento...',
        messageError: 'Imposible realizar la acción, intentelo nuevamente',
        messageSuccess: null,
        source: 'grid',
        params: [],
        token: null,
        refreshSourceSuccess: true,
        restFull: false,
        restFullMethod: 'DELETE',
        fieldId: 'id',
        fieldIdRecord: 'id'
    },
    
    init: function(button) {        
        var me = this;
        
        button.on({
            click: me.onClickBtnConfirmation,
            scope: me
        });        
    },
    
    onClickBtnConfirmation: function() {        
        var me = this,
            button = me.getCmp(),
            params = me.getInputParams(),
            token = button.getViewModel().getParent().get('token');
        
        if( Ext.isEmpty(params)) {
            return;
        }
        
        if( !params || !token) {
            console.log('Unspecified action parameters or token');
            return;
        }
        
        me.setParams(params);
        me.setToken(token);
        
        Ext.Msg.confirm(me.getTitleConfirmation(),
            me.getMessageConfirmation(), 
            me.onCallBack, 
            me);        
    },
    
    getInputParams: function() {        
        var me = this,
            button = me.getCmp(),
            buttonVm = button.getViewModel(),
            fieldId = me.getFieldId(),
            fieldIdRecord = me.getFieldIdRecord(),
            params = {};
        
        params [fieldId]= buttonVm.get('record').get(fieldIdRecord);
        return params;        
    },
    
    onCallBack: function(response) {        
        var me = this,
            config = me.getCmp().getMelisa();
        
        if( response !== 'yes') {
            return;
        }
        
        if( !config) {
            console.log('invalid config');
            return;
        }
        
        if( me.getRestFull()) {
            urlTemplate = new Ext.Template(config.url);
            me.setUrl(urlTemplate.apply(me.getParams()));
        } else {
            me.setUrl(config.url);
        }
        
        me.showMessageWait();        
        me.createRequest();        
    },
    
    createRequest: function() {        
        var me = this;
        
        Ext.Ajax.request({
            url: me.getUrl(),
            params: me.getParams(),
            method: me.getRestFull() ? me.getRestFullMethod() : 'POST',
            success: me.onSuccessAction,
            failure: me.onFailureAction,
            headers: {
                'X-CSRF-TOKEN': me.getToken()
            },
            scope: me
        });        
    },
    
    onSuccessAction: function(response) {        
        var me = this,
            result = Ext.decode(response.responseText, true);
    
        if( !result || !result.success) {
            me.emitErrorAjax(response);
            return;
        }
        
        me.closeMessageWait();
        me.showMessageSuccess(me.getMessageSuccess());
        
        if( !me.getRefreshSourceSuccess()) {
            return;
        }
        
        me.getCmp().up(me.getSource()).getStore().reload();
    },
    
    showMessageSuccess: function(message) {
        if( !message) {
            return;
        }
        
        Ext.toast({
            html: '<i class="x-fa fa-check"></i> ' + message,
            align: 'tr',
            bodyPadding: '15px 10px',
            header: false
        });
    },
    
    onFailureAction: function(response) {        
        var me = this,
            result = Ext.decode(response.responseText);
        
        me.closeMessageWait();
        me.emitErrorAjax(result);
    },
    
    emitErrorAjax: function(result) {
        var me = this;
        Ext.fireEvent('error.ajax', result, {
            title: me.getTitleError(),
            messageUnknown: me.getMessageError()
        });
    },
    
    showMessageWait: function() {        
        var me = this;        
        Ext.Msg.wait(me.getMessageWait(), me.getTitleWait());        
    },
    
    closeMessageWait: function() {            
        Ext.Msg.close();        
    }
    
});
