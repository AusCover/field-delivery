
   

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

		 var tls_source = $("#tls-template").html();
     var tls_template = Handlebars.compile(tls_source);
		 var star_transects_source = $("#star-transects-template").html();
     var star_transects_template = Handlebars.compile(star_transects_source);
		 var hemispheric_list_source = $("#hemispheric-list-template").html();
     var hemispheric_list_template = Handlebars.compile(hemispheric_list_source);
		 var tree_structure_source = $("#tree-structure-template").html();
     var tree_structure_template = Handlebars.compile(tree_structure_source);
		 var lai_source = $("#lai-template").html();
     var lai_template = Handlebars.compile(lai_source);
 		 var field_photos_source = $("#field-photos-template").html();      
     var field_photos_template = Handlebars.compile(field_photos_source);
// 		 var biomass_site_source = $("#biomass-site-template").html();
//      var biomass_site_template = Handlebars.compile(biomass_site_source);
// 		 var biomass_tree_source = $("#biomass-tree-template").html();
//      var biomass_tree_template = Handlebars.compile(biomass_tree_source);
		 var calibration_targets_source = $("#calibration-targets-template").html();
     var calibration_targets_template = Handlebars.compile(calibration_targets_source);
		 var microtops_aod_source = $("#microtops-aod-template").html();
     var microtops_aod_template = Handlebars.compile(microtops_aod_source);
		 var microtops_ozone_source = $("#microtops-ozone-template").html();
     var microtops_ozone_template = Handlebars.compile(microtops_ozone_source);
		 var airborne_lidar_source = $("#airborne-lidar-template").html();
     var airborne_lidar_template = Handlebars.compile(airborne_lidar_source);
		 var hyperspectral_source = $("#hyperspectral-template").html();
     var hyperspectral_template = Handlebars.compile(hyperspectral_source);
     var download_source =  $("#download-modal-template").html();
    var download_template =  Handlebars.compile(download_source);

function preview(e) {
       var html;
       var context;
       
    if (e.feature.properties.data_type === "tls_sites"){
			   var obsKeyElem = e.feature.properties.obs_key.split("_");
			   var locID = obsKeyElem[0] + "_" + obsKeyElem[1];
			   var dateID = obsKeyElem[2];
			   var potree = "http://qld.auscover.org.au/public/html/potree/" + locID + "/" + dateID + "/scans/index.html";
 			   context = {title: "Ground Lidar", 
										site: e.feature.properties.site, 
										date: e.feature.properties.obs_time, 
										thumbnail:"assets/images/tripod.png",
									  potree: "http://qld.auscover.org.au/public/html/potree/" + locID + "/" + dateID + "/scans/index.html" };
         html   = tls_template(context);
			   
      }
    if (e.feature.properties.data_type === "star_transects"){
 			 context = {title: "Star Transects", 
									thumbnail:"assets/images/star.svg",
								 site: e.feature.properties.site,
								date: e.feature.properties.obs_time,
								 persist: e.feature.properties.persist,
									mid: e.feature.properties.mid_g+e.feature.properties.mid_b+e.feature.properties.mid_d,
                 green: e.feature.properties.green,
									"non-green": e.feature.properties.litter + e.feature.properties.dead,
									bare: e.feature.properties.crust + e.feature.properties.rock + e.feature.properties.dist,
									over: e.feature.properties.over_g+e.feature.properties.over_b+e.feature.properties.over_d,
									nimage: e.feature.properties.image
								 };
         html   = star_transects_template(context);
      }
 	   if (e.feature.properties.data_type === "hemispheric_list"){
 			 context = {title: "Hemispheric Images", 
									thumbnail:"assets/images/hemi.png",
							 	 site: e.feature.properties.site,
								  date: e.feature.properties.date,
									observers: e.feature.properties.observers,
									camera: e.feature.properties.camera_model,
									comment: e.feature.properties.comment,
									image: e.feature.properties.image
								 };
         html   = hemispheric_list_template(context);
      }
 	   if (e.feature.properties.data_type === "tree_structure"){
 			 context = {title: "Tree Structure", 
									thumbnail:"assets/images/tree.png",
								 site: e.feature.properties.site,
								date: e.feature.properties.obs_time,
									observers: e.feature.properties.observer,
									no_trees: e.feature.properties.no_trees,
									comment: e.feature.properties.comments,
									image: e.feature.properties.image
								 };
         html   = tree_structure_template(context);
      }
    if (e.feature.properties.data_type === "lai"){
 			   context = {title: "LAI 2200", 
										site: e.feature.properties.site, 
										date: e.feature.properties.obs_time,
										observers: e.feature.properties.observer,
										comment: e.feature.properties.comemnt,
										thumbnail:"assets/images/tripod.png"};
         html   = lai_template(context);
      }
    if (e.feature.properties.data_type === "field_photos"){
 			 context = {title: "Field Photos", 
									thumbnail:"assets/images/camera.png",
								date: e.feature.properties.obs_time,
								image: e.feature.properties.image	
								 };
         html   = field_photos_template(context);
      }
 	   if (e.feature.properties.data_type === "calibration_targets"){
 			 context = {title: "Calibration Targets", 
									thumbnail:"assets/images/rainbow.png",
								 site: e.feature.properties.site,
								date: e.feature.properties.date,
									model: e.feature.properties.model,
						//			operator: e.feature.properties.operator
							
								 };
         html   = calibration_targets_template(context);
      }
 	   if (e.feature.properties.data_type === "microtops_aod"){
 			 context = {title: "Microtops AOD", 
									thumbnail:"assets/images/aod.png",
								 site: e.feature.properties.supersite,
								date: e.feature.properties.date
								 };
         html   = microtops_aod_template(context);
      }
	    if (e.feature.properties.data_type === "microtops_ozone"){
 			   context = {title: "Microtops Ozone", 
										site: e.feature.properties.supersite, 
										date: e.feature.properties.date, 
										thumbnail:"assets/images/ozone.png"};
         html   = microtops_ozone_template(context);
      }
    if (e.feature.properties.data_type === "star_transects"){
 			 context = {title: "Star Transects", 
									thumbnail:"assets/images/star.png",
								 site: e.feature.properties.site,
								date: e.feature.properties.obs_time,
								 persist: e.feature.properties.persist,
									mid: e.feature.properties.mid_g+e.feature.properties.mid_b+e.feature.properties.mid_d,
                 green: e.feature.properties.green,
									"non-green": e.feature.properties.litter + e.feature.properties.dead,
									bare: e.feature.properties.crust + e.feature.properties.rock + e.feature.properties.dist,
									over: e.feature.properties.over_g+e.feature.properties.over_b+e.feature.properties.over_d,
									nimage: e.feature.properties.image
								 };
         html   = star_transects_template(context);
      }
 	   if (e.feature.properties.data_type === "hemispheric_list"){
 			 context = {title: "Hemispheric Images", 
									thumbnail:"assets/images/hemi.png",
								 site: e.feature.properties.site,
								date: e.feature.properties.date,
									observers: e.feature.properties.observers,
									camera: e.feature.properties.camera_model,
									comment: e.feature.properties.comment,
									image: e.feature.properties.image
								 };
         html   = hemispheric_list_template(context);
      }
 	   if (e.feature.properties.data_type === "tree_structure"){
 			 context = {title: "Tree Structure", 
									thumbnail:"assets/images/tree.png",
								 site: e.feature.properties.site,
								date: e.feature.properties.obs_time,
									observers: e.feature.properties.observer,
									no_trees: e.feature.properties.no_trees,
									comment: e.feature.properties.comments,
									image: e.feature.properties.image
								 };
         html   = tree_structure_template(context);
      }
 	   if (e.feature.properties.data_type === "airborne_lidar"){
 			 context = {title: "Airborne Lidar", 
									thumbnail:"assets/images/tree.png",
								 site: e.feature.properties.calval_site,
								date: e.feature.properties.date
								 };
         html   = airborne_lidar_template(context);
      }
     return html;
  
		 }
		 
		 
		 
