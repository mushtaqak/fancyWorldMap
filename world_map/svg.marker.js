// svg.marker.js 0.1 - Copyright (c) 2013 Kalley Powell - Licensed under the MIT license
;(function() {

  SVG.Marker = function() {
    this.constructor.call(this, SVG.create('marker'));
  };

  // Inherit from SVG.Container
  SVG.Marker.prototype = new SVG.Container();

  // Add marker method to containers
  SVG.extend(SVG.Container, {
    marker: function(width, height) {
      // Set the default viewbox to match the width and height, and set orient to auto
      return this.put(new SVG.Marker().size(width, height).viewbox(0, 0, width, height).attr('orient', 'auto'));
    }
  });

  // Save a reference to old attr method
  var oldAttr = SVG.Element.prototype.attr;
  SVG.extend(SVG.Element, {
    attr: function(a, v, n) {
      // If someone is setting marker-end, marker-middle, or marker-start to an instance, make proper adjustments
      if ( typeof(a) === 'string' && a.match(/^marker/) && v instanceof SVG.Marker ) {
        v = 'url(#' + v.attr('id') + ')';
      }
      return oldAttr.call(this, a, v, n);
    }
  });

}).call(this);