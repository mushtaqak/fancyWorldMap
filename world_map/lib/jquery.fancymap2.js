(function ($) {
  
  var map;

  function in_array(needle, haystack, argStrict) {
	  var key = '',
	    strict = !! argStrict;
	  if (strict) {
	    for (key in haystack) {
	      if (haystack[key] === needle) {
	        return true;
	      }
	    }
	  } else {
	    for (key in haystack) {
	      if (haystack[key] == needle) {
	        return true;
	      }
	    }
	  }
	  return false;
  }

  function createWorldMap(params){

  	var markers = params.markers;
  	var elm = params.elm;

  	var addMarkerMode = false;
	var markersSelected = [];

  	
    var markerIndex = markers.length || 0,
        markersCoords = markers || {};

	map = new jvm.WorldMap({
	    container: $(elm),
	    map: 'world_mill_en',
	    markers: markers,
		markerStyle: {
			initial: {
			  	fill: 'red'
			},
			selected: {
				fill: 'blue'
			}
		},
		zoomOnScroll: true,
	    regionsSelectable: true,
	    markersSelectable: true,
	    markersSelectableOne: true,

	    onMarkerLabelShow: function(event, label, index){
           	label.text('('+markersCoords[index].lat.toFixed(2)+','+markersCoords[index].lng.toFixed(2)+')');
	    },
	    onMarkerOver: function(event, index){
	      	console.log('marker-over', index);
	    },
	    onMarkerOut: function(event, index){
	      	console.log('marker-out', index);
	    },
	    onMarkerClick: function(event, index){
	    	// convert to function
	      	console.log('marker-click', index);
	      	// get point(x,y) 
			point = markers[index].latLng;
			xPos = point[0];
			yPos = point[1];
			console.log('p(x,y) : (',  xPos+ ', '+  yPos+')');
	      	// remove marker code
			/*map.removeMarkers([index]);
			map.label.hide();*/
	    },
	    onMarkerSelected: function(event, index, isSelected, selectedMarkers){
			console.log('marker-select', index, isSelected, selectedMarkers);			
			if(isSelected){
				// convert to function start
				if(!in_array(index, markersSelected)){
					markersSelected.push(index);
					map.setSelectedMarkers(markersSelected);
				}
				if (window.localStorage) {
					window.localStorage.setItem(
					  'jvectormap-selected-markers',
					  JSON.stringify(map.getSelectedMarkers())
					);
				}
				// end
				var markerCoordsArr = [];
				for(var i in markersSelected){
					markerCoordsArr.push(markersCoords[markersSelected[i]]);
				}
				//drawLines(markerCoordsArr);
			}
	    },

	    onRegionLabelShow: function(event, label, code){
	      	label.html(label.html());
	    },
	    onRegionOver: function(event, code){
	      	console.log('region-over', code, map.getRegionName(code));
	    },
	    onRegionOut: function(event, code){
	      	console.log('region-out', code);
	    },
	    onRegionClick: function(event, code){
	      	console.log('region-click', code);
	    },
	    onRegionSelected: function(event, code, isSelected, selectedRegions){
			console.log('region-select', code, isSelected, selectedRegions);
			if (window.localStorage) {
				window.localStorage.setItem(
				  'jvectormap-selected-regions',
				  JSON.stringify(map.getSelectedRegions())
				);
			}
	    },
	    onViewportChange: function(e, scale, transX, transY){
	        console.log('viewportChange', scale, transX, transY);
	    }
	});
	
	
	map.setSelectedRegions( JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ) );
	map.setSelectedMarkers( JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]' ) );

	$(elm).click(function(e){
		var latLng = map.pointToLatLng(e.offsetX, e.offsetY),
		  targetCls = $(e.target).attr('class');

		if (latLng && (!targetCls || (targetCls && $(e.target).attr('class').indexOf('jvectormap-marker') === -1))) {
			markersCoords[markerIndex] = latLng;
			map.addMarker(markerIndex, {latLng: [latLng.lat, latLng.lng]});
			markerIndex += 1;
		}
	});	

	
	$(elm).bind('');

  }

  function drawLines(selected_markers){
  	/*var selected_markers = [
		{name:'Houston', latLng:[29.761993,-95.369568]},
		{name:'New York', latLng:[40.710833,-74.002533]},
		{name:'Kansas City', latLng:[39.115145,-94.633484]},
      	{name: 'Singapore', latLng: [1.3, 103.8]}
	];*/
	var draw = SVG('svgMapOverlay').size(660, 400);
	var markerCount = selected_markers.length;
	for(var i in selected_markers){
	    if(markerCount-1 > i ){
	     	var j = parseInt(i)+1;
	     	console.log('i,j', i, j, markerCount);
	     	console.log(selected_markers[i]);
	     	
	     	var coordsA = map.latLngToPoint(selected_markers[i].latLng[0],selected_markers[i].latLng[1]);
			var coordsB = map.latLngToPoint(selected_markers[j].latLng[0],selected_markers[j].latLng[1]);
			drawLine(draw, coordsA, coordsB);			
	    }
	}
  }

  function drawLine(draw, coordsA, coordsB){  	
  	draw.path().attr({ fill: 'none',stroke: '#c00', 'stroke-width': 2 }).M(coordsA.x, coordsA.y).L(coordsB.x, coordsB.y);
	console.log('coords', coordsA, coordsB);  	
  }

  $.fancyWorldMap = function(options) {
    console.log('fancyWorldMap()');
    var params = $.extend({
        elm : '#map',
        data: 'sample_data',
        markers: [
	        {latLng: [40.66, -73.56], name: 'Marker1', style: {r: 8, fill: 'yellow'}},
	        {latLng: [41.52, -87.37], name: 'Marker2', style: {fill: 'red', r: 10}},
	        {latLng: [35.66, -73.56], name: 'Marker3', style: {r: 8, fill: 'yellow'}},
	        {latLng: [30.52, -87.37], name: 'Marker4', style: {fill: 'red', r: 10}}
        ]
    }, options );

    createWorldMap(params);           
  }

  $.fn.fancyWorldMap = $.fancyWorldMap;

}(jQuery));