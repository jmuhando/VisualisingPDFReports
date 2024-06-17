//MAP
var map = L.map('map',{
  center :[-0.0000000002, 39.997650],
  zoom : 6,
  minZoom:6,
  maxZoom:10,
});

var osm_baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


//LAYER STYLES
var style_boundary = {
    "color": "#0d0d0d",
    "weight": 1.5,
    "opacity": 1,
    "fillColor": "#ADADAD",
    "fillOpacity": 0.3
};


//COLOUR FUNCTIONS
// function getColor(d) {
//     return d > 100 ? '#800026' :
//            d >= 100  ? '#BD0026' :
//            d > 80  ? '#E31A1C' :
//            d > 60  ? '#FC4E2A' :
//            d > 40   ? '#FEB24C' :
//            d > 20   ? '#FED976' :
//                       '#FFEDA0';
// }

function colours(low, high, x) {
  return chroma.scale([low,high]).mode('lch').colors(x)
}


function getColor(d) {
    return d > 100 ? colours('#ffebc5','#581d00', 6)[5] :
           d > 90  ? colours('#ffebc5','#581d00', 6)[4] :
           d > 80  ? colours('#ffebc5','#581d00', 6)[3] :
           d > 70  ? colours('#ffebc5','#581d00', 6)[2] :
           d > 60  ? colours('#ffebc5','#581d00', 6)[1] :
           d > 50  ? colours('#ffebc5','#581d00', 6)[0] :
                      '#ffebc9';
}



// function styleEachFeature(feature) {
//   for (let key in CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate) {
//         if (CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate.hasOwnProperty(key) && key == e.target.feature.properties.NAME) {
//             value = CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate[key];
//             console.log(key, value);
//             var layer = e.target;
//             layer.setStyle({
//               fillColor: getColor(value),
//               weight: 2,
//               color: '#666',
//               dashArray: '3',
//               fillOpacity: 0.7
//             });

//         }
//   }

//   if (layer.feature.properties.NAME === Object.keys(CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate)) {
//     return {
//         fillColor: getColor(Object.values(CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate)),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
//   }
    
// }



function zoomToFeature(e) {
  info1.update(e.target.feature.properties);
  console.log(e.target.feature.properties.NAME);

  // for (let key in CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate) {
  //       if (CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate.hasOwnProperty(key) && key == e.target.feature.properties.NAME) {
  //           value = CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate[key];
  //           console.log(key, value);
  //           var layer = e.target;
  //           layer.setStyle({
  //             fillColor: getColor(value),
  //             weight: 2,
  //             color: '#666',
  //             dashArray: '3',
  //             fillOpacity: 0.7
  //           });

  //       }
  // }


  map.fitBounds(e.target.getBounds());
    // layer.setStyle({
    //     weight: 4,
    //     color: '#5C005C',
    //     dashArray: '2',
    //     fillOpacity: 1
    // });
}

function onEachFeature(feature, layer) {
  //console.log(feature.properties.NAME);
  for (let key in CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate) {
        if (CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate.hasOwnProperty(key) && key == feature.properties.NAME) {
            value = CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate[key];
            //console.log(key, value);
            //var layer = e.target;
            layer.setStyle({
              fillColor: getColor(value),
              weight: 2,
              color: '#fff',
              dashArray: '5',
              fillOpacity: 0.9
            });

        }
  }
  layer.bindPopup(feature.properties.NAME);
  layer.on({
    click: zoomToFeature,
  });
}





var counties_layer = L.geoJson(counties,{onEachFeature:onEachFeature}).addTo(map);



//INFO WINDOW 2
var info1 = L.control({position: 'topleft'});

info1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML =   (props ?
        '<h6><b>'+props.District+'</b></h6>' 
        :'<h6><b>Click a County</b></h6>');
};

info1.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 60, 70, 80, 90, 100],
        labels = [];
    div.innerHTML = '<h6>Absorption Rate % </h6>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);






//LAYER CONTROL
// L.Control.Layers.WithSomethingExtra = L.Control.Layers.extend({
//   _initLayout: function() {
//     L.Control.Layers.prototype._initLayout.call(this);
//     L.DomUtil.create('div', 'leaflet-control-layers-separator', this._form);
//     var myThing = L.DomUtil.create('div', 'info legend', this._form);
//     myThing.innerHTML = 'My custom thing inside the layers control!! <h6>Absorption Rate</h6>';
//   }
// });


var ourCustomControl = L.Control.extend({
 
  options: {
    position: 'topright' 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
  },
 
  onAdd: function (map) {
    var container = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-layers');
    container.setAttribute('aria-haspopup','true');
    //container.innerHTML = '<a class="leaflet-control-layers-toggle" href="#" title="Layers" role="button"></a>'
    container.innerHTML = '<h6 class = "text-center p-1"><b>Explore by Financial Years</b></h6>'+
    // '<h6 class = "text-center p-1"><b>Explore data by Financial Years</b></h6>'+
    // '<section class="leaflet-control-layers-list">'+
    //   '<div class="leaflet-control-layers-base">'+
        '<div class="accordion-container">'+
          '<div class="ac" id="2015_2016" ><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2015 - 2016</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2015_2016_OAR" id="2015_2016_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2015_2016_TE" id="2015_2016_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2015_2016_CVT" id="2015_2016_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2015_2016_PB" id="2015_2016_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2016_2017"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2016 - 2017</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2016_2017_OAR" id="2016_2017_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2016_2017_TE" id="2016_2017_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2016_2017_CVT" id="2016_2017_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2016_2017_PB" id="2016_2017_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2017_2018"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2017 - 2018</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2017_2018_OAR" id="2017_2018_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2017_2018_TE" id="2017_2018_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2017_2018_CVT" id="2017_2018_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2017_2018_PB" id="2017_2018_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2018_2019"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2018 - 2019</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2018_2019_OAR" id="2018_2019_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2018_2019_TE" id="2018_2019_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2018_2019_CVT" id="2018_2019_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2018_2019_PB" id="2018_2019_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2019_2020"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2019 - 2020</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2019_2020_OAR" id="2019_2020_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2019_2020_TE" id="2019_2020_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2019_2020_CVT" id="2019_2020_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2019_2020_PB" id="2019_2020_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2020_2021"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2020 - 2021</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2020_2021_OAR" id="2020_2021_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2020_2021_TE" id="2020_2021_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2020_2021_CVT" id="2020_2021_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2020_2021_PB" id="2020_2021_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2021_2022"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2021 - 2022</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2021_2022_OAR" id="2021_2022_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2021_2022_TE" id="2021_2022_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2021_2022_CVT" id="2021_2022_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2021_2022_PB" id="2021_2022_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2022_2023"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2022 - 2023</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="2022_2023_OAR" id="2022_2023_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="2022_2023_TE" id="2022_2023_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="2022_2023_CVT" id="2022_2023_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="2022_2023_PB" id="2022_2023_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
        '</div>'
    //   '</div>'+
    // '</section>'

    container.style.backgroundColor = 'white';
    // container.style.width = '30px';
    // container.style.height = '30px';
 
    container.onclick = function(){
      console.log('buttonClicked');
    }

    return container;
  },
 
});



// onAdd: function (map) {
//     var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
 
//     container.style.backgroundColor = 'white';
//     container.style.width = '30px';
//     container.style.height = '30px';
 
//     container.onclick = function(){
//       console.log('buttonClicked');
//     }
//     return container;
//   }

map.addControl(new ourCustomControl());



//https://stackoverflow.com/questions/44106015/combining-geojson-and-json-for-leaftlet




new Accordion('.accordion-container',{
    onOpen: function(currentElement) {
      console.log(currentElement.id);

//FILTER MECHANISM
$( "input:radio[name='level0']" ).on('click',function(event) {
  console.log($( 'input[name="level0"]:checked' ).val());

    // if($('input[name="level0"]:checked').prop("checked") == true){
    //     //filtered.clearLayers();
    //     var layerClicked = window[event.target.value];
    //     var test = $( 'input[name="level0"]:checked' ).val();
    //     console.log(test); 
    // }
    // else if($('input[name="level0"]:checked').prop("checked") == false){
    //     //filtered.clearLayers();
    //     console.log("Checkbox is unchecked.");
    // }

});


    }
});





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var map = L.map('map').setView([-0.0841,34.7737], 12 );

// //map.addControl(L.control.zoom({position:'topright'}));
// //map.setMaxBounds(map.getBounds());


// // var map = L.map('map' ,{center :[-0.0841,34.7737] , zoom : 13 });
// // map.addControl(L.control.zoom({position:'topright'}));

// var baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



// //LAYER STYLES
// var style_boundary = {
//     "color": "#0d0d0d",
//     "weight": 1.5,
//     "opacity": 1,
//     "fillColor": "#ADADAD",
//     "fillOpacity": 0.3
// };

// var style_zones = {
//     "color": "#cc3300",
//     "weight": 2,
//     "opacity": 0.5,
//     "fillColor": "white",
//     "fillOpacity": 0.1
// };

// var style_pts= {
//     "radius": 5,
//     "weight": 0,
//     "opacity": 1,
//     "fillColor": "#cc66ff",
//     "fillOpacity": 1
// };
// //functional toilets style
// function functional_toilets(b) {
//     return b == 'Yes' ? '#ff0000' :
//            b == 'No'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function funcToiletsStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: functional_toilets(feature.properties.Toilet_functional),
//         fillOpacity:1
//     };
// }
// //facility management style
// function facility_management(b) {
//     return b == 'School' ? '#6666ff' :
//            b == 'County government'  ? '#cc9900' :
//            b == 'An Individual'  ? '#00cc00' :
//            b == 'A Private Company'  ? '#ffff66' :
//            b == 'A Community Based Organization'  ? '#0066cc' :
//                       '#a6a6a6';
// }
// function facilityMgtStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: facility_management(feature.properties.Facility_management),
//         fillOpacity:1
//     };
// }

// //toilet distribution style
// function toilet_distribution(b) {
//     return b == 'CBD' ? '#1e81b0' :
//            b == 'KenyaRe'  ? '#e28743' :
//            b == 'Manyatta'  ? '#873e23' :
//            b == 'ME'  ? '#bea925' :
//            b == 'Milimani/Nyalenda'  ? '#be2596' :
//                       '#a6a6a6';
// }
// function toiletDistStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: toilet_distribution(feature.properties.Zone),
//         fillOpacity:1
//     };
// }

// //water source style
// function water_source(b) {
//     return b == 'Borehole' ? '#0AB5F0' :
//            b == 'KIWASCO'  ? '#50FA0A' :
//            b == 'River'  ? '#E39E14' :
//            b == 'Water Tank'  ? '#FA0A48' :
//            b == 'Water Vendors'  ? '#989CEF' :
//                       '#a6a6a6';
// }
// function waterSourceStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: water_source(feature.properties.water_source),
//         fillOpacity:1
//     };
// }

// //cleaning frequency style
// function cleaning_frequency(b) {
//     return b == 'Twice a day' ? '#50FA0A' :
//            b == 'Three to four times a day'  ? '#0AB5F0' :
//            b == 'Once a day'  ? '#989CEF' :
//            b == 'A few times a week'  ? '#E39E14' :
//                       '#a6a6a6';
// }
// function cleaningFreqStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: cleaning_frequency(feature.properties.toilet_clean_frequency),
//         fillOpacity:1
//     };
// }

// //emptying service provider style
// function esp(b) {
//     return b == 'Semi- mechanized emptying service provider (using a pump e.g. Ghasia Poa)' ? '#50FA0A' :
//            b == 'Private exhauster'  ? '#E39E14' :
//            b == 'Manual emptier (using a bucket/ shovel)'  ? '#FA0A48' :
//            b == 'KIWASCO Exhauster Truck'  ? '#0AB5F0' :
//            b == 'Covered and another pit dug'  ? '#989CEF' :
//                       '#a6a6a6';
// }
// function espStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: esp(feature.properties.emptying_service_provider),
//         fillOpacity:1
//     };
// }

// //containment_emptied_status style
// function ces(b) {
//     return b == 'Yes' ? '#ff0000' :
//            b == 'No'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function cesStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: ces(feature.properties.containment_emptied),
//         fillOpacity:1
//     };
// }

// //toilets type style
// function tt(c) {
//     return c == 'Pit latrine with slab ' ? '#0AD6F0' :
//            c == 'Flush to septic tank '  ? '#67FA0A' :
//            c == 'Flush to pit latrine '  ? '#E39E14' :
//            c == 'Flush to piped sewer system '  ? '#FA0A26' :
//            c == 'Flush to don’t know where '  ? '#A198F0' :
//            c == 'Flush to bio digester'  ? '#ffd43a' :           
//                       '#a6a6a6';
// }
// function ttStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0,
//         fillColor: tt(feature.properties.Type_of_toilet_facility),
//         fillOpacity:1
//     };
// }

// //showers availability style
// function s_availability(b) {
//     return b == 'Yes' ? '#ff0000' :
//            b == 'No'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function s_availabilityStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: s_availability(feature.properties.Shower_facility_available),
//         fillOpacity:1
//     };
// }

// //urinals availability style
// function u_availability(b) {
//     return b == 'Yes' ? '#ff0000' :
//            b == 'No'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function u_availabilityStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: u_availability(feature.properties.Urianal_available),
//         fillOpacity:1
//     };
// }

// //gendered access style
// function g_access(b) {
//     return b == 'shared' ? '#ff0000' :
//            b == 'separated'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function g_accessStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: g_access(feature.properties.toilet_gender),
//         fillOpacity:1
//     };
// }

// //pwd access style
// function p_access(b) {
//     return b == 'Yes' ? '#ff0000' :
//            b == 'No'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function p_accessStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: p_access(feature.properties.accessible_to_people_with_limited_mobility),
//         fillOpacity:1
//     };
// }

// //shower access style
// function s_access(b) {
//     return b == 'shared' ? '#ff0000' :
//            b == 'separated'  ? '#00cc00' :
//                       '#a6a6a6';
// }
// function s_accessStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: s_access(feature.properties.shower_gender),
//         fillOpacity:1
//     };
// }

// //water tank style
// function water_tank(b) {
//     return b == '1' ? '#67FA0A' :
//            b == '0'  ? '#a6a6a6' :
//                       '#a6a6a6';
// }
// function water_tankStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: water_tank(feature.properties.waterStorageTank),
//         fillOpacity:1
//     };
// }

// //baby changing
// function baby_changingStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: water_tank(feature.properties.baby_changing_facility),
//         fillOpacity:1
//     };
// }

// //MenstrualDisposalBin
// function mdbStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: water_tank(feature.properties.MenstrualDisposalBin),
//         fillOpacity:1
//     };
// }

// //dustbin
// function dbStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: water_tank(feature.properties.Dustbin),
//         fillOpacity:1
//     };
// }




// //LAYER INTERACTIONS
// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 4,
//         color: '#ffff00',
//         dashArray: '',
//         fillOpacity: 0
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
//     //info.update(layer.feature.properties);
// }
// function resetHighlight(e) {
//     service_zones.resetStyle(e.target);
//     //info.update();
// }

// function zoomToFeature(e,nameIG) {
//     //var nameIG = e.target.feature.properties.SHEET_NO; 
//     map.fitBounds(e.target.getBounds());
//     // info1.update(e.target.feature.properties);
//     // console.log(nameIG);

//     // var img = new Image();
//     // img.src = "http://simoa.me.ke/img/topo/" + nameIG+ ".jpg";

//     // var $image = $("img").first();
//     // var $downloadingImage = $("<img>");
//     // $downloadingImage.load(function(){
//     //   $image.attr("src", $(this).attr("src"));  
//     // });
//     // $downloadingImage.attr("src", img.src);

//     // img.onerror = function() {
//     //     img.alt = "404";
//     //     console.log('fail');
//     // };
//     // img.onload = function() {
//     //     if (img.alt === "404") {
//     //         return;
//     //     }
//     //     console.log('yes');
//     // };

// }

// function onEachServiceZoneFeature(feature, layer) {
//     layer.bindPopup(feature.properties.Zone);
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature       
//     });    
// }

// function onEachPOIFeature(feature, layer) {
//     layer.bindPopup(feature.properties.NAME);
//     // layer.on({
//     //     //mouseover: highlightFeature,
//     //     //mouseout: resetHighlight,
//     //     click: zoomToFeature       
//     // });    
// }


// //SIDEBARS

// //images
// // var infoImages = L.control({position: 'bottomleft'});

// // infoImages.onAdd = function (map) {
// //     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
// //     this.update();
// //     return this._div;
// // };

// // // method that we will use to update the control based on feature properties passed
// // infoImages.update = function (props) {
// //     this._div.innerHTML = '<h4> Photo of surveyed Facility </h4>'+'<button id="ImgButton" class="open">Click to view</button>';
    
// // };


// // infoImages.addTo(map);

// // $('body').append('<div class="popup-overlay"><div class="popup-content"><p> SHEET previews come here!!</p><br/><button class="close">Close</button></div></div>');

// // $(".open").on("click", function(){
// //     console.log('tHIS WORKS!!')
// //     $(".popup-overlay, .popup-content").addClass("active");
// // });

// // $(".close, .popup-overlay").on("click", function(){
// //     console.log('tHIS worked!!')
// //     $(".popup-overlay, .popup-content").removeClass("active");
// // });



// //FILTER WINDOWS
// var infoW = L.control({position: 'topleft'});

// infoW.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// // method that we will use to update the control based on feature properties passed
// infoW.update = function (props) {
//     this._div.innerHTML = '<h4> Explore different data themes </h4>'+'<div class="#containerElement">'+
//     '<div>'+
//         '<input type="radio" name="level0" value="o_status" id="A"/>'+
//         '<label class="container0 "for="A">Operational Status</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="functional_status" id="A0"/>'+
//                 '<label for="A0">Functional Status of the toilets</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="facility_management" id="A1"/>'+
//                 '<label for="A1">Facility management</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilet_distribution" id="A1"/>'+
//                 '<label for="A1">Toilet Distribution in the County</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="water_source" id="A1"/>'+
//                 '<label for="A1">Water Source</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="cleaning_frequency" id="A1"/>'+
//                 '<label for="A1">Cleaning frequency</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="emptying_service_provider" id="A1"/>'+
//                 '<label for="A1">Emptying service provider</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="containment_emptied_status" id="A1"/>'+
//                 '<label for="A1">Containment emptied status</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="t_facilities" id="B"/>'+
//         '<label class="container0" for="B">Toilet Facilities</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets_type" id="A0"/>'+
//                 '<label for="A0">Type of toilet facility</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shower_facility" id="A1"/>'+
//                 '<label for="A1">Availability of shower facility</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="urinals" id="A1"/>'+
//                 '<label for="A1">Availability of urinals</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="t_access" id="C"/>'+
//         '<label class="container0" for="C">Toilet Access</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="gender_access" id="A0"/>'+
//                 '<label for="A0">Access based on Gender</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pwd_access" id="A1"/>'+
//                 '<label for="A1">Access for persons with Limited Mobility</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shower_access" id="A1"/>'+
//                 '<label for="A1">Access to shower facility based on Gender</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="other_facilities" id="C"/>'+
//         '<label class="container0" for="C">Other available facilities </label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="storage_tanks" id="A0"/>'+
//                 '<label for="A0">Water Storage Tanks</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="baby_changing" id="A1"/>'+
//                 '<label for="A1">Baby changing facilities</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="men_disposal_bin" id="A1"/>'+
//                 '<label for="A1">Menustral Disposal Bin</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="dustbins" id="A1"/>'+
//                 '<label for="A1">Dustbins</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     // '<div>'+
//     //     '<input type="radio" name="level0" value="religious" id="C"/>'+
//     //     '<label class="container0" for="C">Religious</label>'+
//     //     '<div class="sub1">'+
//     //         '<div>'+
//     //             '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//     //             '<label for="A0">Toilet Available?</label>'+
//     //         '</div>'+
//     //         '<div>'+
//     //             '<input type="radio" name="level1" value="shared" id="A1"/>'+
//     //             '<label for="A1">Shared?</label>'+
//     //         '</div>'+
//     //         '<div>'+
//     //             '<input type="radio" name="level1" value="connected" id="A1"/>'+
//     //             '<label for="A1">Sewer Connecter</label>'+
//     //         '</div>'+
//     //         '<div>'+
//     //             '<input type="radio" name="level1" value="pit" id="A1"/>'+
//     //             '<label for="A1">Pit Latrines</label>'+
//     //         '</div>'+
//     //     '</div>'+
//     // '</div>'+
//     '</div>'+'</div>';    
// };

// infoW.addTo(map);


// //LAYERS
// //boundary
// var service_boundary = L.geoJson(boundary,{style:style_boundary}).addTo(map);

// //zones
// var service_zones = L.geoJson(zones,{style:style_zones,onEachFeature:onEachServiceZoneFeature});

// //POI
// var pois = L.geoJson(poi,{onEachFeature:onEachPOIFeature});

// //survey points
// //var pts_points = L.geoJson(data,{style:style_pts}).addTo(map);

// var pts_points = L.geoJSON(data, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, style_pts).bindPopup('<img id ="pics" src="./img/images/'+feature.properties.photo_toilet_facility+'"/>');
//     }
// });



// //MAP LEGENDS
// //LEGEND
// var legend_pipes = L.control({position: 'bottomright'});
// legend_pipes.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Yes", "No"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + functional_toilets(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_fmgt = L.control({position: 'bottomright'});
// legend_fmgt.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["School", "County government","An Individual","A Private Company","A Community Based Organization"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + facility_management(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_tdis = L.control({position: 'bottomright'});
// legend_tdis.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["ME", "CBD","KenyaRe","Manyatta","Milimani/Nyalenda"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + toilet_distribution(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_ws = L.control({position: 'bottomright'});
// legend_ws.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["River", "KIWASCO","Borehole","Water Tank","Water Vendors"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + water_source(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_cf = L.control({position: 'bottomright'});
// legend_cf.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Once a day", "Twice a day","A few times a week","Three to four times a day"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + cleaning_frequency(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_esp = L.control({position: 'bottomright'});
// legend_esp.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Private exhauster", "KIWASCO Exhauster Truck","Covered and another pit dug","Manual emptier (using a bucket/ shovel)","Semi- mechanized emptying service provider (using a pump e.g. Ghasia Poa)"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + esp(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_ces = L.control({position: 'bottomright'});
// legend_ces.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Yes", "No"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + ces(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_tt = L.control({position: 'bottomright'});
// legend_tt.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Flush to pit latrine ", "Flush to septic tank ","Flush to bio digester","Pit latrine with slab ","Flush to don’t know where ","Flush to piped sewer system "],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + tt(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_s_avail = L.control({position: 'bottomright'});
// legend_s_avail.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Yes", "No"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + s_availability(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_u_avail = L.control({position: 'bottomright'});
// legend_u_avail.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Yes", "No"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + u_availability(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_g_access = L.control({position: 'bottomright'});
// legend_g_access.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["shared", "separated"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + g_access(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_p_access = L.control({position: 'bottomright'});
// legend_p_access.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["Yes", "No"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + p_access(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_s_access = L.control({position: 'bottomright'});
// legend_s_access.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["shared", "separated"],
//         labels = [];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + s_access(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };

// var legend_wt = L.control({position: 'bottomright'});
// legend_wt.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["0", "1"],
//         labels = ["No", "Yes"];
//         for (var i = 0; i < grades.length; i++) {
//             div.innerHTML +=
//             '<i style="background:' + water_tank(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//         }
//     return div;
// };


// currentLegend = legend_pipes;


// //layer control
// var baseMaps = {
//     "OpenStreetMap": baselayer,
// };

// var overlayMaps = {
//     "Points of Interest": pois,
//     "Zones": service_zones,
//     "Kiwasco service area boundary ": service_boundary,
// };
// var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);



// filtered = L.featureGroup().addLayer(pts_points).addTo(map);


// //FILTER MECHANISM
// $( "input:radio[name='level0']" ).on('click',function( event) {
//     if($('input[name="level0"]:checked').prop("checked") == true){
//         //filtered.clearLayers();
//         var layerClicked = window[event.target.value];
//         var test = $( 'input[name="level0"]:checked' ).val();
//         console.log(test); 
// //level1
//         $( "input:radio[name='level1']" ).on('click',function( event) {
//             if($('input[name="level1"]:checked').prop("checked") == true){
//                 var test1 = $( "input[name='level1']:checked" ).val();
//                 console.log(test1);
//                 if (test1=='functional_status') {
//                     filtered.setStyle(funcToiletsStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_pipes;
//                     legend_pipes.addTo(map);
//                 }else if(test1=='facility_management'){
//                     filtered.setStyle(facilityMgtStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_fmgt;
//                     legend_fmgt.addTo(map);                    
//                 }else if(test1=='toilet_distribution'){
//                     filtered.setStyle(toiletDistStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_tdis;
//                     legend_tdis.addTo(map); 
//                 }else if(test1=='water_source'){
//                     filtered.setStyle(waterSourceStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_ws;
//                     legend_ws.addTo(map); 
//                 }else if(test1=='cleaning_frequency'){
//                     filtered.setStyle(cleaningFreqStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_cf;
//                     legend_cf.addTo(map);
//                 }else if(test1=='emptying_service_provider'){
//                     filtered.setStyle(espStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_esp;
//                     legend_esp.addTo(map);
//                 }else if(test1=='containment_emptied_status'){
//                     filtered.setStyle(cesStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_ces;
//                     legend_ces.addTo(map);
//                 }else if(test1=='toilets_type'){
//                     filtered.setStyle(ttStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_tt;
//                     legend_tt.addTo(map);
//                 }else if(test1=='shower_facility'){
//                     filtered.setStyle(s_availabilityStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_s_avail;
//                     legend_s_avail.addTo(map);
//                 }else if(test1=='urinals'){
//                     filtered.setStyle(u_availabilityStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_u_avail;
//                     legend_u_avail.addTo(map);
//                 }else if(test1=='gender_access'){
//                     filtered.setStyle(g_accessStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_g_access;
//                     legend_g_access.addTo(map);
//                 }else if(test1=='pwd_access'){
//                     filtered.setStyle(p_accessStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_p_access;
//                     legend_p_access.addTo(map);
//                 }else if(test1=='shower_access'){
//                     filtered.setStyle(g_accessStyle);
//                     map.removeControl(currentLegend );
//                     currentLegend = legend_s_access;
//                     legend_s_access.addTo(map);
//                 }else if(test1=='storage_tanks'){
//                     filtered.setStyle(water_tankStyle);
//                     map.removeControl(currentLegend );
//                 }else if(test1=='baby_changing'){
//                     filtered.setStyle(baby_changingStyle);
//                     map.removeControl(currentLegend );
//                 }else if(test1=='men_disposal_bin'){
//                     filtered.setStyle(mdbStyle);
//                     map.removeControl(currentLegend );
//                 }else if(test1=='dustbins'){
//                     filtered.setStyle(dbStyle);
//                     map.removeControl(currentLegend );
//                 }
//             }
//             else if($('input[name="level1"]:checked').prop("checked") == false){

//             }
//         });

//     }
//     else if($('input[name="level0"]:checked').prop("checked") == false){
//         //filtered.clearLayers();
//         console.log("Checkbox is unchecked.");
//     }

// });
