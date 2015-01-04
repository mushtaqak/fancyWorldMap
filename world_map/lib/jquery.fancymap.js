(function ($) {  
  var map;
  function createWorldMap(params){

  	var markers = params.markers;
  	var elm = params.elm;

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
	    	if(markersCoords[index].name){
	    		label.text(markersCoords[index].name);
	    	}
	    	else {
	    		label.text(markersCoords[index].latLng[0].toFixed(2)+','+markersCoords[index].latLng[1].toFixed(2));
	    	}
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
				if($.inArray(index, markersSelected)){
					markersSelected.push(index);
					map.setSelectedMarkers(markersSelected);
				}
				if (window.localStorage) {
					window.localStorage.setItem('jvectormap-selected-markers', JSON.stringify(selectedMarkers));
				}
				// end				
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
	      	/* check if moving */
			/*var isMoving = $(event.currentTarget).data('mapObject').isMoving;
	    	if(isMoving){
	    		console.log('moved from ' + map.getRegionName(code) + ' [' + code.toUpperCase() + ']');
	    	}*/
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
	
	//map.setSelectedRegions( JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ) );
	if(markers){
		//map.setSelectedMarkers( JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]' ) );
	}

    // creates single marker
	$(elm).click(function(e){		
		var latLng = map.pointToLatLng(e.offsetX, e.offsetY),
		  targetCls = $(e.target).attr('class');

		if (latLng && (!targetCls || (targetCls && $(e.target).attr('class').indexOf('jvectormap-marker') === -1))) {
			markersCoords[markerIndex] =  { latLng: [ latLng.lat, latLng.lng] };
			map.addMarker(markerIndex, {latLng: [latLng.lat, latLng.lng]});
			markerIndex += 1;
		}
	});
	
	$(elm).bind('');

	return map;

  }

  // finds selected markers and then calls drawMarkerLines
  function markerLines(svg, svgContainer, markersCoords){
  	var markerCoordsArr = [];
  	var markers = map.getSelectedMarkers();
	for(var i in markers){
		markerCoordsArr.push(markersCoords[markers[i]]);
	}
	drawMarkerLines(svg, svgContainer, markerCoordsArr);  	
  }


  // draw lines, accepts markers
  function drawMarkerLines(svg, svgContainer, selected_markers){
	var markerCount = selected_markers.length;
	for(var i in selected_markers){
	    if(markerCount-1 > i ){
	     	var j = parseInt(i)+1;
	     	console.log('i,j', i, j, markerCount);
	     	console.log(selected_markers[i]);
	     	
	     	var coordsA = map.latLngToPoint(selected_markers[i].latLng[0],selected_markers[i].latLng[1]);
			var coordsB = map.latLngToPoint(selected_markers[j].latLng[0],selected_markers[j].latLng[1]);
			drawLine(svg, svgContainer, coordsA, coordsB);			
	    }
	}
  }

  // draw single line function
  function drawLine(svg, svgContainer, coordsA, coordsB){
  	svg.path().attr({ fill: svgContainer.fill ,stroke: svgContainer.stroke_color, 'stroke-width': svgContainer.stroke_width }).M(coordsA.x, coordsA.y).L(coordsB.x, coordsB.y);
	console.log('coords', coordsA[0], coordsB);  	
  }

  $.fancyWorldMap = function(options) {
    console.log('fancyWorldMap()');
    var params = $.extend({
        elm : '#map',
        svgContainer : 'svgMapOverlay',
        data: 'sample_data',
        markers: [
	        {latLng: [40.66, -73.56], name: 'Marker1', style: {r: 8, fill: 'yellow'}},
	        {latLng: [41.52, -87.37], name: 'Marker2', style: {fill: 'red', r: 10}},
	        {latLng: [35.66, -73.56], name: 'Marker3', style: {r: 8, fill: 'yellow'}},
	        {latLng: [30.52, -87.37], name: 'Marker4', style: {fill: 'red', r: 10}}
        ]
    }, options );

	var svg = SVG(params.svgContainer.id).size(params.svgContainer.width, params.svgContainer.height);

    var mapObj = {
        createMap: function(name) {
			createWorldMap(params);
		},
        drawPointLines: function(markers) {      
		    drawMarkerLines(svg, params.svgContainer, markers);
        },
        drawSelectedMarkerLines: function() {
		    markerLines(svg, params.svgContainer, params.markers);
        },
        createMarkers: function(markers, values){
        	map.addMarkers(markers, values);
        },
        removeMarkers : function(){
        	map.removeAllMarkers();
        },
        clearAllSelectedRegions: function(){
        	map.clearSelectedRegions();
        },
        clearAllSelectedMarkers: function(){
        	map.clearSelectedMarkers();
        },
        clearLines: function(){
        	$('#'+params.svgContainer.id).empty();
        	svg = SVG(params.svgContainer.id).size(1280, 400);
        },
        resetMap: function(){
        	map.reset();
        },
        removeMap: function(){
        	map.remove();
        },
        resetAll: function(){
        	map.reset();
        	$('#'+params.svgContainer.id).empty();
        	svg = SVG(params.svgContainer.id).size(1280, 400);
        }

    };

	return mapObj;
  }

  $.fn.fancyWorldMap = $.fancyWorldMap;

}(jQuery));0