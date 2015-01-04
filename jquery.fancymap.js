/*
Author: Mushtaq Ali

Description : 

	fancyWorldMap Plugin is an extended version of jqvmap which is based on  . I have used combinations of some other plugins 
	and my own javascript to make this far. This is still in development. I thought this may help others trying to achieve the 
	same functionality.

Usefull Resources : 


Usage : 
	
	Follow the flow to get used the plugin and understand the funtionality.
	
	Flow: Create map, add markers, ([optional]remove markers to test then add markers again), draw sample points line, 
      ([optional] click on some markers, regions/countries to select them, hover over marker and regions/countries ), draw selected markers lines, ([optiona] clear selected regions/countries), ([optiona] clear selected markers), ([optiona] clear drawn lines), ([optiona] reset map only), ([optiona] reset all data i.e map and lines), ([optiona] remove map only), ([optiona] remove all i.e map and lines)
    
    1. To create map,  click Create Map 
    2. To change mode (NOTE : in View Mode , you can not add markers, you can only view map, while in Interactive mode you can add markers and hover and zoom in/out map and have map functionality, click View Map in View/Interactive Mode  
    3. To add markers, click Add All Markers 
    4. To remove markers, click Remove All Markers 
    5. To create a line between two coordinates ( sample data), click Sample Points Line 
    6. To create a line between selected markers, click Marker 
    7. To clear lines drawn, click Clear Drawn Lines 
    8. To clear selected markers, click Clear Selected Markers 
    9. To clear selected regions/counries, click Clear Selected Regions 
    10. To reset map only (NOTE) It will reset map like zoom in/out ratio as initially drawn, click Reset Map 
    11. To reset all data, click Reset All 
    12. To remove map only. (NOTE) it will only remove map not lines, click Remove Map 
    13. To remove all, click Remove All 


Sample Functions :

$(function(){
      // Sample Data
      var markersData = [
        {latLng: [40.66, -73.56], name: 'Marker1', style: {r: 8, fill: 'yellow'}},
        {latLng: [41.52, -87.37], name: 'Marker2', style: {fill: 'red', r: 10}},
        {latLng: [35.66, -73.56], name: 'Marker3', style: {r: 8, fill: 'yellow'}},
        {latLng: [30.52, -87.37], name: 'Marker4', style: {fill: 'red', r: 10}},
        {latLng: [41.90, 12.45], name: 'Vatican City'},
        {latLng: [43.73, 7.41], name: 'Monaco'},
        {latLng: [-0.52, 166.93], name: 'Nauru'},
        {latLng: [-8.51, 179.21], name: 'Tuvalu'},
        {latLng: [43.93, 12.46], name: 'San Marino'},
        {latLng: [47.14, 9.52], name: 'Liechtenstein'},
        {latLng: [7.11, 171.06], name: 'Marshall Islands'},
        {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
        {latLng: [3.2, 73.22], name: 'Maldives'},
        {latLng: [35.88, 14.5], name: 'Malta'},
        {latLng: [12.05, -61.75], name: 'Grenada'},
        {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
        {latLng: [13.16, -59.55], name: 'Barbados'},
        {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
        {latLng: [-4.61, 55.45], name: 'Seychelles'},
        {latLng: [7.35, 134.46], name: 'Palau'},
        {latLng: [42.5, 1.51], name: 'Andorra'},
        {latLng: [14.01, -60.98], name: 'Saint Lucia'},
        {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
        {latLng: [1.3, 103.8], name: 'Singapore'},
        {latLng: [1.46, 173.03], name: 'Kiribati'},
        {latLng: [-21.13, -175.2], name: 'Tonga'},
        {latLng: [15.3, -61.38], name: 'Dominica'},
        {latLng: [-20.2, 57.5], name: 'Mauritius'},
        {latLng: [26.02, 50.55], name: 'Bahrain'},
        {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
      ];

      // Demo

      // 0. Initiallize my fancyWorldMap Plugin 
      var mapObj = $.fancyWorldMap({
        elm: '#map',
        svgContainer : { id : 'svgMapOverlay', fill : 'none', arrow_fill: 'yellow', stroke_color: 'green', arrow_color: 'yellow', arrow_size: 10, stroke_width: 2, width: '1280', height: '400'},
        data: 'Fancy Maps Content',
        markers: markersData
      });
      
      // 1. create map
      mapDrawn = false;
      $('#create-map').click(function(){
        if(!mapDrawn){
          mapObj.createMap();
          mapDrawn = true;
        }
      });

      // 2. draw line b/w two points
      lineDrawn = false;
      $('#sample-point-line').click(function(){
        if(mapDrawn){
          var drawMarkersData = [
            {name:'New York', latLng:[40.710833,-74.002533]},
            {name: 'Singapore', latLng: [1.3, 103.8]}
          ];  
          mapObj.drawPointLines(drawMarkersData);
          lineDrawn = true;
          changeMapMode(0); // set to view mode
        }
      });      

      // 3. draw line of selected markers
      $('#selected-marker-line').click(function(){
        if(mapDrawn){
          mapObj.drawSelectedMarkerLines();
          lineDrawn = true;
          changeMapMode(0); // set to view mode
        }
      });
      
      // 4. Add markers from data
      $('#add-all-markers').click(function(){
        if(mapDrawn){
          mapObj.createMarkers(markersData, []);
        }
      });

      // 5. remove all markers
      $('#remove-all-markers').click(function(){
        if(mapDrawn){
          mapObj.removeMarkers();
        }
      });

      // 6. remove drawn lines
      $('#clear-drawn-lines').click(function(){
        if(lineDrawn && mapDrawn){
          mapObj.clearLines();
          lineDrawn = false;
        }
      });

      // 7. unset selected countries data from window
      $('#clear-selected-regions').click(function(){
        if(mapDrawn){
          mapObj.clearAllSelectedRegions();
        }
      });

      // 8. remove selected marker data from window
      $('#clear-selected-markers').click(function(){
        if(mapDrawn){
          mapObj.clearAllSelectedMarkers();
        }
      });

      // 9. reset map data only - reset map like zoom in/out as defaut
      $('#reset-map').click(function(){
        if(mapDrawn){
          mapObj.resetMap();
        }
      });

      // 10. reset all map and lines
      $('#reset-all').click(function(){
        if(mapDrawn){
          mapObj.resetAll();
        }
      });

      // 11. remove map only
      $('#remove-map').click(function(){
        if(mapDrawn){
          mapObj.removeMap();
          mapDrawn = false;
        }
      });

      // 12. remove map only
      $('#remove-all').click(function(){
        if(mapDrawn){
          mapObj.removeMap();
          mapObj.clearLines();
          mapDrawn = false;
          lineDrawn = false;
        }
      });

      // 13. map mode functionality
      $('#map-mode').click(function(){
        mape_mode = $(this).data('mode') ;
        if (mape_mode==0) { // change to view mode
          $('#mapContainer').addClass('mapContainer');
          $('#map').addClass('map');
          $('#svgMapOverlay').addClass('svgMapOverlay');
          $(this).data('mode', 1);
          $(this).val('View Map in Interactive Mode');
        }
        else { // change to interactive mode
          $('#mapContainer').removeClass('mapContainer');
          $('#map').removeClass('map');
          $('#svgMapOverlay').removeClass('svgMapOverlay');         
          $(this).data('mode', 0);
          $(this).val('View Map in View Mode');
        }
      });   

      // 14. instructions
      $('.instructions p').hide(); 
      $('#map-instructions').click(function(){
        instr_state = $(this).data('state') ;
        // show insructions
        if (instr_state==0) {
          $('.instructions p').show();            
          $(this).data('state', 1);
          $(this).val('- Instructions');
        }
        else { // hide insructions
          $('.instructions p').hide();            
          $(this).data('state', 0);
          $(this).val('+ Instructions');
        }
      });   

      function changeMapMode(mode){        
        $('#map-mode').data('mode', mode);
        $('#map-mode').click();
      }

    });


What is left to do :

    1. calculate angle and correct direction for arrow head
    2. clear storage of selected markers and set some conditions if local storage true
    3. if marker selected before show image as well as text/coords finish

Any feedback or suggestion would be appreciated. Thanks      

*/

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
  	//svg = SVG('jvectormap-container');

	var size = svgContainer.arrow_size;
	// calculate angle 
	var angle = Math.atan2(coordsA.x-coordsB.x,coordsA.y-coordsB.y);
    angle = (angle / (2*Math.PI)) * 360; // 2pi
    angle += 135;
    console.log('angle', angle);
    //angle += 135;

  	/*var marker = svg.defs().marker(20, 10);
	// Add that which will be used be rendered
	marker.path().attr({
	  fill: 'blue',
	  stroke: 'blue',
	  'stroke-width': 20,
	  markerWidth : 20,
	  markerHeight : 20
	})
	.M(coordsB.x, coordsB.y)
		.L(coordsB.x-size, coordsB.y-size)
		.L(coordsB.x-size, coordsB.y+size)
		.L(coordsB.x, coordsB.y);*/

    // draw line
    var line = svg.path()
    	.attr({ fill: svgContainer.fill ,stroke: svgContainer.stroke_color, 'stroke-width': svgContainer.stroke_width})
    	.M(coordsA.x, coordsA.y)
    	.L(coordsB.x, coordsB.y);

   	console.log('coords', coordsA, coordsB);     

    /*
	// Line angle
	var angle = Math.atan ( (coordsB.y-coordsA.y)/(coordsB.x-coordsA.x) );
	// Angle for arrow heads
	var end1 = angle + 45 * Math.PI/180
	var end2 = angle - 45 * Math.PI/180
	// end points of arrow heads
	coordsA.y = coordsB.y - size * Math.sin(end1);
	coordsA.x = coordsB.x - size * Math.cos(end1);
	coordsB.y = coordsB.y - size * Math.sin(end2);
	coordsB.x = coordsB.x - size * Math.cos(end2);
	*/

  	
	// draw arrow head  	
    var arrow = svg.path().attr({ fill: svgContainer.arrow_fill ,stroke: svgContainer.arrow_fill, 'stroke-width': svgContainer.stroke_width })
		.M(coordsB.x, coordsB.y)
		.L(coordsB.x-size, coordsB.y-size)
		.L(coordsB.x-size, coordsB.y+size)
		.L(coordsB.x, coordsB.y)
		.rotate(angle,coordsB.x,coordsB.y);
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

    var svg = '';
    if(params.svgContainer.id){
		svg = SVG(params.svgContainer.id).size(params.svgContainer.width, params.svgContainer.height);
    }

    var mapObj = {
        createMap: function(name) {
			createWorldMap(params);
			$('.jvectormap-container').attr('id', 'jvectormap-container');
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

}(jQuery));


/*Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
        var angle = Math.atan2(x1-x2,y2-y1);
        angle = (angle / (2 * Math.PI)) * 360;
        var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2  - size) + " " + (y2  - size) + " L" + (x2  - size)  + " " + (y2  + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2);
        var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
        return [linePath,arrowPath];
};*/

/*var x = 10;
var y = 50;
var x1 = 200;
var y1 = 90;

var paper = new Raphael(500,500,2000,2000);
paper.arrow(x,y,x1,y1,8);*/
