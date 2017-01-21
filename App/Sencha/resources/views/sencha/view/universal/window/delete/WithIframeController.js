Ext.define('Melisa.view.universal.window.delete.WithIframeController', {
    extend: 'Melisa.core.ViewController',
    
    requires: [
        'Melisa.core.module.Create'
    ],
    
    mixins: [
        'Melisa.core.module.Create'
    ],
        
    init: function() {
        
        var me = this,
            view = me.getView();
        
        view.on('ready', me.appendFieldsHidden, me, {
            single: true
        });
        
        view.on('loaddata', me.onLoadData, me);
                
    },
    
    onLoadData: function(data, launcher) {
        
        var me = this,
            view = me.getView(),
            event = {
                cancel: false,
                data: data,
                launcher: launcher
            };
            
        if( view.fireEvent('beforeloaddata', data, event) === false || event.cancel) {
            me.log('cancel flow load data', event);
            return;
        }
        
        me.getViewModel().set(data);
        view.show(launcher || null);        
        me.loadRemoteData(data);
        
    },
    
    loadRemoteData: function(data) {
        
        var me = this,
            vm = me.getViewModel();
        
        /* necesary, force get data messageloading, since it does not work  */
        /* Apparently it is because the formula is not used in any component */
        vm.notify();
        
        me.showLoadingMessage(vm.get('messageloading'));
        
        Ext.Ajax.request({
            url: me.getUrlRemoteData(data),
            method: 'GET',
            success: me.onSuccessLoadRemoteData,
            failure: me.onFailureLoadRemoteData,
            scope: me
        });
        
    },
    
    getUrlRemoteData: function(data) {
        
        var me = this,
            vm = me.getViewModel();
    
        return vm.get('modules.report') + data.id + '/json/';
        
    },
    
    onSuccessLoadRemoteData: function(request) {
        
        var me = this,
            view = me.getView(),
            report = Ext.decode(request.responseText, true),
            event = {
                cancel: false,
                report: report
            };
        
        if( view.fireEvent('successloadremotedata', report.data, event) === false || event.cancel) {
            me.log('cancel flow success load remote data', event);
            return;
        }
        
        me.showLoadingMessage(false);
        
        if( report.success) {
            return;
        }
        
        me.closeWindow();
        
    },
    
    closeWindow: function() {
        
        console.log('closeWindow');
        
    },
    
    showLoadingMessage: function() {
        
        console.log('message');
        
    },
    
    appendFieldsHidden: function() {
        
        var me = this,
            form = me.getView().down(Ext.platformTags.modern ? 'formpanel' : 'form'),
            vm = me.getViewModel(),
            fieldsHidden = vm.get('fieldsHidden');
        
        /* no especific id fields, use standard id field */
        if( !fieldsHidden) {
            fieldsHidden = [ 'id' ];
        }
        
        if( Ext.isString(fieldsHidden)) {
            fieldsHidden = [fieldsHidden];
        }
        
        Ext.each(fieldsHidden, function(name) {
           
            form.add({
                xtype: 'textfield',
                hidden: true,
                name: name,
                bind: {
                    value: '{' + name + '}'
                }
            });
            
        });
        
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            view = me.getView().down(Ext.platformTags.modern ? 'formpanel' : 'form'),
            vm = me.getViewModel();
        
        view.getForm().url = vm.get('modules.submit');
        
        me.submitForm(view, vm, extraParams, params);
        
    },
    
    onSuccessSubmit: function(response) {
        
        var me = this,
            view = me.getView(),
            form = view.down(Ext.platformTags.modern ? 'formpanel' : 'form');
        
        form.reset();
        view.fireEvent('successsubmit', response);
        me.closeWindow();
        
    },
    
    onClickBtnCancelar: function() {
        
        var me = this,
            view = me.getView();
    
        if( view.fireEvent('canceled') === false) {
            return;
        }
        
        me.closeWindow();
        
    }
    
});
