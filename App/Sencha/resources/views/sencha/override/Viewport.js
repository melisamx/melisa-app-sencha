
Ext.override(Ext.viewport.Default, {
        
    determineOrientation: function() {
        var me = this,
            portrait = me.PORTRAIT,
            landscape = me.LANDSCAPE;
        
        if (!Ext.os.is.Android && me.supportsOrientation()) {

            if (me.getWindowOrientation() % 180 === 0) {

                return portrait;

            }

            return landscape;
        }
        /* fix correct window orientation  */
        else if(Ext.os.is.Android && typeof me.getWindowOrientation() !== 'undefined') {

            return me.getWindowOrientation() === 0 ? portrait : landscape;

        } else {
            if (me.getWindowHeight() >= me.getWindowWidth()) {

                return portrait;
            }

            return landscape;
        }

    }
});

Ext.define('Melisa.override.Viewport', {});
