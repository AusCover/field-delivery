$body = $("body");
$(document).on({
	ajaxStart: function() {
		$body.addClass("loading");
	},
	ajaxStop: function(series, layer) {
		$body.removeClass("loading");
	}
});

var x, y, layer; //map related variables -not sure we need baselayers

//triggers update if anything form inputs change
$('.query').change(function() {
	console.log('in query');
	processQuery(options);
})
$('.air-query').change(function() {
	processAirQuery(options);
})
$('#request-data').click(function() {
	requestData();
})



$('.boundary-list > li> a').click(function() {
	var value = $(this).attr("data-value");
	var boundarysrc = $(this).parents(".boundary-list").attr("data-value");
	addPredefinedPolygon(value, boundarysrc);
})


map.on('click', function(e) {
	map.closePopup();
});

function addPredefinedPolygon(value, boundarysrc) {
	var id = {
		'states': 'STATE_CODE',
		'supersites': 'name'
	};
	var polygonGeojson = boundarysrc;
	var polygonID = value;
	for (i = 0; i < predefined[polygonGeojson].features.length; i++) {
		var currentFeature = predefined[polygonGeojson].features[i];
		if (currentFeature.properties[id[polygonGeojson]] == polygonID) {
			processPolygon(currentFeature)
		}
	}
}


//set up marker layer for query
var markers = L.markerClusterGroup({
	showCoverageOnHover: false,
	maxClusterRadius: 60,
	zoomToBoundsOnClick: false,
	spiderfyOnMaxZoom: true,
	removeOutsideVisibleBounds: false,
	disableClusteringAtZoom: 10
});
markers.on('click', function(a) {
	triggerPreviewData([a.layer]);
});
markers.on('dblclick', function(a) {
	//	map.setView(a.layer.latlng, map.getZoom() + 1);
});
markers.on('clusterclick', function(a) {
	// a.layer is actually a cluster
	triggerPreviewData(a.layer.getAllChildMarkers());
});

// DRAW TOOLS 
// Initialize the FeatureGroup to store editable layers
var drawnItems = new L.featureGroup().addTo(map);
// Initialize the draw control and pass it the FeatureGroup of editable layers
var drawOptions = {
	draw: {
		polygon: {
			shapeOptions: polygonStyle,
			allowIntersection: false
		},
		polyline: false,
		rectangle: false,
		marker: false,
		circle: false
	},
	edit: {
		featureGroup: drawnItems,
		edit: false,
		remove: true
	}
}
var drawControl = new L.Control.Draw(drawOptions);
map.on('draw:created', function(e) {
	if (layer !== undefined) {
		drawnItems.removeLayer(layer);
	}
	layer = e.layer.toGeoJSON();
	processPolygon(layer);
});
map.on('draw:deleted', function(e) {
	processQuery();
	processAirQuery();
});


map.addControl(drawControl);
map.invalidateSize(false);

// //date picker initalisation
// $('#bs-datepicker-example').datepicker(options1);
// $('#bs-datepicker-component').datepicker();

// $('#bs-datepicker-range').datepicker(options2);
// $('#bs-datepicker-inline').datepicker();

 	$('#data-slide-out-btn').click(function() {
	  console.log('clicked');	
		$('#data-btn').click()
	})

      
//gathers query parameters together from web page.
function getParameters() {
	var dataList = $('input[type="checkbox"]:checked').map(function() {
		return this.id;
	}).toArray();
	//var startDate = document.getElementById('startDate').value;
	//	var endDate = document.getElementById('endDate').value;
	var wkt;
	var keys = Object.keys(drawnItems._layers);
	var no_drawn = keys.length;
	if (no_drawn === 0) {
		// wkt = 'MULTIPOLYGON (((130.341796875 -9.79567758282973, 111.884765625 -21.861498734372553, 114.43359375 -36.38591277287651, 131.220703125 -32.990235559651055, 142.998046875 -39.97712009843962, 145.107421875 -43.96119063892025, 149.4140625 -44.46515101351962, 154.51171875 -31.05293398570514, 153.80859375 -23.24134610238612, 146.865234375 -16.383391123608387, 142.20703125 -7.536764322084078, 139.5703125 -14.093957177836224, 137.197265625 -9.709057068618208, 134.6484375 -10.487811882056695, 130.341796875 -9.79567758282973)))';
		wkt = undefined;
	} else if (no_drawn === 1) {
		wkt = convertToWKT(drawnItems._layers[keys[0]].feature);
	}
	//if (startDate === '') {
	startDate = '1980-01-01';
	//}
	//if (endDate === '') {
	endDate = moment(new Date(Date.now())).format('YYYY-MM-DD');
	//}
	return [dataList, startDate, endDate, wkt];
}


function processQuery(options) {
	markers.eachLayer(function(layer) {
		markers.removeLayer(layer);
	});
	console.log('in process query past marker removal');
	//get parameters for query	
	[dataList, startDate, endDate, wkt] = getParameters();
	//ren the query for each data layer
	
	for (var i = 0; i < dataList.length; i++) {
		dataType = dataList[i];
		var data = queryDB(dataType, wkt);
	}
}

function queryDB(dataType, wkt) {
	var db_options = options[dataType];
	var boundary = "&boundary=" + wkt
	var url = "http://203.101.227.158/queryfielddb?table=" + dataType + boundary;
	$.get(url, function(data) {
 		if (data.features !== null) {
 			var points = new L.geoJson(data, db_options);
 			markers.addLayer(points);
 			map.addLayer(markers);
 			map.fitBounds(markers.getBounds(), {
 				padding: L.point(100, 100)
 			})
 		}
	});
}


function processAirQuery(options) {
	console.log('in query');
	map.eachLayer(function(layer) {
		if (layer.feature !== undefined) {
			console.log(layer,'layer');
			if (layer.feature.geometry.type === 'Polygon') {
				console.log(layer,'polygon type');
				map.removeLayer(layer);
			}
		}
	});
	//get parameters for query	
	[dataList, startDate, endDate, wkt] = getParameters();
	console.log(wkt);
	//ren the query for each data layer
	for (var i = 0; i < dataList.length; i++) {
		dataType = dataList[i];
		var data = queryDBAir(dataType, wkt);
	}
}



function queryDBAir(dataType, wkt) {
	var db_options = options[dataType];
	var boundary = "&boundary=" + wkt
	var url = "http://203.101.227.158/queryfielddb?table=" + dataType + boundary;
	console.log(url);
  	$.get(url, function(data) {
  		if (data.features !== null) {
  			var polygons = new L.geoJson(data, db_options);
   			console.log(data);
  			map.addLayer(polygons);
  		}
 	});
}




//what to do with polygon
function processPolygon(data) {
	var polybound = new L.geoJson(data, {
		style: polygonStyle,
	});
	polybound.on("click", function(e) {
		// do something here like display a popup
		map.closePopup();
	});
	var key = Object.keys(polybound._layers)[0];
	var drawnfeature = polybound._layers[key];
	var keys = Object.keys(drawnItems._layers);
	drawnItems.removeLayer(drawnItems._layers[keys[0]]);
	drawnItems.addLayer(drawnfeature);
	map.fitBounds(drawnfeature.getBounds());
	processQuery(options);
//	processAirQuery(options);
}

//convert feature collection to wkt format for postgis querying
function convertToWKT(feature) {
	console.log(feature.geometry.coordinates);
	var polygon = turf.polygon(feature.geometry.coordinates);
 var buffered = turf.buffer(polygon, 1);
  console.log(buffered.features[0]);
	var wktPolygon = Terraformer.WKT.convert(buffered.features[0].geometry);
	return wktPolygon;
}

function triggerPreviewData(previewList) {
	for (var i = 0; i < previewList.length; i++) {
		if (previewList[i] !== undefined) {
			var html = preview(previewList[i]);

			previewList[i].bindPopup(html);
		}
	}
}

function requestData() {

	var dataDict = {};
	var data_type;

	var site_list = [];
	map.eachLayer(function(layer) {
		console.log(site_list);
		if (layer.feature !== undefined) {
			if (layer.feature.geometry.type === 'Polygon') {
				data_type = layer.feature.properties.data_type;
				
				if (layer.feature.properties.folder !== undefined){
					console.log(layer.feature.properties.folder)
						if (site_list.indexOf(layer.feature.properties.folder) === -1) {
					site_list.push(layer.feature.properties.folder);
							console.log(site_list);
				}
				}
			}
		}
	});
	
dataDict[data_type] = site_list;
	
	
console.log(dataDict[data_type]);
	var obs_key_list = [];
	markers.eachLayer(function(layer) {
		if (layer.feature.geometry.type !== 'Polygon') {
		data_type = layer.feature.properties.data_type;
		console.log(data_type);
		if (data_type !== undefined) {
			
		if (obs_key_list.indexOf(layer.feature.properties.obs_key) === -1) {
			obs_key_list.push(layer.feature.properties.obs_key);
		}
		dataDict[data_type] = obs_key_list;
	}
		}
		});
	
	$.ajax({
		async: true,
		url: 'http://203.101.227.158/createdownloadfolders',
		type: "POST",
		//	dataType: "json",
		// 		statusCode: {
		// 			500: function() {
		// 				$('#serverAlert').modal('toggle');
		// 			},
		// 			502: function() {
		// 				$('#serverAlert').modal('toggle');
		// 			}
		// 		},
		data: {
			tls_sites: JSON.stringify(dataDict['tls_sites']),
			hemispheric_list: JSON.stringify(dataDict['hemispheric_list']),
			star_transects: JSON.stringify(dataDict['star_transects']),
			microtops_aod: JSON.stringify(dataDict['microtops_aod']),
			microtops_ozone: JSON.stringify(dataDict['microtops_ozone']),
			calibration_targets: JSON.stringify(dataDict['calibration_targets']),
			airborne_lidar: JSON.stringify(dataDict['airborne_lidar'])
		},
		success: function(data) {
			console.log(data);
// 			var context = {
// 				url: data
// 			};
// 			var html = download_template(context);
// 			$('#my-mdc-dialog').html(html);
// 			var dialog = new mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
// 			dialog.listen('MDCDialog:accept', function() {
// 				console.log('accepted');
// 			});
// 			dialog.listen('MDCDialog:cancel', function() {
// 				console.log('canceled');
// 			});

// 			dialog.show();
		}
	});


}