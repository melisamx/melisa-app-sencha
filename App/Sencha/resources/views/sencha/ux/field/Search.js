Ext.define('Melisa.ux.field.Search', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.fieldsearch',
    
    config: {
        taskSearch: null,
        delay: 1000
    },
    
    init: function(field) {
        
        var me = this;
        
        field.on('keyup', me.onKeyupField, me);
        
        if( !Ext.platformTags.desktop) {
            
            field.on('clearicontap', me.onKeyupField, me);
            
        }
        
    },
    
    onKeyupField: function() {
        
        var me = this,
            taskSearch = me.getTaskSearch();
        
        if( !taskSearch) {
            
            taskSearch = me.createTaskSearch();
        }
        
        taskSearch.delay(me.getDelay());
        
    },
    
    createTaskSearch: function() {
        
        var me = this,
            task = new Ext.util.DelayedTask(me.onSearch, me);
        
        me.setTaskSearch(task, me);
        return task;
        
    },
    
    onSearch: function() {
        
        var me = this,
            field = me.getCmp(),
            value = field.getValue();
    
        field.fireEvent('search', value, field);
        
    }
    
});
