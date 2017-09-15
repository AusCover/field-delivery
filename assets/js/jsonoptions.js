var polygonStyle = {
	"color": "#c0c0c0",
	"opacity": 0.7,
	"fillOpacity": 0,
	"weight": 2
}


var options1 = {
    todayBtn: "linked",
    orientation: $('body').hasClass('right-to-left') ? "auto right" : 'auto auto',
    format: "yyyy-mm-dd",
    minViewMode: 1,
    zIndexOffset: 2000,
    startDate: "1987-01-01",
    startView: 1,
    clearBtn: true,
}



var options2 = {
    orientation: $('body').hasClass('right-to-left') ? "auto right" : 'auto auto',
    format: "yyyy-mm-dd",
    minViewMode: 1,
    zIndexOffset: 2000,
    startView: 1,
    clearBtn: true,
}

// var geojsonMarkerOptions = {
//     radius: 8,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };


	var myIcon = L.Icon.extend({
  });

 var options = {
 	'tls_sites': {
		
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/tripod.png',
							iconSize: [30,30]
							
            })
          })}
 	
	},
	'star_transects': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/star.svg',
							iconSize: [30,30],
            })
          })}
		
	},
	'hemispheric_list': {
// 		pointToLayer: function (feature, latLng) {
//           return new L.Marker(latLng, {
//             icon: new myIcon({
//               iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/hemi.png',
// 							iconSize: [30,30]
//             })
//           })}
	},
 	'lai': {
// 		pointToLayer: function (feature, latLng) {
//           return new L.Marker(latLng, {
//             icon: new myIcon({
//               iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/lai.png'
//             })
//           })}
	},
		'tree_structure': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/tree.png'
            })
          })}
	}, 
		'calibration_targets': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/rainbow.png'
            })
          })}
	}, 
		'microtops_aod': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/aod.png'
            })
          })}
	}, 	
		'microtops_ozone': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/ozone.png'
            })
          })}
	}, 
		'field_photos': {
		pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new myIcon({
              iconUrl: 'http://qld.auscover.org.au/public/html/devfield/assets/images/camera.png',
							iconSize:[20,20],
					//		iconAnchor: [10,10]
            })
          })}
	}
	  
}
