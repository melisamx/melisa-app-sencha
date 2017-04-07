Ext.define('Melisa.view.phone.ButtonLabel', {
    extend: 'Ext.Button',
    alias: 'widget.buttonlabel',
    
    config: {
        iconAlign: 'right',
        textAlign: 'left',
        iconCls: 'x-fa fa-chevron-right',
        description: null
    },
    
    updateDescription: function(description) {
        
        var textElement = this.textElement,
            text = this.getText();
        
        if (textElement) {
            if (text) {
                textElement.show();
                textElement.setHtml(text + '<br><small>' + description + '</small>');
            } else {
                textElement.hide();
            }
        }
        
    }
    
});
