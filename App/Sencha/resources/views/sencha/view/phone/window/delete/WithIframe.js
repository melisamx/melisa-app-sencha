Ext.define('Melisa.view.phone.window.delete.WithIframe', {
    extend: 'Ext.form.Panel',
    
    requires: [
        'Melisa.view.phone.window.delete.WithIframeController',
        'Melisa.view.phone.Iframe',
        'Melisa.core.Module'
    ],
    
    mixins: [
        'Melisa.core.Module'
    ],
    
    config: {
        isAutoShow: false
    },
    
    controller: 'windowdeletecontroller',
    layout: 'fit',
    bodyPadding: 0,
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
            
            report: function(get) {
                return get('modules.report') + get('id') + '/html/';
            }
        }
    },
    bind: {
        url: '{modules.submit}'
    },
    items: [
        {
            xtype: 'titlebar',
            docked: 'top',
            items: [
                {
                    iconCls: 'x-fa fa fa-chevron-left',
                    listeners: {
                        tap: 'activateMainModule'
                    },
                    bind: {
                        text: '{wrapper.title}'
                    }
                }
            ]
        },
        {
            xtype: 'uxiframe',
            flex: 1,
            bind: {
                src: '{report}'
            }            
        },
        {
            xtype: 'titlebar',
            docked: 'bottom',
            items: [
                {
                    iconCls: 'x-fa fa-ban',
                    scale: 'large',
                    text: 'Cancelar',
                    listeners: {
                        tap: 'onClickBtnCancelar'
                    }
                },
                {
                    scale: 'large',
                    align: 'right',
                    bind: {
                        text: '{i18n.btnPrimary.text}',
                        iconCls: '{iconbutton}'
                    },
                    listeners: {
                        tap: 'save'
                    }           
                }
            ]
        }
    ]
    
});
