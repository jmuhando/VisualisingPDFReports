//MAP
var map = L.map('map',{
  center :[-0.0000000002, 39.997650],
  zoom : 7,
  minZoom:7,
  maxZoom:10,
});

//var osm_baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


//LAYER STYLES
var style_boundary = {
    "color": "#0d0d0d",
    "weight": 1.5,
    "opacity": 1,
    "fillColor": "#ADADAD",
    "fillOpacity": 0.3
};


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



function zoomToFeature(e) {
  info1.update(e.target.feature.properties);
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.NAME);
  // layer.on({
  //   click: zoomToFeature,
  // });
}


//County Layer
var counties_layer = L.geoJson(counties,{style:style_boundary ,onEachFeature:onEachFeature}).addTo(map);


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

var ourCustomControl = L.Control.extend({
  options: {
    position: 'topright' 
  },
 
  onAdd: function (map) {
    var container = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-layers');
    container.setAttribute('aria-haspopup','true');
    container.innerHTML = '<h6 class = "text-center p-1"><b>Financial Years Overview</b></h6>'+
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

    container.style.backgroundColor = 'white';
 
    container.onclick = function(){
      //console.log('buttonClicked');
    }

    return container;
  },
 
});


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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////