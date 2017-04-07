Ext.define('Melisa.view.phone.default.List', {
    extend: 'Ext.dataview.List',    
    alias: 'widget.defaultlist',
    
    loadingText: 'Obteniendo registros',
    emptyText: 'No hay registros',
    hideAnimation: 'fadeOut',
    deferEmptyText: true,
    striped: true,
    onItemDisclosure: true,
    itemTpl: '{name}',
    publishes: [
        'hidden'
    ],
    plugins: [
        {
            xclass: 'Ext.plugin.PullRefresh',
            pullText: 'Jala hacia abajo y suelta para refrescar.'
        },
        {
            xclass: 'Ext.plugin.ListPaging',
            noMoreRecordsText: 'Ho hay mas registros',
            autoPaging: true
        }
    ],
    showAnimation: {
        type: 'slide',
        direction: 'right'
    }
});
