Ext.define('Melisa.ux.grid.Filters', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.autofilters',
    
    requires: [
        'Melisa.ux.field.StoreFilter',
        'Melisa.view.desktop.ComboBoolean'
    ],
    
    config: {
        docked: 'top',
        filters: {},
        filtersIgnore: [],
        toolbarConfig: {},
        fields: []
    },
    
    init: function(grid) {
        
        var me = this;
        
        me.grid = grid;
        
        me.createFilters();
        
    },
    
    createFilters: function() {
        
        var me = this,
            grid = me.grid,
            filters = [],
            column,
            filters = me.getFilters(),
            filtersIgnore = me.getFiltersIgnore(),
            inputFilters = [],
            store = me.grid.getStore(),
            i,
            defaultXtype = {
                datecolumn: 'datefield',
                booleancolumn: 'comboboolean'
            };
        
        for(i in grid.columnManager.getColumns()) {
            
            column = grid.columns[i];
            
            if( !filters[column.dataIndex]) {                
                filters[column.dataIndex] = {};                
            }
            
            if( filtersIgnore.indexOf(column.dataIndex) !== -1) {                
                continue;
            }
            
            inputFilters.push(Ext.create(Ext.apply({}, filters[column.dataIndex], {
                xtype: defaultXtype[column.xtype] ? defaultXtype[column.xtype] : 'textfield',
                emptyText: column.text,
                itemId: 'autofilter-' + column.dataIndex,
                flex: column.flex ? column.flex : null,
                width: column.width ? column.width : null,
                hidden: column.isHidden(),
                plugins: [
                    {
                        ptype: 'fieldstorefilter',
                        id: 'fieldstorefilter',
                        queryParam: column.dataIndex,
                        store: store,
                        operator: filters[column.dataIndex].operator ? 
                            filters[column.dataIndex].operator : '=',
                        minChars: filters[column.dataIndex].minChars ? 
                            filters[column.dataIndex].minChars : 3
                    }
                ]
            })));
            
        }
        
        me.setFields(inputFilters);
        
        grid.addDocked(Ext.apply({}, me.getToolbarConfig(), {
            xtype: 'toolbar',
            border: false,
            docked: me.getDocked(),
            items: inputFilters
        }));
        
        grid.on({
            columnhide: me.onColumnToogle,
            columnshow: me.onColumnToogle,
            reconfigure: me.onReconfigureGrid,
            scope: me
        });
        
    },
    
    onReconfigureGrid: function(grid, store) {
        
        var me = this;

        Ext.each(me.getFields(), function(field) {
            
            field.getPlugin('fieldstorefilter').setStore(store);
            
        });
        
    },
    
    onColumnToogle: function(hc, column) {
        
        var me = this,
            filter = me.grid.down('#autofilter-' + column.dataIndex);
    
        if( !filter) {
            return;            
        }
        
        column.isHidden() ? filter.hide() : filter.show();
        
    }
    
});
