Ext.define('Melisa.core.module.Select', {
    
    config: {
        pitcher: null,
        pitcherEvent: null,
        pitcherEventCancel: null
    },
    
    onCancelSelect: function(button) {
        
        var me = this,
            pitcher = me.getPitcher(),
            pitcherEventCancel = me.getPitcherEventCancel();
    
        if( !me.isValidPitcher(pitcher)) {
            
            return false;
            
        }
        
        if( !pitcherEventCancel) {
            
            me.log('not defined cancel event, only active previus module');
            me.activateModule(pitcher.getView());
            return;
            
        }
        
        me.log('on cancel select', pitcher, pitcherEventCancel);
        pitcher.fireEvent(pitcherEventCancel, me);
        
    },
    
    onDisclose: function(list, record) {
        
        var me = this,
            pitcher = me.getPitcher(),
            pitcherEvent = me.getPitcherEvent();
    
        /* necesary by button pitcher */
        me.getView().fireEvent('itemselect', record);
        
        if( !me.isValidPitcher(pitcher)) {
            
            return;
            
        }
        
        if( !Ext.isString(pitcherEvent)) {
            
            Ext.raise({
                msg: 'Pitcher event no defined',
                'error code': 2
            });
            
            return false;
            
        }
        
        me.log('onDisclose  picher', pitcher, pitcherEvent, record);
        pitcher.fireEvent(pitcherEvent, record ? record : []);
        
    },
    
    isValidPitcher: function(pitcher) {
        
        if( !pitcher) {
            
            Ext.raise({
                msg: 'Pitcher no defined',
                'error code': 1
            });
            return false;
            
        }
        
        return true;
        
    },
    
    onDisplay: function (pitcher, event, eventCancel) {
        
        this.setPitcher(pitcher);
        this.setPitcherEvent(event);
        this.setPitcherEventCancel(eventCancel);
        
    }
    
});
