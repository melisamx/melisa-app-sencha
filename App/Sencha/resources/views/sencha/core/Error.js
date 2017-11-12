Ext.define('Melisa.core.Error', {
    singleton: true,
    
    config: {
        title: null,
        messageUnknown: null
    },
    
    constructor: function() {
        var me = this,
            defaults = me.getDefaults();
        
        me.reconfigure(defaults);        
        Ext.on('error.ajax', me.ajax, me);
    },
    
    reconfigure: function(customConfig) {
        var me = this,
            defaults = me.getDefaults();
        
        me.setTitle(customConfig.title || defaults.title);
        me.setMessageUnknown(customConfig.messageUnknown || defaults.messageUnknown);
    },
    
    getDefaults: function() {
        return {
            title: 'Atención',
            messageUnknown: 'Error innesperado'
        };
    },
    
    ajax: function(result, customConfig) {
        var me = this,
            response = Ext.decode(result.responseText, true);
    
        if( Ext.isObject(customConfig)) {
            me.reconfigure(customConfig);
        } else {
            me.reconfigure({});
        }
        
        if( !response) {
            me.responseUnknown(result);
        }
        
        me.processErrors(response.errors || []);
    },
    
    responseUnknown: function() {
        console.log('responseUnknown', arguments);
    },
    
    errorMessageUnknown: function() {
        console.log('errorMessageUnknown', arguments);
    },
    
    errorsEmpty: function() {
        console.log('errorsEmpty', arguments);
    },
    
    processErrors: function(errors) {
        var me = this,
            messages = [];
        
        Ext.each(errors, function(error) {
            if( !error.message) {
                me.errorMessageUnknown(error, errors);
                return false;
            }
            
            messages.push(error.message);
        });
        
        if( Ext.isEmpty(messages)) {
            me.errorsEmpty(errors);
            return;
        }
        
        me.showError(messages.join('<br>'));
    },
    
    showError: function(error) {
        var me = this;
        console.log(me.getTitle(), error);
        Ext.Msg.alert(me.getTitle(), error);
    }
});