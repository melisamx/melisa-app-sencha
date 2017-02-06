Ext.define('Melisa.view.desktop.window.confirmation.WithReport', {
    extend: 'Ext.window.Window',
    
    requires: [
        'Melisa.view.desktop.window.confirmation.WithReportController',
        'Melisa.core.Module'
    ],
    
    mixins: [
        'Melisa.core.Module'
    ],
    
    config: {
        isAutoShow: false
    },
    
    controller: 'windowconfirmationwithreportcontroller',
    width: '70%',
    height: '80%',
    closeAction: 'hide',
    layout: 'fit',
    modal: true,
    viewModel: {
        formulas: {
            messageloading: {
                
                get: function() {
                    
                    var vm = this,
                        messageLoading = vm.get('i18n.messageLoading');
                        
                    if( messageLoading) {
                        return messageLoading;
                    } else {
                        return 'Obteniendo datos necesarios';
                    }

                }
                
            },
            iconbutton: {
                
                get: function() {
                    
                    var vm = this,
                        iconCls = vm.get('btnPrimary.iconCls');
                    
                    if( iconCls) {
                        return iconCls;
                    } else {
                        return 'x-fa fa-trash';
                    }
                    
                }
                
            },
            
            report: {
                /* is necesary, detect changes in id */
                bind: '{id}',
                get: function() {
                    
                    var vm = this;
                    
                    return vm.get('modules.report') + vm.get('id') + '/html/';
                    
                }
            }
        }
    },
    bind: {
        title: '{wrapper.title}'
    },
    items: [
        {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'uxiframe',
                    flex: 1,
                    bind: {
                        src: '{report}'
                    }
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            scale: 'large',
            bind: {
                text: '{i18n.btnPrimary.text}',
                iconCls: '{iconbutton}'
            },
            listeners: {
                click: 'save'
            }           
        },
        {
            iconCls: 'x-fa fa-ban',
            scale: 'large',
            text: 'Cancelar',
            listeners: {
                click: 'onClickBtnCancelar'
            }
        }
    ]
    
});
