Ext.define('Melisa.core.module.Select', {
    
    config: {
        pitcher: null,
        pitcherEvent: null
    },
    
    onDisclose: function(list, record) {
        
        var me = this,
            pitcher = me.getPitcher(),
            pitcherEvent = me.getPitcherEvent();
        
        if( !pitcher) {
            
            Ext.raise({
                msg: 'Pitcher no defined',
                'error code': 1
            });
            
        }
        
        if( !Ext.isString(pitcherEvent)) {
            
            Ext.raise({
                msg: 'Pitcher event no defined',
                'error code': 2
            });
            
        }
        
        pitcher.fireEvent(pitcherEvent, record);
        
    },
    
    onDisplay: function (pitcher, event) {
        
        this.setPitcher(pitcher);
        this.setPitcherEvent(event);
        
    }
    
});
