// var dat;
// chrome.storage.sync.get("spent_data_array", function(budget) {
//     dat = budget.spent_data_array;
//     dat = JSON.stringify(dat);
//     console.log(dat);
// });

// window.onload = function() {
//     var dataPoints = [];
//     var stockChart = new CanvasJS.StockChart("stockChartContainer", {
//         title: {
//             text: "Exchange Rate for EUR to USD"
//         },
//         charts: [{
//             data: [{
//                 type: "splineArea",
//                 color: "#3698C5",
//                 yValueFormatString: "€1 = $#,###.##",
//                 dataPoints: dataPoints
//             }]
//         }],
//         navigator: {
//             slider: {
//                 minimum: new Date(),
//                 maximum: new Date()
//             }
//         }
//     });
//     // var url = chrome.runtime.getURL('usedeur.json');
//     // //console.log(dat);
//     // console.log("From window.onLoad");
//     $.getJSON("usdeur.json", function(data) {
//         for (var i = 0; i < data.length; i++) {
//             dataPoints.push({
//                 x: new Date(data[i].date.yy, data[i].date.mm, data[i].date.dd),
//                 y: Number(data[i].spent_amount)
//             });
//         }
//         stockChart.render();
//     });
// };
window.onload = function() {
    var dataPoints = [];
    chrome.storage.sync.get("spent_data_array_graph", function(budget) {
        var x = budget.spent_data_array_graph;
        for (var i = 0; i < x.length; i++) {
            dataPoints.push({
                x: new Date(x[i].date.yy, x[i].date.mm, x[i].date.dd),
                y: Number(x[i].spent_amount)
            });
        }
        var stockChart = new CanvasJS.StockChart("stockChartContainer", {
            title: {
                text: "Exchange Rate for EUR to USD"
            },
            charts: [{
                data: [{
                    type: "splineArea",
                    color: "#3698C5",
                    yValueFormatString: "€1 = $#,###.##",
                    dataPoints: dataPoints
                }]
            }],
            navigator: {
                slider: {
                    minimum: new Date(2015, 0, 01),
                    maximum: new Date(2016, 0, 01)
                }
            }
        });
        stockChart.render();
    });
};