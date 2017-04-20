Ext.define('Melisa.view.desktop.default.RadioGroupSiNo', {
    extend: 'Ext.form.RadioGroup',
    alias: 'widget.defaultradiogroupsino',
    
    labelAlign: 'top',
    columns: 2,
    items: [
        { boxLabel: 'Si', inputValue: 1 },
        { boxLabel: 'No', inputValue: 0, checked: true}
    ]
});
