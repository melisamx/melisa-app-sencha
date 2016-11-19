
Ext.define('Melisa.override.List', {
    override:'Ext.dataview.List',
    
    updateHeaderMap: function() {
        
        var me = this,
            headerMap = me.headerMap,
            headerIndices = me.headerIndices,
            header, i, item;

        headerMap.length = 0;
        for (i in headerIndices) {
            if (headerIndices.hasOwnProperty(i)) {
                /* parche  */
//                console.log('aaa', me.getItemAt(i)); retorna null
//                console.log('bbb', me.getItemAt(i).getHeader());
                if( !(item = me.getItemAt(i))) {
                    continue;
                }
                header = me.getItemAt(i).getHeader();
                headerMap.push(header.renderElement.dom.offsetTop);
            }
            
        }
        
    }
});
