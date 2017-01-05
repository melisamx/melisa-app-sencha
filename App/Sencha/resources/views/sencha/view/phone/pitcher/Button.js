Ext.define('Melisa.view.phone.pitcher.Button', {
    extend: 'Ext.Container',
    alias: 'widget.pitcherbutton',
    
    requires: [
        'Melisa.view.phone.pitcher.ButtonController'
    ],
    
    config: {
        name: 'pitcher',
        text: 'Seleccionar',
        melisa: null
    },
    
    reference: 'pitcher',
    controller: 'pitcherbutton',
    layout: 'vbox',
    publishes: [
        'name',
        'text',
        'melisa'
    ],
    viewModel: {
        data: {
            fieldHidden: null,
            itemSelected: null,
            buttonText: 'Seleccionar'
        }
    },
    items: [
        {
            xtype: 'button',
            bind: {
                text: '{buttonText}',
                melisa: '{pitcher.melisa}'
            },
            listeners: {
                tap: 'onTapBtnPitcher'
            }
        },
        {
            xtype: 'textfield',
            hidden: true,
            bind: {
                name: '{fieldHidden}',
                value: '{itemSelected}'
            }
        }
    ]
    
});
