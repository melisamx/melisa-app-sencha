Ext.define('Melisa.ux.confirmation.Button', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.buttonconfirmation',
    
    config: {
        url: null,
        titleConfirmation: 'Confirmación requerida',
        titleError: 'Atención',
        titleWait: null,
        messageConfirmation: '¿Realmente desea eliminar?',
        messageWait: 'Espere un momento...',
        messageError: 'Imposible realizar la acción, intentelo nuevamente',
        source: 'grid',
        params: [],
        token: null,
        refreshSourceSuccess: true
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
            source = me.getCmp().up(me.getSource()),
            selection = source.getSelection(),
            params = me.getInputParams(),
            token = source.getViewModel().get('token');
        
        if( Ext.isEmpty(selection)) {
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
            source = me.getCmp().up(me.getSource()),
            selection = source.getSelection();
        
        if( Ext.isEmpty(selection)) {
            return false;
        }
        
        return {
            id: selection[0].get('id')
        };
        
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
        
        me.setUrl(config.url);
        
        me.showMessageWait();        
        me.createRequest();
        
    },
    
    createRequest: function() {
        
        var me = this;
        
        Ext.Ajax.request({
            url: me.getUrl(),
            params: me.getParams(),
            method: 'POST',
            success: me.onSuccessAction,
            failure: me.onFailureAction,
            headers: {
                'X-CSRF-TOKEN': me.getToken()
            },
            scope: me
        });
        
    },
    
    onSuccessAction: function() {
        
        var me = this;
        
        me.closeMessageWait();
        
        if( !me.getRefreshSourceSuccess()) {
            return;
        }
        
        me.getCmp().up(me.getSource()).getStore().reload();
        
    },
    
    onFailureAction: function() {
        
        var me = this;
        
        me.closeMessageWait();
        Ext.Msg.alert(me.getTitleError(), me.getMessageError());
        console.log(arguments);
        
    },
    
    showMessageWait: function() {
        
        var me = this;        
        Ext.Msg.wait(me.getMessageWait(), me.getTitleWait());
        
    },
    
    closeMessageWait: function() {
            
        Ext.Msg.close();
        
    }
    
});
