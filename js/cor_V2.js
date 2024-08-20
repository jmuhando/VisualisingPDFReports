
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

function getColorEEC(d) {
    return d > 10000000000 ? colours('#ffffe0','#00429d', 6)[5] :
           d > 10000000000 ? colours('#ffffe0','#00429d', 6)[4] :
           d > 5000000000  ? colours('#ffffe0','#00429d', 6)[3] :
           d > 3000000000  ? colours('#ffffe0','#00429d', 6)[2] :
           d > 2000000000  ? colours('#ffffe0','#00429d', 6)[1] :
           d > 1000000000  ? colours('#ffffe0','#00429d', 6)[0] :
                      '#ffebc9';
}

function getColorLRC(d) {
    return d > 100 ? colours('#fff02f','#ea002a', 6)[5] :
           d > 90 ? colours('#fff02f','#ea002a', 6)[4] :
           d > 75 ? colours('#fff02f','#ea002a', 6)[3] :
           d > 50 ? colours('#fff02f','#ea002a', 6)[2] :
           d > 25 ? colours('#fff02f','#ea002a', 6)[1] :
           d > 10 ? colours('#fff02f','#ea002a', 6)[0] :
                      '#ffebc9';
}


function getColorPB(d) {
    return d > 1000000000 ? colours('#7cfc00','#006400', 6)[5] :
           d > 1000000000 ? colours('#7cfc00','#006400', 6)[4] :
           d > 750000000  ? colours('#7cfc00','#006400', 6)[3] :
           d > 500000000  ? colours('#7cfc00','#006400', 6)[2] :
           d > 250000000  ? colours('#7cfc00','#006400', 6)[1] :
           d > 100000000  ? colours('#7cfc00','#006400', 6)[0] :
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
  console.log(Data_Extractor(data,e.target.feature.properties.NAME));
// update chart data with county level data
var chart_data = Data_Extractor(data,e.target.feature.properties.NAME);
//your data coming from  service
//console.log(_.map(temp1.CBAEAR, function (value,key) {return _.values(value)[1];}));

//CBAEAR
//CBAEAR bar graph update
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[0];}));//Rec_BudgetEstimates
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[1];}));//Dev_BudgetEstimates
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[3];}));//Rec_Expenditure
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[4];}));//Dev_Expenditure

barChart.data.datasets[0].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[0];}); 
barChart.data.datasets[1].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[1];});
barChart.data.datasets[2].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[3];}); 
barChart.data.datasets[3].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[4];});
barChart.update();

//CBAEAR radar chart update
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[7];}));//Dev_AbsorptionRate
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[6];}));//Rec_AbsorptionRate
// console.log(_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[8];}));//OverallAbsorptionRate

radarChart.data.datasets[0].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[7];}); 
radarChart.data.datasets[1].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[6];});
radarChart.data.datasets[2].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[8];}); 
radarChart.update();

//EEC
//EEC stepped line graph update
// console.log(_.map(chart_data.EEC, function (value,key) {return (_.values(value)[0]/1000000);}));//Personnel Emoluments
// console.log(_.map(chart_data.EEC, function (value,key) {return (_.values(value)[1]/1000000);}));//Operations Maintenance
// console.log(_.map(chart_data.EEC, function (value,key) {return (_.values(value)[2]/1000000);}));//Development Expenditure

steppedlineChart.data.datasets[0].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[0]/1000000);});//Personnel Emoluments
steppedlineChart.data.datasets[1].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[1]/1000000);});//Operations Maintenance
steppedlineChart.data.datasets[2].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[2]/1000000);});//Development Expenditure
steppedlineChart.update();

//EEC horizontal Bar graph update

//console.log(_.map(chart_data.EEC, function (value,key) {return (_.values(value)[3]/1000000);}));//Total Expenditure

hrBarChart.data.datasets[0].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[3]/1000000);});//Total Expenditure
hrBarChart.update();

//LRC
//comboBarLine chart
// console.log(_.map(chart_data.LRC, function (value,key) {return _.values(value)[name];}));
// console.log(_.union(_.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'Collection_vs_target'));})));
// console.log(_.map(chart_data.LRC, _.flatten(function (value,key) {return _.values(_.pick(value, 'Collection_vs_target'));})));
//var cvt = "Collection_vs_target"
//console.log(_.map(chart_data.LRC, function (value,key) {return _.flatten(_.values(_.pick(value, 'Collection_vs_target')[0]));}));
var osrc = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'OwnSourceRevenue_collection'));})
var osrc_values = _.flatten(osrc)
console.log(osrc_values.map(function (el) {return el / 1000000;}));
comboChart.data.datasets[0].data=osrc_values.map(function (el) {return el / 1000000;});

var osrt = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'OwnSourceRevenue_target'));})
var osrt_values = _.flatten(osrt)
console.log(osrt_values.map(function (el) {return el / 1000000;}));
comboChart.data.datasets[1].data=osrt_values.map(function (el) {return el / 1000000;});

comboChart.update();


var cvt = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'Collection_vs_target'));})
var cvt_values = _.flatten(cvt)
console.log(cvt_values);
//_.pick(value, 'OwnSourceRevenue_target','OwnSourceRevenue_collection')

//PB
// console.log(_.map(chart_data.PB, function (value,key) {return _.values(value)[0];}));

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
  // for (let key in CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate) {
  //       if (CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate.hasOwnProperty(key) && key == feature.properties.NAME) {
  //           value = CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate[key];
  //           //console.log(key, value);
  //           //var layer = e.target;
  //           layer.setStyle({
  //             fillColor: getColor(value),
  //             weight: 2,
  //             color: '#fff',
  //             dashArray: '5',
  //             fillOpacity: 0.9
  //           });

  //       }
  // }

  layer.bindPopup(feature.properties.NAME);
  layer.on({
    click: zoomToFeature,
  });
}




//County Layer
var counties_layer = L.geoJson(counties,{style:style_boundary ,onEachFeature:onEachFeature}).addTo(map);
//console.log(counties_layer);

//INFO COUNTY WINDOW
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


//LEGENDS
L.Legend = L.Control.extend({
    'onAdd': function (map) {

        // add reference to mapinstance
        map.legend = this;

        // create container
        var container = L.DomUtil.create('div', 'legend-control-container');

        // if content provided
        if (this.options.content) {

            // set content
            container.innerHTML = this.options.content;

        }
        return container;
    },
    'onRemove': function (map) {

      // remove reference from mapinstance
      delete map.legend;

    },

    // new method for setting innerHTML
    'setContent': function(str) {
        this.getContainer().innerHTML = str;
    }
});

//test legend
var test_legend = new L.Legend({position: 'bottomright'});
test_legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 60, 70, 80, 90, 100],
        labels = [];
    div.innerHTML = '<h6>Test Absorption Rate % </h6>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

test_legend.addTo(map);



//Absorption Rate Legend
var legendAR = L.control({position: 'bottomright'});

legendAR.onAdd = function (map) {

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

//legendAR.addTo(map);


//Total Expenditure Legend
var legendTE = L.control({position: 'bottomright'});

legendTE.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1000000000, 2000000000, 3000000000, 4000000000, 5000000000, 10000000000],
        labels = [];
    div.innerHTML = '<h6>Expenditure in Billions </h6>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorEEC(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

//legendTE.addTo(map);


//Collection Vs Target Legend
var legendLRC = L.control({position: 'bottomright'});

legendLRC.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 25, 50, 75, 90, 100],
        labels = [];
    div.innerHTML = '<h6>Collection Vs Target % </h6>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorLRC(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

//legendLRC.addTo(map);

//Pending Bills Legend
var legendPB = L.control({position: 'bottomright'});

legendPB.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100000000, 250000000, 500000000, 750000000, 1000000000, 1000000000],
        labels = [];
    div.innerHTML = '<h6>Pending Bills in Billions </h6>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorPB(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

//legendPB.addTo(map);

//currentLegend = legendAR;


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
    container.innerHTML = '<h6 class = "text-center p-1"><b>Financial Years Overview</b></h6>'+
    // '<h6 class = "text-center p-1"><b>Explore data by Financial Years</b></h6>'+
    // '<section class="leaflet-control-layers-list">'+
    //   '<div class="leaflet-control-layers-base">'+
        '<div class="accordion-container">'+
          '<div class="ac" id="2015_2016" ><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2015 - 2016</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2015_2016" id="2015_2016_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2015_2016" id="2015_2016_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2015_2016" id="2015_2016_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2015_2016" id="2015_2016_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2016_2017"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2016 - 2017</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2016_2017" id="2016_2017_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2016_2017" id="2016_2017_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2016_2017" id="2016_2017_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2016_2017" id="2016_2017_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2017_2018"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2017 - 2018</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2017_2018" id="2017_2018_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2017_2018" id="2017_2018_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2017_2018" id="2017_2018_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2017_2018" id="2017_2018_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2018_2019"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2018 - 2019</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2018_2019" id="2018_2019_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2018_2019" id="2018_2019_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2018_2019" id="2018_2019_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2018_2019" id="2018_2019_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2019_2020"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2019 - 2020</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2019_2020" id="2019_2020_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2019_2020" id="2019_2020_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2019_2020" id="2019_2020_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2019_2020" id="2019_2020_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2020_2021"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2020 - 2021</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2020_2021" id="2020_2021_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2020_2021" id="2020_2021_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2020_2021" id="2020_2021_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2020_2021" id="2020_2021_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2021_2022"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2021 - 2022</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2021_2022" id="2021_2022_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2021_2022" id="2021_2022_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2021_2022" id="2021_2022_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2021_2022" id="2021_2022_PB"/>'+
              '<span class="ms-2">Pending Bills</span>'+
            '</div>'+
          '</div>'+
          '<div class="ac" id="2022_2023"><h6 class="ac-header"><button type="button" class="ac-trigger text-center">2022 - 2023</button></h6>'+
            '<div class="ac-panel ms-2">'+
              '<input type="radio" name="level0" value="CBAEAR_2022_2023" id="2022_2023_OAR"/>'+
              '<span class="ms-2">Overall Absorption Rate</span></br>'+
              '<input type="radio" name="level0" value="EEC_2022_2023" id="2022_2023_TE"/>'+
              '<span class="ms-2">Total Expenditure</span></br>'+
              '<input type="radio" name="level0" value="LRC_2022_2023" id="2022_2023_CVT"/>'+
              '<span class="ms-2">Collections Vs Target</span></br>'+
              '<input type="radio" name="level0" value="PB_2022_2023" id="2022_2023_PB"/>'+
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
      //console.log(counties_layer);
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


// map.removeControl(currentLegend );
currentLegend = test_legend;
// legendTE.addTo(map); 

//legendTE.addTo(map);
//legendAR.addTo(map);

new Accordion('.accordion-container',{
    onOpen: function(currentElement) {
      console.log(currentElement.id);
      console.log(counties_layer);
      console.log(legendAR);
      console.log(map);

//FILTER MECHANISM
      $( "input:radio[name='level0']" ).on('click',function(event) {
        //console.log($( 'input[name="level0"]:checked' ).val());
        //console.log($( 'input[name="level0"]:checked' ).attr('id'));
        var clicked = $( 'input[name="level0"]:checked' ).val();
        let result = clicked.slice(0, -10);
        //console.log(result);
        if (clicked.slice(0, -10) === "CBAEAR") {
          console.log("CBAEAR files", clicked);
          var path = clicked.concat(".OverallAbsorptionRate")
          console.log(path);
          console.log(access(path, CBAEAR));

          counties_layer.eachLayer(function (feature,layer) {
            //console.log(feature.feature.properties.NAME);
            for (let key in access(path, CBAEAR)) {
              if (access(path, CBAEAR).hasOwnProperty(key) && key == feature.feature.properties.NAME) {
                value = access(path, CBAEAR)[key];
                      //console.log(key, value);
                      //var layer = e.target;
                feature.setStyle({
                  fillColor: getColor(value),
                  weight: 2,
                  color: '#fff',
                  dashArray: '5',
                  fillOpacity: 0.9
                });
              }
            }
          });
          map.removeControl(currentLegend);
          currentLegend = legendAR;
          legendAR.addTo(map); 



        } 
        else if (clicked.slice(0, -10) === "EEC") {
          console.log("EEC files", clicked);
          var path = clicked.concat(".TotalExpenditure")
          console.log(path);
          console.log(access(path, EEC));
          counties_layer.eachLayer(function (feature,layer) {
            //console.log(feature.feature.properties.NAME);
            for (let key in access(path, EEC)) {
              if (access(path, EEC).hasOwnProperty(key) && key == feature.feature.properties.NAME) {
                value = access(path, EEC)[key];
                      //console.log(key, value);
                      //var layer = e.target;
                feature.setStyle({
                  fillColor: getColorEEC(value),
                  weight: 2,
                  color: '#fff',
                  dashArray: '5',
                  fillOpacity: 0.9
                });
              }
            }
          });

          map.removeControl(currentLegend);
          currentLegend = legendTE;
          legendTE.addTo(map); 


        }
        else if (clicked.slice(0, -10) === "LRC") {
          console.log("LRC files", clicked);
          var path = clicked.concat(".Collection_vs_target")
          console.log(path);
          console.log(access(path, LRC));

          counties_layer.eachLayer(function (feature,layer) {
            //console.log(feature.feature.properties.NAME);
            for (let key in access(path, LRC)) {
              if (access(path, LRC).hasOwnProperty(key) && key == feature.feature.properties.NAME) {
                value = access(path, LRC)[key];
                      //console.log(key, value);
                      //var layer = e.target;
                feature.setStyle({
                  fillColor: getColorLRC(value),
                  weight: 2,
                  color: '#fff',
                  dashArray: '5',
                  fillOpacity: 0.9
                });
              }
            }
          });

          map.removeControl(currentLegend);
          currentLegend = legendLRC;
          legendLRC.addTo(map); 


        }
        else if (clicked.slice(0, -10) === "PB") {
          console.log("PB files", clicked);
          var path = clicked.concat(".TotalPendingBills")
          console.log(path);
          console.log(access(path, PB));

          counties_layer.eachLayer(function (feature,layer) {
            //console.log(feature.feature.properties.NAME);
            for (let key in access(path, PB)) {
              if (access(path, PB).hasOwnProperty(key) && key == feature.feature.properties.NAME) {
                value = access(path, PB)[key];
                      //console.log(key, value);
                      //var layer = e.target;
                feature.setStyle({
                  fillColor: getColorPB(value),
                  weight: 2,
                  color: '#fff',
                  dashArray: '5',
                  fillOpacity: 0.9
                });
              }
            }
          });

          map.removeControl(currentLegend);
          currentLegend = legendPB;
          legendPB.addTo(map); 

        }
      });
    }
});

//how to filter the data files
let access = (path, object) => {
  return path.split('.').reduce((o, i) => o[i], object)
}

//graphs




//underscore
//get max and min values
// _.omit(temp1, "total")// remove totals

// _.chain(_.omit(temp2, "total")).max().value()
// _.chain(_.omit(temp1, "total")).min().value()

//length of objects
//Object.keys(CBAEAR).length;

// for (var [key, value] of Object.entries(CBAEAR)) {
//     console.log(key);
//     console.log(value);
// }

//var data = [{'CBAEAR':CBAEAR},{'EEC':EEC},{'LRC':LRC},{'PB':PB}];
var data = {'CBAEAR':CBAEAR,'EEC':EEC,'LRC':LRC,'PB':PB};

function Data_Extractor(data,county_name) {
    var each_data = {};
    if (_.isEmpty(each_data)) {
        //console.log("each_data is empty");
        _.each(data, function (value,key) {
            if (key=== "CBAEAR") {
                //console.log("Dataset is",key);
                //console.log("Test works");
                //console.log(value);
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    //console.log("Year of dataset is", year);
                    //console.log(value1);
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        //console.log("Data point is", data_point);
                        //console.log(value2);
                        //console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
                        //console.log(parseFloat(_.values(_.pick(value2, 'total'))));
                        
                        //each_data[key][data_point][year]= {};
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }

//                 _.each(value, function (value1,key1) {
//                     //console.log(key1);
//                     var year = key1;
//                     console.log("Year of dataset is", year);
//                     console.log(value1);

// each_data[key]={};
// for (var [key2, value2] of Object.entries(value1)) {
//     //console.log(key2);
//     var data_point = key2;
//     console.log("Data point is", data_point);
//     console.log(value2);
//     //console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
//     console.log(parseFloat(_.values(_.pick(value2, 'total'))));
//     each_data[key][data_point]={};
//     each_data[key][data_point][year]= parseFloat(_.values(_.pick(value2, 'total')));

// }

//                     // _.each(value1, function (value2,key2) {
//                     //     //console.log(key2);
//                     //     var data_point = key2;
//                     //     console.log("Data point is", data_point);
//                     //     console.log(value2);
//                     //     // console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
//                     //     // console.log(parseFloat(_.values(_.pick(value2, 'total'))));
//                     //     // each_data[year]= parseFloat(_.values(_.pick(value2, 'total')));
//                     //     each_data[key]={};
//                     //     each_data[key][data_point]={};
//                     //     // each_data[key][data_point][year]= parseFloat(_.values(_.pick(value2, 'total')));
//                     // });
//                 });
            } 
            else if (key=== "EEC") {
                //console.log("Dataset is",key);
                //console.log("Test works");
                //console.log(value);
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    //console.log("Year of dataset is", year);
                    //console.log(value1);
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        //console.log("Data point is", data_point);
                        //console.log(value2);
                        //console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
                        //console.log(parseFloat(_.values(_.pick(value2, 'total'))));
                        //each_data[key][data_point][year]= {};
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            else if (key=== "LRC") {
                //console.log("Dataset is",key);
                //console.log("Test works");
                //console.log(value);
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    //console.log("Year of dataset is", year);
                    //console.log(value1);
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        //console.log("Data point is", data_point);
                        //console.log(value2);
                        //console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
                        //console.log(parseFloat(_.values(_.pick(value2, 'total'))));
                        //each_data[key][data_point][year]= {};
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            else if (key=== "PB") {
                //console.log("Dataset is",key);
                //console.log("Test works");
                //console.log(value);
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    //console.log("Year of dataset is", year);
                    //console.log(value1);
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        //console.log("Data point is", data_point);
                        //console.log(value2);
                        //console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
                        //console.log(parseFloat(_.values(_.pick(value2, 'total'))));
                        //each_data[key][data_point][year]= {};
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            //else if () {} else if () {}
            // _.each(value, function (value1,key1) {
            //     //console.log(key1);
            //     var year = key1;
            //     console.log("Year of dataset is", year);
            //     console.log(value1);
            //     _.each(value1, function (value2,key2) {
            //         //console.log(key2);
            //         var data_point = key2;
            //         console.log("Data point is", data_point);
            //         console.log(value2);
            //         console.log("County name is",String(_.keys(_.pick(value2, 'total'))));
            //         console.log(parseInt(_.values(_.pick(value2, 'total'))));
            //     });
            // });
        });
    }
    return each_data;
    //console.log(each_data);
    // _.each(data, function (value,key) {
    //     console.log(key);
    //     console.log(value);
    //     _.each(value, function (value,key) {
    //         console.log(key);
    //         console.log(value);
    //         _.each(value, function (value,key) {
    //             console.log(key);
    //             console.log(value);
    //             console.log(_.pick(value, 'total'));
    //         });
    //     });
    // });
    // body...
}

var chart_data = Data_Extractor(data,"total");


//CHARTS 
//Chart js

var chart_labels = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];

const ctx = document.getElementById('myChart');

let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Rec_BudgetEstimates',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Rec_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Rec_BudgetEstimates
            ],
        borderColor: chroma('hotpink').brighten(),
        backgroundColor: chroma('hotpink').brighten(2),
        borderWidth: 1,
        stack: 'Stack 0',
      },{
        label: 'Dev_BudgetEstimates',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Dev_BudgetEstimates, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Dev_BudgetEstimates
            ],
        borderColor: chroma('red').brighten(),
        backgroundColor: chroma('red').brighten(2),
        borderWidth: 1,
        stack: 'Stack 0',
      },{
        label: 'Rec_Expenditure',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Rec_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Rec_Expenditure
            ],
        borderColor: chroma('hotpink').brighten(),
        backgroundColor: chroma('hotpink').brighten(2),
        borderWidth: 1,
        stack: 'Stack 1',
      },{
        label: 'Dev_Expenditure',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Dev_Expenditure, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Dev_Expenditure
            ],
        borderColor: chroma('red').brighten(),
        backgroundColor: chroma('red').brighten(2),
        borderWidth: 1,
        stack: 'Stack 1',
      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                },
            legend: {
                position: 'bottom'
                }
            },
        scales: {
            x: {
              // beginAtZero: true,
              stacked: true
            },
            y: {
              // beginAtZero: true,
              stacked: true
            }
        }
    }
});

//RADAR
const RadarChart = document.getElementById('myRadarChart');

let radarChart = new Chart(RadarChart, {
    type: 'radar',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Dev_AbsorptionRate',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Dev_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Dev_AbsorptionRate
            ],
        //borderColor: chroma('hotpink').brighten(),
        //backgroundColor: chroma('hotpink').brighten(3),
        borderWidth: 1,

      },{
        label: 'Rec_AbsorptionRate',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2016_2017.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2017_2018.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2018_2019.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2019_2020.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2020_2021.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2021_2022.Rec_AbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2022_2023.Rec_AbsorptionRate
            ],
        //borderColor: chroma('red').brighten(),
        //backgroundColor: chroma('red').brighten(3),
        borderWidth: 1,

      },{
        label: 'OverallAbsorptionRate',
        data: [ chart_data.CBAEAR.CBAEAR_2015_2016.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2016_2017.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2017_2018.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2018_2019.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2019_2020.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2020_2021.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2021_2022.OverallAbsorptionRate, 
                chart_data.CBAEAR.CBAEAR_2022_2023.OverallAbsorptionRate
            ],
        //borderColor: chroma('green').brighten(),
        //backgroundColor: chroma('green').brighten(3),
        borderWidth: 1,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                },
            legend: {
                position: 'bottom'
                }
            },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
});

//EEC
//line
const lineChart = document.getElementById('steppedChart');

let steppedlineChart = new Chart(lineChart, {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Personnel Emoluments',
        data: [ (chart_data.EEC.EEC_2015_2016.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2016_2017.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2017_2018.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2018_2019.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2019_2020.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2020_2021.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2021_2022.PersonnelEmoluments/1000000), 
                (chart_data.EEC.EEC_2022_2023.PersonnelEmoluments/1000000)
            ],
        stepped: true,
        //borderColor: chroma('hotpink').brighten(),
        //backgroundColor: chroma('hotpink').brighten(3),
        borderWidth: 2,

      },{
        label: 'Operations Maintenance',
        data: [ (chart_data.EEC.EEC_2015_2016.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2016_2017.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2017_2018.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2018_2019.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2019_2020.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2020_2021.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2021_2022.Operations_Maintenance/1000000), 
                (chart_data.EEC.EEC_2022_2023.Operations_Maintenance/1000000)
            ],
        stepped: true,
        //borderColor: chroma('red').brighten(),
        //backgroundColor: chroma('red').brighten(3),
        borderWidth: 2,

      },{
        label: 'Development Expenditure',
        data: [ (chart_data.EEC.EEC_2015_2016.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2016_2017.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2017_2018.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2018_2019.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2019_2020.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2020_2021.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2021_2022.DevelopmentExpenditure/1000000), 
                (chart_data.EEC.EEC_2022_2023.DevelopmentExpenditure/1000000)
            ],
        stepped: true,
        //borderColor: chroma('green').brighten(),
        //backgroundColor: chroma('green').brighten(3),
        borderWidth: 2,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                },
            legend: {
                position: 'bottom'
                }
            },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
});


const EEC_Bar = document.getElementById('EEC_BarChart');

let hrBarChart = new Chart(EEC_Bar, {
    type: 'bar',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Total Expenditure',
        data: [ (chart_data.EEC.EEC_2015_2016.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2016_2017.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2017_2018.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2018_2019.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2019_2020.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2020_2021.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2021_2022.TotalExpenditure/1000000), 
                (chart_data.EEC.EEC_2022_2023.TotalExpenditure/1000000)
            ],
        // borderColor: chroma('hotpink').brighten(),
        // backgroundColor: chroma('hotpink').brighten(2),
        // borderWidth: 1,
        // stack: 'Stack 0',
      }]
    },
    options: {
        indexAxis: 'y',
        barThickness: 5,
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'EEC horizontal Chart Title',
                },
            legend: {
                display: false,
                position: 'bottom'
                }
            },
        scales: {
            x: {
              // beginAtZero: true,
                //stacked: true,

            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Y axis label',  
                }
              // beginAtZero: true,
              //stacked: true
            }
        }
    }
});


//LRC
//line
const LRC_comboChart = document.getElementById('LRC_comboChart');

let comboChart = new Chart(LRC_comboChart, {
    type: 'bar',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Own Source Revenue Collection',
        data: [ (chart_data.LRC.LRC_2015_2016.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2016_2017.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2017_2018.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2018_2019.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2019_2020.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2020_2021.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2021_2022.OwnSourceRevenue_collection/1000000), 
                (chart_data.LRC.LRC_2022_2023.OwnSourceRevenue_collection/1000000)
            ],
        //stepped: true,
        //borderColor: chroma('hotpink').brighten(),
        //backgroundColor: chroma('hotpink').brighten(3),
        //borderWidth: 2,
        order: 0

      },{
        label: 'Own Source Revenue Target',
        data: [ (chart_data.LRC.LRC_2015_2016.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2016_2017.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2017_2018.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2018_2019.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2019_2020.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2020_2021.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2021_2022.OwnSourceRevenue_target/1000000), 
                (chart_data.LRC.LRC_2022_2023.OwnSourceRevenue_target/1000000)
            ],
        type: 'line',
        order: 0
        //borderColor: chroma('red').brighten(),
        //backgroundColor: chroma('red').brighten(3),
        // borderWidth: 2,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                },
            legend: {
                position: 'bottom'
                }
            },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
});

//RADAR
  const LRC_radarChart = document.getElementById('LRC_radarChart');

  new Chart(LRC_radarChart, {
    type: 'radar',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Collection_vs_target',
        data: [ chart_data.LRC.LRC_2015_2016.Collection_vs_target, 
                chart_data.LRC.LRC_2016_2017.Collection_vs_target, 
                chart_data.LRC.LRC_2017_2018.Collection_vs_target, 
                chart_data.LRC.LRC_2018_2019.Collection_vs_target, 
                chart_data.LRC.LRC_2019_2020.Collection_vs_target, 
                chart_data.LRC.LRC_2020_2021.Collection_vs_target, 
                chart_data.LRC.LRC_2021_2022.Collection_vs_target, 
                chart_data.LRC.LRC_2022_2023.Collection_vs_target
            ],
        //borderColor: chroma('hotpink').brighten(),
        //backgroundColor: chroma('hotpink').brighten(3),
        borderWidth: 1,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Collection_vs_target',
                },
            legend: {
                position: 'bottom'
                }
            },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
  });

//PB
//line
  const PB_lineChart = document.getElementById('PB_lineChart');

  new Chart(PB_lineChart, {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Recurrent Pending Bills',
        data: [ chart_data.PB.PB_2015_2016.RecurrentPendingBills, 
                chart_data.PB.PB_2016_2017.RecurrentPendingBills, 
                chart_data.PB.PB_2017_2018.RecurrentPendingBills, 
                chart_data.PB.PB_2018_2019.RecurrentPendingBills, 
                chart_data.PB.PB_2019_2020.RecurrentPendingBills, 
                chart_data.PB.PB_2020_2021.RecurrentPendingBills, 
                chart_data.PB.PB_2021_2022.RecurrentPendingBills, 
                chart_data.PB.PB_2022_2023.RecurrentPendingBills
            ],
        //stepped: true,
        //borderColor: chroma('hotpink').brighten(),
        //backgroundColor: chroma('hotpink').brighten(3),
        borderWidth: 2,

      },{
        label: 'Development Pending Bills',
        data: [ chart_data.PB.PB_2015_2016.DevelopmentPendingBills, 
                chart_data.PB.PB_2016_2017.DevelopmentPendingBills, 
                chart_data.PB.PB_2017_2018.DevelopmentPendingBills, 
                chart_data.PB.PB_2018_2019.DevelopmentPendingBills, 
                chart_data.PB.PB_2019_2020.DevelopmentPendingBills, 
                chart_data.PB.PB_2020_2021.DevelopmentPendingBills, 
                chart_data.PB.PB_2021_2022.DevelopmentPendingBills, 
                chart_data.PB.PB_2022_2023.DevelopmentPendingBills
            ],
        //stepped: true,
        //borderColor: chroma('red').brighten(),
        //backgroundColor: chroma('red').brighten(3),
        borderWidth: 2,

      },{
        label: 'Total Pending Bills',
        data: [ chart_data.PB.PB_2015_2016.TotalPendingBills, 
                chart_data.PB.PB_2016_2017.TotalPendingBills, 
                chart_data.PB.PB_2017_2018.TotalPendingBills, 
                chart_data.PB.PB_2018_2019.TotalPendingBills, 
                chart_data.PB.PB_2019_2020.TotalPendingBills, 
                chart_data.PB.PB_2020_2021.TotalPendingBills, 
                chart_data.PB.PB_2021_2022.TotalPendingBills, 
                chart_data.PB.PB_2022_2023.TotalPendingBills
            ],
        //stepped: true,
        //borderColor: chroma('green').brighten(),
        //backgroundColor: chroma('green').brighten(3),
        borderWidth: 2,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Pending Bills',
                },
            legend: {
                position: 'bottom'
                }
            },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
  });

// _.each(data, function (value,key) {
//     console.log(key);
//     console.log(value);
//     _.each(value, function (value,key) {
//         console.log(key);
//         console.log(value);
//         _.each(value, function (value,key) {
//             console.log(key);
//             console.log(value);
//             console.log(_.pick(value, 'baringo'));
//         });
//     });
// });

//var data = [CBAEAR,EEC,LRC,PB];

// data.forEach((element) => {
//     //console.log(String(_.values(element)));
//     console.log(String(_.keys(element)));
//     console.log(Object.values(element));
//     // for (var [key, value] of Object.entries(Object.values(element))) {
//     //     console.log(key);
//     //     console.log(value);
//     // }
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/44106015/combining-geojson-and-json-for-leaftlet

// new Accordion('.accordion-container',{
//     onOpen: function(currentElement) {
//       console.log(currentElement.id);
// //FILTER MECHANISM
//       $( "input:radio[name='level0']" ).on('click',function(event) {
//         //console.log($( 'input[name="level0"]:checked' ).val());
//         //console.log($( 'input[name="level0"]:checked' ).attr('id'));
//         var clicked = $( 'input[name="level0"]:checked' ).val();
//         let result = clicked.slice(0, -10);
//         //console.log(result);

//       if (clicked.slice(0, -10) === "CBAEAR") {
//         console.log("CBAEAR files", clicked);
//         var path = clicked.concat(".OverallAbsorptionRate")
//         console.log(path);
//         console.log(access(path, CBAEAR));

//       } 
//       else if (clicked.slice(0, -10) === "EEC") {
//         console.log("EEC files", clicked);
//         var path = clicked.concat(".TotalExpenditure")
//         console.log(path);
//         console.log(access(path, EEC));

//       }
//       else if (clicked.slice(0, -10) === "LRC") {
//         console.log("LRC files", clicked);
//         var path = clicked.concat(".Collection_vs_target")
//         console.log(path);
//         console.log(access(path, LRC));

//       }
//       else if (clicked.slice(0, -10) === "PB") {
//         console.log("PB files", clicked);
//         var path = clicked.concat(".TotalPendingBills")
//         console.log(path);
//         console.log(access(path, PB));

//       }
// // //how to filter the data files
// // let access = (path, object) => {
// //   return path.split('.').reduce((o, i) => o[i], object)
// // }

// // const obj = {
// //   prop1: {
// //     prop2: {
// //       prop3: {
// //         value: 'foo'
// //       }
// //     }
// //   }
// // }

// // const str = 'prop1.prop2.prop3'

// // console.log(access(str, obj)) // {"value": "foo"}

// });


//     }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////