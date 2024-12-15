//MAP
var map = L.map('map',{
  center :[0.6000002, 37.7650],
  zoom : 7,
  minZoom:6,
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


function zoomToFeature(e) {
    info1.update(e.target.feature.properties);

// update chart data with county level data
    var chart_data = Data_Extractor(data,e.target.feature.properties.NAME);
    //CBAEAR
    //CBAEAR bar graph update
    barChart.data.datasets[0].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[0];}); 
    barChart.data.datasets[1].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[1];});
    barChart.data.datasets[2].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[3];}); 
    barChart.data.datasets[3].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[4];});
    barChart.update();

    //CBAEAR radar chart update
    radarChart.data.datasets[0].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[7];}); 
    radarChart.data.datasets[1].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[6];});
    radarChart.data.datasets[2].data=_.map(chart_data.CBAEAR, function (value,key) {return _.values(value)[8];}); 
    radarChart.update();

    //EEC
    //EEC stepped line graph update
    steppedlineChart.data.datasets[0].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[0]/1000000);});//Personnel Emoluments
    steppedlineChart.data.datasets[1].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[1]/1000000);});//Operations Maintenance
    steppedlineChart.data.datasets[2].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[2]/1000000);});//Development Expenditure
    steppedlineChart.update();

    //EEC horizontal Bar graph update
    hrBarChart.data.datasets[0].data=_.map(chart_data.EEC, function (value,key) {return (_.values(value)[3]/1000000);});//Total Expenditure
    hrBarChart.update();

    //LRC
    //comboBarLine chart
    var osrc = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'OwnSourceRevenue_collection'));})
    var osrc_values = _.flatten(osrc)
    comboChart.data.datasets[0].data=osrc_values.map(function (el) {return el / 1000000;});

    var osrt = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'OwnSourceRevenue_target'));})
    var osrt_values = _.flatten(osrt)
    comboChart.data.datasets[1].data=osrt_values.map(function (el) {return el / 1000000;});
    comboChart.update();

    //Radar
    var cvt = _.map(chart_data.LRC, function (value,key) {return _.values(_.pick(value, 'Collection_vs_target'));})
    var cvt_values = _.flatten(cvt)
    radarChartLRC.data.datasets[0].data=cvt_values; 
    radarChartLRC.update();

    //PB
    //regularlineChart
    var rpb = _.map(chart_data.PB, function (value,key) {return _.values(_.pick(value, 'RecurrentPendingBills'));})//RecurrentPendingBills
    var rpb_values = _.flatten(rpb)
    var dpb = _.map(chart_data.PB, function (value,key) {return _.values(_.pick(value, 'DevelopmentPendingBills'));})//DevelopmentPendingBills
    var dpb_values = _.flatten(dpb)
    var tpb = _.map(chart_data.PB, function (value,key) {return _.values(_.pick(value, 'TotalPendingBills'));})//TotalPendingBills
    var tpb_values = _.flatten(tpb)

    regularlineChart.data.datasets[0].data=rpb_values.map(function (el) {return el / 1000000;});//RecurrentPendingBills
    regularlineChart.data.datasets[1].data=dpb_values.map(function (el) {return el / 1000000;});//DevelopmentPendingBills
    regularlineChart.data.datasets[2].data=tpb_values.map(function (el) {return el / 1000000;});//TotalPendingBills
    regularlineChart.update();
//zoom county
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.NAME);
    layer.on({
        click: zoomToFeature,
    });
}


//County Layer
var counties_layer = L.geoJson(counties,{style:style_boundary ,onEachFeature:onEachFeature}).addTo(map);


//INFO COUNTY WINDOW
var info1 = L.control({position: 'topleft'});

info1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// update method 
info1.update = function (props) {
    this._div.innerHTML =   (props ?
        '<h6><b>'+props.District+'</b></h6>' 
        :'<h6><b>Click a County</b></h6>');
};

info1.addTo(map);

//GRAPHS
var data = {'CBAEAR':CBAEAR,'EEC':EEC,'LRC':LRC,'PB':PB};
function Data_Extractor(data,county_name) {
    var each_data = {};
    if (_.isEmpty(each_data)) {
        _.each(data, function (value,key) {
            if (key=== "CBAEAR") {
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        var data_point = key2;
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            else if (key=== "EEC") {
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            else if (key=== "LRC") {
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        var data_point = key2;
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            } 
            else if (key=== "PB") {
                each_data[key]={};
                for (var [key1, value1] of Object.entries(value)) {
                    var year = key1;
                    each_data[key][year]={};
                    for (var [key2, value2] of Object.entries(value1)) {
                        //console.log(key2);
                        var data_point = key2;
                        each_data[key][year][data_point]= parseFloat(_.values(_.pick(value2, county_name)));;
                    }
                }
            }
        });
    }
    return each_data;
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
        borderColor: chroma('#f98841').brighten(),
        backgroundColor: chroma('#f98841').brighten(2),
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
        borderColor: chroma('#0571b0').brighten(),
        backgroundColor: chroma('#0571b0').brighten(2),
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
        borderColor: chroma('#fa0080').brighten(),
        backgroundColor: chroma('#fa0080').brighten(2),
        borderWidth: 1,
        stack: 'Stack 1',
      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Comparing Estimates & Expenditure for Recurrent and Development budget categories',
                },
            legend: {
                position: 'bottom'
                }
            },
        scales: {
            x: {
              // beginAtZero: true,
                title: {
                    display: true,
                    align: 'center',
                    text: 'Financial Years',  
                },
                stacked: true
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Expenditure ("000)',  
                },                
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
        borderWidth: 1,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Absorption Rate (%) ',
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
        borderWidth: 2,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Trends in Expenditure ("000)',
                },
            legend: {
                position: 'bottom'
                }
            },
        scales: {
            x: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Financial Years',  
                }
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Expenditure ("000)',  
                }
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
                text: 'Total Expenditure ("000)',
                },
            legend: {
                display: false,
                position: 'bottom'
                }
            },
        scales: {
            x: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Expenditure ("000)',  
                }
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Financial years',  
                }
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

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Trends in revenue collection against set targets ("000)',
                },
            legend: {
                position: 'bottom'
                }
            },
        scales: {
            x: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Financial Years',  
                }
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Expenditure ("000)',  
                }
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

let radarChartLRC = new Chart(LRC_radarChart, {
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
        borderWidth: 1,

      }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Revenue Collection vs Set target (%)',
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
let regularlineChart = new Chart(PB_lineChart, {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [{
        label: 'Recurrent Pending Bills',
        data: [ (chart_data.PB.PB_2015_2016.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2016_2017.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2017_2018.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2018_2019.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2019_2020.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2020_2021.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2021_2022.RecurrentPendingBills/1000000), 
                (chart_data.PB.PB_2022_2023.RecurrentPendingBills/1000000)
            ],
        borderWidth: 2,

      },{
        label: 'Development Pending Bills',
        data: [ (chart_data.PB.PB_2015_2016.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2016_2017.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2017_2018.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2018_2019.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2019_2020.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2020_2021.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2021_2022.DevelopmentPendingBills/1000000), 
                (chart_data.PB.PB_2022_2023.DevelopmentPendingBills/1000000)
            ],
        borderWidth: 2,

      },{
        label: 'Total Pending Bills',
        data: [ (chart_data.PB.PB_2015_2016.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2016_2017.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2017_2018.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2018_2019.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2019_2020.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2020_2021.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2021_2022.TotalPendingBills/1000000), 
                (chart_data.PB.PB_2022_2023.TotalPendingBills/1000000)
            ],
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
        scales: {
            x: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Financial Years',  
                }
            },
            y: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Expenditure ("000)',  
                }
            }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////