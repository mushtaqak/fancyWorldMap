FancyWorldMap Plugin
======================================================

Author: Mushtaq Ali

	FancyWorldMap Plugin is an extended version of jqvmap and jvectormap. Though it is 
	incomplete and in development but may help others who are trying to achieve 
	the things I wanted. Cheers.


Usefull Resources : 
  https://github.com/manifestinteractive/jqvmap/issues/113#issuecomment-68411608, 
  https://github.com/manifestinteractive/jqvmap,  
  https://github.com/bjornd/jvectormap


Usage : 	

	1. To create map,  click Create Map 
    2. To change mode click View Map in View/Interactive Mode  
    3. To add markers, click Add All Markers 
    4. To remove markers, click Remove All Markers 
    5. To create a line between two coordinates ( sample data), click Sample Points Line 
    6. To create a line between selected markers, click Marker 
    7. To clear lines drawn, click Clear Drawn Lines 
    8. To clear selected markers, click Clear Selected Markers 
    9. To clear selected regions/counries, click Clear Selected Regions 
    10. To reset map only click Reset Map. This resets map like zoom in/out ratio    	
    11. To reset all data, click Reset All 
    12. To remove map only. (NOTE) it will only remove map not lines, click Remove Map 
    13. To remove all, click Remove All 

    (NOTE : In View Mode , you can not add markers, you can only view map, 
    	while in Interactive mode you can add markers and hover and zoom in/out map)

Flow: 	

	Follow the flow to get used the plugin and understand the funtionality:

	Create map, 
	Add markers, 
	([optional]remove markers to test then add markers again), 
	Draw sample points line, 
  	([optional] click on some markers),
  	([optional] regions/countries to select them),
  	([optional] hover over marker
  	([optional] hover over regions/countries), 
  	Draw selected markers lines, 
  	([optiona] clear selected regions/countries), 
  	([optiona] clear selected markers), 
  	([optiona] clear drawn lines), 
  	([optiona] reset map only), 
  	([optiona] reset all data i.e map and lines), 
  	([optiona] remove map only), 
  	([optiona] remove all i.e map and lines)


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
        svgContainer : { 
        	id : 'svgMapOverlay', 
        	fill : 'none', 
        	arrow_fill: 'yellow', 
        	stroke_color: 'green', 
        	arrow_color: 'yellow', 
        	arrow_size: 10, 
        	stroke_width: 2, 
        	width: '1280', 
        	height: '400'
        	},
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
