Ext.define('Melisa.ux.google.maps.MarkerLabel', {
    singleton: true,
    
    constructor: function() {
        
        var MarkerLabel = function(options) {
                
                this.setValues(options);
                this.span = document.createElement('span');
                this.span.className = 'map-marker-label';

            };
        
        if(!window.google) {
            
            return;
            
        }
        
        MarkerLabel.prototype = Ext.applyIf(new google.maps.OverlayView(), {
            onAdd: function() {
                this.getPanes().overlayImage.appendChild(this.span);
                var self = this;
                this.listeners = [
                    google.maps.event.addListener(this, 'position_changed', function() { 
                        self.draw();    
                    })
                ];
            },
            draw: function() {
                var text = String(this.get('text'));
                var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
                this.span.innerHTML = text;
                this.span.style.left = position.x + 'px';
                this.span.style.top = position.y + 'px';
            }
        });
        
        google.maps.Marker.prototype.setLabel = function(label) {
            
            if ( !this.isFirts) {
                
                this.label = new MarkerLabel({
                    map: this.map,
                    marker: this,
                    text: label
                });
                
                this.label.bindTo('position', this, 'position');
                this.isFirts = true;
                
            } else {
                
                this.label.text = label;
                this.label.span.innerHTML = label;
                
            }
            
        };
        
    }
    
});
